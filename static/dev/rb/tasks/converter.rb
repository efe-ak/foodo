require 'json'
require 'strscan'
require 'forwardable'
require 'term/ansicolor'
require 'fileutils'

require_relative 'converter/less_conversion'
require_relative 'converter/logger'

class Converter
  extend Forwardable
  include LessConversion

  def initialize(save_to: {})
    @logger     = Logger.new
    @save_to    = { scss:  'tmp/converter-sass' }.merge(save_to)
  end

  def_delegators :@logger, :log, :log_status, :log_processing, :log_transform, :log_file_info, :log_processed, :log_http_get_file, :log_http_get_files, :silence_log

  def process_style
    log_status "Convert LESS to SASS"
    puts " save to: #{@save_to.to_json}"
    puts '-' * 60

    @save_to.each { |_, v| FileUtils.mkdir_p(v) }

    process_stylesheet_assets
  end

  def save_file(path, content, mode='w')
    dir = File.dirname(path)
    FileUtils.mkdir_p(dir) unless File.directory?(dir)
    File.open(path, mode) { |file| file.write(content) }
  end
end