require 'find'

require_relative 'char_string_scanner'

class Converter
  module LessConversion
    # Some regexps for matching bits of SCSS:
    SELECTOR_CHAR               = '\[\]$\w\-{}#,.:&>@'
    # 1 selector (the part before the {)
    SELECTOR_RE                 = /[#{SELECTOR_CHAR}]+[#{SELECTOR_CHAR}\s]*/
    # 1 // comment
    COMMENT_RE                  = %r((?:^[ \t]*//[^\n]*\n))
    # 1 {, except when part of @{ and #{
    RULE_OPEN_BRACE_RE          = /(?<![@#\$])\{/
    # same as the one above, but in reverse (on a reversed string)
    RULE_OPEN_BRACE_RE_REVERSE  = /\{(?![@#\$])/
    # match closed brace, except when \w precedes }, or when }[.'"]. a heurestic to exclude } that are not selector body close }
    RULE_CLOSE_BRACE_RE         = /(?<!\w)\}(?![.'"])/
    RULE_CLOSE_BRACE_RE_REVERSE = /(?<![.'"])\}(?!\w)/
    # match any brace that opens or closes a properties body
    BRACE_RE                    = /#{RULE_OPEN_BRACE_RE}|#{RULE_CLOSE_BRACE_RE}/m
    BRACE_RE_REVERSE            = /#{RULE_OPEN_BRACE_RE_REVERSE}|#{RULE_CLOSE_BRACE_RE_REVERSE}/m
    # valid
    SCSS_MIXIN_DEF_ARGS_RE      = /[\w\-,\s$:#%()]*/
    LESS_MIXIN_DEF_ARGS_RE      = /[\w\-,;.\s@:#%()]*/

    # Convert a snippet of bootstrap LESS to Scss
    def convert_less(less, name)
        load_shared
        less = convert_to_scss(less, name)
        less = yield(less) if block_given?
        less
    end

    def read_files(search_path)
        files = []
        Find.find(search_path) do |path|
          files << path if path =~ /.*\.less$/
        end
        files
    end

    # @mixin transition($transition) {
    # to:
    # @mixin transition($transition...) {
    def varargify_mixin_definitions(scss, *mixins)
      scss = scss.dup
      replaced = []
      mixins.each do |mixin|
        if scss.gsub! /(@mixin\s*#{Regexp.quote(mixin)})\((#{SCSS_MIXIN_DEF_ARGS_RE})\)/, '\1(\2...)'
          replaced << mixin
        end
      end
      log_transform *replaced unless replaced.empty?
      scss
    end

    def process_stylesheet_assets

      log_status 'Cleaning old stuff .. '
      FileUtils.rm_rf Dir["tmp/**/*"]

      log_status 'Processing stylesheets...'
      files = read_files('app/less')
      save_to = @save_to[:scss]

      log_status '  Converting LESS files to Scss:'
      files.each do |file|

        name = file.split("/").pop()

        file_binary = File.open(file, "rb")
        file_content = file_binary.read

        log_processing "#{file}"
        # apply common conversions
        file_content = convert_less(file_content, name)

        case name
          when '_variables.less'
            file_content = insert_default_vars(file_content)
          when '_vendor.less'
            file_content = file_content.gsub('font-awesome/less', 'font-awesome/scss')
          when 'bootstrap.less'
            file_content = file_content.gsub('bower_components/bootstrap/less', 'bower_components/bootstrap-sass/assets/stylesheets/bootstrap')
        end

        file_content = file_content.gsub('bootstrap/less/variables', 'bootstrap-sass/assets/stylesheets/bootstrap/variables')
        file_content = file_content.gsub(/\$import \(less\) "/, '$import "CSS:')
        file_content = file_content.gsub(/\$import/, '@import')
        file_content = file_content.gsub(/\.css/, '')

        path = File.join save_to, file.gsub(/less/, 'scss')
        path = File.join File.dirname(path), File.basename(path)
        save_file(path, file_content)
        log_processed File.basename(path)
      end
    end

    def bootstrap_less_files
      @bootstrap_less_files ||= get_paths_by_type('less', /\.less$/)
    end

     def load_shared
      @shared_mixins ||= begin
        log_status '  Reading shared mixins from mixins.less'
        files = read_files('bower_components/bootstrap/less/mixins') + read_files('app/less/common/mixins')

        files_content = [];
        files.each do |file|
            file_binary = File.open(file, "rb")
            file_content = file_binary.read
            files_content << file_content
        end

        read_mixins files_content.join("\n")
      end
    end

    # apply general less to scss conversion
    def convert_to_scss(file, name)
      # get local mixin names before converting the definitions
      mixins = @shared_mixins + read_mixins(file)
      file   = replace_vars(file)
      file   = replace_mixin_definitions(file)
      file   = replace_mixins(file, mixins)
      file   = replace_spin(file)
      file   = replace_fadein(file)
      file   = replace_fadeout(file)
      file   = replace_escaping(file)
      file   = replace_calculation_semantics(file)
      file   = replace_file_imports(file)
      file
    end

    # Before doing any processing we read shared mixins from a file
    # If a mixin is nested, it gets prefixed in the list (e.g. #gradient > .horizontal to 'gradient-horizontal')
    def read_mixins(mixins_file, nested: {})
      mixins = get_mixin_names(mixins_file, silent: true)
      nested.each do |selector, prefix|
        # we use replace_rules without replacing anything just to use the parsing algorithm
        replace_rules(mixins_file, selector) { |rule|
          mixins += get_mixin_names(unindent(unwrap_rule_block(rule)), silent: true).map { |name| "#{prefix}-#{name}" }
          rule
        }
      end
      mixins.uniq!
      mixins.sort!
      log_file_info "mixins: #{mixins * ', '}" unless mixins.empty?
      mixins
    end

    def get_mixin_names(file, opts = {})
      names = get_css_selectors(file).join("\n" * 2).scan(/^\.([\w-]+)\(#{LESS_MIXIN_DEF_ARGS_RE}\)(?: when.*?)?[ ]*\{/).map(&:first).uniq.sort
      log_file_info "mixin defs: #{names * ', '}" unless opts[:silent] || names.empty?
      names
    end

    # margin: a -b
    # LESS: sets 2 values
    # SASS: sets 1 value (a-b)
    # This wraps a and -b so they evaluates to 2 values in SASS
    def replace_calculation_semantics(file)
      # split_prop_val.call('(@navbar-padding-vertical / 2) -@navbar-padding-horizontal')
      # #=> ["(navbar-padding-vertical / 2)", "-navbar-padding-horizontal"]
      split_prop_val = proc { |val|
        s         = CharStringScanner.new(val)
        r         = []
        buff      = ''
        d         = 0
        prop_char = %r([\$\w\-/\*\+%!])
        while (token = s.scan_next(/([\)\(]|\s+|#{prop_char}+)/))
          buff << token
          case token
            when '('
              d += 1
            when ')'
              d -= 1
              if d == 0
                r << buff
                buff = ''
              end
            when /\s/
              if d == 0 && !buff.strip.empty?
                r << buff
                buff = ''
              end
          end
        end
        r << buff unless buff.empty?
        r.map(&:strip)
      }

      replace_rules file do |rule|
        replace_properties rule do |props|
          props.gsub /(?<!\w)([\w-]+):(.*?);/ do |m|
            prop, vals = $1, split_prop_val.call($2)
            next m unless vals.length >= 2 && vals.any? { |v| v =~ /^[\+\-]\$/ }
            transformed = vals.map { |v| v.strip =~ %r(^\(.*\)$) ? v : "(#{v})" }
            log_transform "property #{prop}: #{transformed * ' '}", from: 'wrap_calculation'
            "#{prop}: #{transformed * ' '};"
          end
        end
      end
    end

    # @import "file.less" to "#{target_path}file;"
    def replace_file_imports(less, target_path = '')
      less.gsub %r([@\$]import ["|']([\w\-/]+).less["|'];),
                %Q(@import "#{target_path}\\1";)
    end

    def replace_all(file, regex, replacement = nil, &block)
      log_transform regex, replacement
      new_file = file.gsub(regex, replacement, &block)
      raise "replace_all #{regex}, #{replacement} NO MATCH" if file == new_file
      new_file
    end

    # extracts rule immediately after it's parent, and adjust the selector
    # .x { textarea& { ... }}
    # to:
    # .x { ... }
    # textarea.x { ... }
    def extract_nested_rule(file, selector, new_selector = nil)
      matches = []
      # first find the rules, and remove them
      file    = replace_rules(file, "\s*#{selector}", comments: true) { |rule, pos, css|
        new_sel = new_selector || "#{get_selector(rule).gsub(/&/, selector_for_pos(css, pos.begin))}"
        matches << [rule, pos, new_sel]
        indent "// [converter] extracted #{get_selector(rule)} to #{new_sel}".tr("\n", ' ').squeeze(' '), indent_width(rule)
      }
      raise "extract_nested_rule: no such selector: #{selector}" if matches.empty?
      # replace rule selector with new_selector
      matches.each do |m|
        m[0].sub! /(#{COMMENT_RE}*)^(\s*).*?(\s*){/m, "\\1\\2#{m[2]}\\3{"
        log_transform selector, m[2]
      end
      replace_substrings_at file,
                            matches.map { |_, pos| close_brace_pos(file, pos.begin, 1) + 1 },
                            matches.map { |rule, _| "\n\n" + unindent(rule) }
    end

    # @include and @extend from LESS:
    #  .mixin()             -> @include mixin()
    #  #scope > .mixin()    -> @include scope-mixin()
    #  &:extend(.mixin all) -> @include mixin()
    def replace_mixins(less, mixin_names)

      mixin_pattern = /(\s+)(([#|\.][\w-]+\s*>\s*)*)\.([\w-]+\(.*\))(?!\s\{)/

      less = less.gsub(mixin_pattern) do |match|
        matches = match.scan(mixin_pattern).flatten
        scope   = matches[1] || ''
        if scope != ''
          scope = scope.scan(/[\w-]+/).join('-') + '-'
        end
        mixin_name = match.scan(/\.([\w-]+)\(.*\)\s?\{?/).first
        if mixin_name && mixin_names.include?("#{scope}#{mixin_name.first}")
          "#{matches.first}@include #{scope}#{matches.last}"
            .gsub(/; \$/, ", $")
            .gsub(/; \#/, ", #")
            .gsub(/; rgba/, ", rgba")
            .gsub(/; transparent/, ", transparent")
            .sub(/;\)$/, ')')
        else
          "#{matches.first}@extend .#{scope}#{matches.last.gsub(/\(\)/, '')}"
        end
      end

      less.gsub /&:extend\((#{SELECTOR_RE})(?: all)?\)/ do
        selector = $1
        selector =~ /\.([\w-]+)/
        mixin    = $1
        if mixin && mixin_names.include?(mixin)
          "@include #{mixin}()"
        else
          "@extend #{selector}"
        end
      end
    end

    # change Microsoft filters to SASS calling convention
    def replace_ms_filters(file)
      log_transform
      file.gsub(
          /filter: e\(%\("progid:DXImageTransform.Microsoft.gradient\(startColorstr='%d', endColorstr='%d', GradientType=(\d)\)",argb\(([\-$\w]+)\),argb\(([\-$\w]+)\)\)\);/,
          %Q(filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='\#{ie-hex-str(\\2)}', endColorstr='\#{ie-hex-str(\\3)}', GradientType=\\1);)
      )
    end

    # unwraps topmost rule block
    # #sel { a: b; }
    # to:
    # a: b;
    def unwrap_rule_block(css)
      css[(css =~ RULE_OPEN_BRACE_RE) + 1..-1].sub(/\n?}\s*\z/m, '')
    end

    def replace_mixin_definitions(less)
      less.gsub(/^(\s*)\.([\w-]+\(.*\))(\s*\{)/) { |match|
        "#{$1}@mixin #{$2.tr(';', ',')}#{$3}".sub(/,\)/, ')')
      }
    end

    def replace_vars(less)
      less = less.dup
      # skip header comment
      less =~ %r(\A/\*(.*?)\*/)m
      from           = $~ ? $~.to_s.length : 0
      less[from..-1] = less[from..-1].
          gsub(/(?!@mixin|@media|@page|@keyframes|@font-face|@-\w)@/, '$').
          # variables that would be ignored by gsub above: e.g. @page-header-border-color
          gsub(/@(page[\w-]+)/, '$\1')
      less
    end

    def replace_spin(less)
      less.gsub(/(?![\-$@.])spin(?!-)/, 'adjust-hue')
    end

    def replace_fadein(less)
      less.gsub(/(?![\-$@.])fadein\((.*?),\s*(.*?)%\)/) { "fade_in(#{$1}, #{$2.to_i / 100.0})" }
    end

    def replace_fadeout(less)
      less.gsub(/(?![\-$@.])fadeout\((.*?),\s*(.*?)%\)/) { "fade_out(#{$1}, #{$2.to_i / 100.0})" }
    end

    def replace_escaping(less)
      less = less.gsub(/~"([^"]+)"/, '#{\1}') # Get rid of ~"" escape
      less.gsub!(/\$\{([^}]+)\}/, '$\1') # Get rid of @{} escape
      less.gsub!(/"([^"\n]*)(\$[\w\-]+)([^"\n]*)"/, '"\1#{\2}\3"') # interpolate variable in string, e.g. url("$file-1x") => url("#{$file-1x}")
      less.gsub(/(\W)e\(%\("?([^"]*)"?\)\)/, '\1\2') # Get rid of e(%("")) escape
    end

    def insert_default_vars(scss)
      log_transform
      scss.gsub(/^(\$.+);/, '\1 !default;')
    end

    # unindent by n spaces
    def unindent(txt, n = 2)
      txt.gsub /^[ ]{#{n}}/, ''
    end

    # indent by n spaces
    def indent(txt, n = 2)
      spaces = ' ' * n
      txt.gsub /^/, spaces
    end

    # get indent length from the first line of txt
    def indent_width(txt)
      txt.match(/\A\s*/).to_s.length
    end

    # get full selector for rule_block
    def get_selector(rule_block)
      sel = /^\s*(#{SELECTOR_RE}?)\s*\{/.match(rule_block) && $1 && $1.strip
      sel.sub /\s*\{\n\s.*/m, ''
    end

    # replace CSS rule blocks matching rule_prefix with yield(rule_block, rule_pos)
    # will also include immediately preceding comments in rule_block
    #
    # option :comments -- include immediately preceding comments in rule_block
    #
    # replace_rules(".a{ \n .b{} }", '.b') { |rule, pos| ">#{rule}<"  } #=> ".a{ \n >.b{}< }"
    def replace_rules(less, rule_prefix = SELECTOR_RE, options = {}, &block)
      options = {comments: true}.merge(options || {})
      less    = less.dup
      s       = CharStringScanner.new(less)
      rule_re = /(?:#{rule_prefix}[#{SELECTOR_CHAR})=(\s]*?#{RULE_OPEN_BRACE_RE})/
      if options[:comments]
        rule_start_re = /(?:#{COMMENT_RE}*)^#{rule_re}/
      else
        rule_start_re = /^#{rule_re}/
      end

      positions = []
      while (rule_start = s.scan_next(rule_start_re))
        pos = s.pos
        positions << (pos - rule_start.length..close_brace_pos(less, pos - 1))
      end
      replace_substrings_at(less, positions, &block)
      less
    end

    # Get a all top-level selectors (with {)
    def get_css_selectors(css, opts = {})
      s         = CharStringScanner.new(css)
      selectors = []
      while s.scan_next(RULE_OPEN_BRACE_RE)
        brace_pos = s.pos
        def_pos   = css_def_pos(css, brace_pos+1, -1)
        sel       = css[def_pos.begin..brace_pos - 1].dup
        sel.strip! if opts[:strip]
        selectors << sel
        sel.dup.strip
        s.pos = close_brace_pos(css, brace_pos, 1) + 1
      end
      selectors
    end

    # replace in the top-level selector
    # replace_in_selector('a {a: {a: a} } a {}', /a/, 'b') => 'b {a: {a: a} } b {}'
    def replace_in_selector(css, pattern, sub)
      # scan for selector positions in css
      s        = CharStringScanner.new(css)
      prev_pos = 0
      sel_pos  = []
      while (brace = s.scan_next(RULE_OPEN_BRACE_RE))
        pos = s.pos
        sel_pos << (prev_pos .. pos - 1)
        s.pos    = close_brace_pos(css, s.pos - 1) + 1
        prev_pos = pos
      end
      replace_substrings_at(css, sel_pos) { |s| s.gsub(pattern, sub) }
    end


    # replace first level properties in the css with yields
    # replace_properties("a { color: white }") { |props| props.gsub 'white', 'red' }
    def replace_properties(css, &block)
      s = CharStringScanner.new(css)
      s.skip_until /#{RULE_OPEN_BRACE_RE}\n?/
      from = s.pos
      m = s.scan_next(/\s*#{SELECTOR_RE}#{RULE_OPEN_BRACE_RE}/) || s.scan_next(/\s*#{RULE_CLOSE_BRACE_RE}/)
      to = s.pos - m.length - 1
      replace_substrings_at css, [(from .. to)], &block
    end


    # immediate selector of css at pos
    def selector_for_pos(css, pos, depth = -1)
      css[css_def_pos(css, pos, depth)].dup.strip
    end

    # get the pos of css def at pos (search backwards)
    def css_def_pos(css, pos, depth = -1)
      to       = open_brace_pos(css, pos, depth)
      prev_def = to - (css[0..to].reverse.index(RULE_CLOSE_BRACE_RE_REVERSE) || to) + 1
      from     = prev_def + 1 + (css[prev_def + 1..-1] =~ %r(^\s*[^\s/]))
      (from..to - 1)
    end

    # next matching brace for brace at from
    def close_brace_pos(css, from, depth = 0)
      s = CharStringScanner.new(css[from..-1])
      while (b = s.scan_next(BRACE_RE))
        depth += (b == '}' ? -1 : +1)
        break if depth.zero?
      end
      raise "match not found for {" unless depth.zero?
      from + s.pos - 1
    end

    # opening brace position from +from+ (search backwards)
    def open_brace_pos(css, from, depth = 0)
      s = CharStringScanner.new(css[0..from].reverse)
      while (b = s.scan_next(BRACE_RE_REVERSE))
        depth += (b == '{' ? +1 : -1)
        break if depth.zero?
      end
      raise "matching { brace not found" unless depth.zero?
      from - s.pos + 1
    end

    # insert substitutions into text at positions (Range or Fixnum)
    # substitutions can be passed as array or as yields from the &block called with |substring, position, text|
    # position is a range (begin..end)
    def replace_substrings_at(text, positions, replacements = nil, &block)
      offset = 0
      positions.each_with_index do |p, i|
        p       = (p...p) if p.is_a?(Fixnum)
        from    = p.begin + offset
        to      = p.end + offset
        p       = p.exclude_end? ? (from...to) : (from..to)
        # block returns the substitution, e.g.: { |text, pos| text[pos].upcase }
        r       = replacements ? replacements[i] : block.call(text[p], p, text)
        text[p] = r
        # add the change in length to offset
        offset  += r.size - (p.end - p.begin + (p.exclude_end? ? 0 : 1))
      end
      text
    end
  end
end