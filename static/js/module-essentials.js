(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/ui/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_progress-bars');
require('./_iframe');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
},{"./_cover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_nestable.js","./_progress-bars":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tree.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    function height() {

        $('.cover.overlay').filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            t.height(i.height());
            $('.overlay-full', t).innerHeight(i.height());
            $(document).trigger('domChanged');
        });

        $('.cover.overlay').filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            i.removeAttr('style');
            i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.datepicker').datepicker();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#reportrange').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            startDate: moment().subtract('days', 29),
            endDate: moment()
        },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );

    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_expandable.js":[function(require,module,exports){
(function ($) {

    $('.expandable').each(function(){
       $(this).find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    if (typeof $.fn.minicolors != 'undefined') {

        $('.minicolors').each(function () {

            $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: $(this).attr('data-letterCase') || 'lowercase',
                opacity: $(this).attr('data-opacity'),
                position: $(this).attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        });

    }

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    if (typeof $.fn.nestable != 'undefined') {

        $('.nestable').nestable({
            rootClass: 'nestable',
            listNodeName: 'ul',
            listClass: 'nestable-list',
            itemClass: 'nestable-item',
            dragClass: 'nestable-drag',
            handleClass: 'nestable-handle',
            collapsedClass: 'nestable-collapsed',
            placeClass: 'nestable-placeholder',
            emptyClass: 'nestable-empty'
        });

    }

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    if (typeof $.fn.select2 != 'undefined') {

        $('[data-toggle*="select2"]').each(function() {

            var t = $(this),
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        });

        $('[data-toggle="select2-enable"]').click(function () {
            $($(this).data('target')).select2("enable");
        });

        $('[data-toggle="select2-disable"]').click(function () {
            $($(this).data('target')).select2("disable");
        });

        // templating
        var format = function (state) {
            if (! state.id) return state.text;
            return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
        };

        $("#select2_7").select2({
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });

    }

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(function () {

        if (typeof $.fn.selectpicker != 'undefined') {

            $('.selectpicker').each(function () {
                $(this).selectpicker({
                    width: $(this).data('width') || '100%'
                });
            });

        }

    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    if (typeof $.fn.slider != 'undefined') {

        $('[data-slider="default"]').slider();

        $('[data-slider="formatter"]').slider({
            formatter: function (value) {
                return 'Current value: ' + value;
            }
        });

        $('[data-on-slide]').on("slide", function (slideEvt) {
            $($(this).attr('data-on-slide')).text(slideEvt.value);
        });

        $('.slider-handle').html('<i class="fa fa-bars fa-rotate-90"></i>');

    }

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tables.js":[function(require,module,exports){
(function ($) {

    if (typeof $.fn.dataTable != 'undefined') {

        // Datatables
        $('#data-table').dataTable();

    }

    // Table Checkbox All
    $('#checkAll').on('click', function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_touchspin.js":[function(require,module,exports){
(function ($) {

    if (typeof $.fn.TouchSpin != 'undefined') {

        $('[data-toggle="touch-spin"]').TouchSpin();

    }

}(jQuery));
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tree.js":[function(require,module,exports){
(function ($) {

    if (typeof $.fn.fancytree == 'undefined') return;

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        var extensions = [ "glyph" ];
        if (typeof $(this).attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        $(this).fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof $(this).attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof $(this).attr('data-tree-select') !== "undefined" ? parseInt($(this).attr('data-tree-select')) : 2
        });
    });

}(jQuery));
},{}]},{},["./app/vendor/ui/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL21haW4uanMiLCJhcHAvdmVuZG9yL3VpL2pzL19jb3Zlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2RhdGVwaWNrZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19kYXRlcmFuZ2VwaWNrZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19leHBhbmRhYmxlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9faWZyYW1lLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fbWluaWNvbG9ycy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX25lc3RhYmxlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fcHJvZ3Jlc3MtYmFycy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NlbGVjdDIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3RwaWNrZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zaG93LWhvdmVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2tpbi5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYmxlcy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b29sdGlwLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdG91Y2hzcGluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL190YWJzJyk7XG5yZXF1aXJlKCcuL190cmVlJyk7XG5yZXF1aXJlKCcuL19zaG93LWhvdmVyJyk7XG5yZXF1aXJlKCcuL19kYXRlcmFuZ2VwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2V4cGFuZGFibGUnKTtcbnJlcXVpcmUoJy4vX25lc3RhYmxlJyk7XG5yZXF1aXJlKCcuL19jb3ZlcicpO1xucmVxdWlyZSgnLi9fdG9vbHRpcCcpO1xucmVxdWlyZSgnLi9fdGFibGVzJyk7XG5yZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19pZnJhbWUnKTtcblxuLy8gRm9ybXNcbnJlcXVpcmUoJy4vX3RvdWNoc3BpbicpO1xucmVxdWlyZSgnLi9fc2VsZWN0MicpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL19zZWxlY3RwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vX21pbmljb2xvcnMnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENvbnNlcnZlIGFzcGVjdCByYXRpbyBvZiB0aGUgb3JpZ25hbCByZWdpb24uIFVzZWZ1bCB3aGVuIHNocmlua2luZy9lbmxhcmdpbmdcbiAgICAgKiBpbWFnZXMgdG8gZml0IGludG8gYSBjZXJ0YWluIGFyZWEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3JjV2lkdGggU291cmNlIGFyZWEgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3JjSGVpZ2h0IFNvdXJjZSBhcmVhIGhlaWdodFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhXaWR0aCBGaXR0YWJsZSBhcmVhIG1heGltdW0gYXZhaWxhYmxlIHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heEhlaWdodCBGaXR0YWJsZSBhcmVhIG1heGltdW0gYXZhaWxhYmxlIGhlaWdodFxuICAgICAqIEByZXR1cm4ge09iamVjdH0geyB3aWR0aCwgaGVpZ3RoIH1cbiAgICAgKi9cbiAgICB2YXIgYXNwZWN0UmF0aW9GaXQgPSBmdW5jdGlvbiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkge1xuXG4gICAgICAgIHZhciB3UmF0aW8gPSBtYXhXaWR0aCAvIHNyY1dpZHRoLFxuICAgICAgICAgICAgaFJhdGlvID0gbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGggPSBzcmNXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IHNyY0hlaWdodDtcblxuICAgICAgICBpZiAoc3JjV2lkdGggLyBtYXhXaWR0aCA8IHNyY0hlaWdodCAvIG1heEhlaWdodCkge1xuICAgICAgICAgICAgd2lkdGggPSBtYXhXaWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IHNyY0hlaWdodCAqIHdSYXRpbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoID0gc3JjV2lkdGggKiBoUmF0aW87XG4gICAgICAgICAgICBoZWlnaHQgPSBtYXhIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge3dpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoZWlnaHQoKSB7XG5cbiAgICAgICAgJCgnLmNvdmVyLm92ZXJsYXknKS5maWx0ZXIoJzp2aXNpYmxlJykubm90KCdbY2xhc3MqPVwiaGVpZ2h0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgaSA9IHQuZmluZCgnaW1nOmZpcnN0Jyk7XG5cbiAgICAgICAgICAgIHQuaGVpZ2h0KGkuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXktZnVsbCcsIHQpLmlubmVySGVpZ2h0KGkuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignZG9tQ2hhbmdlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY292ZXIub3ZlcmxheScpLmZpbHRlcignOnZpc2libGUnKS5maWx0ZXIoJ1tjbGFzcyo9XCJoZWlnaHRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpID0gdC5maW5kKCdpbWc6Zmlyc3QnKTtcblxuICAgICAgICAgICAgaS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgaS5jc3MoYXNwZWN0UmF0aW9GaXQoaS53aWR0aCgpLCBpLmhlaWdodCgpLCB0LndpZHRoKCksIHQuaGVpZ2h0KCkpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShoZWlnaHQpO1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGhlaWdodCk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oXCJkZWJvdW5jZWRyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGhlaWdodCwgMjAwKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCgnLmRhdGVwaWNrZXInKS5kYXRlcGlja2VyKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcjcmVwb3J0cmFuZ2UnKS5kYXRlcmFuZ2VwaWNrZXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhbmdlczoge1xuICAgICAgICAgICAgICAgICdUb2RheSc6IFttb21lbnQoKSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdZZXN0ZXJkYXknOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKSwgbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgNyBEYXlzJzogW21vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgNiksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCAzMCBEYXlzJzogW21vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgMjkpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1RoaXMgTW9udGgnOiBbbW9tZW50KCkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICAgICAgICAgICdMYXN0IE1vbnRoJzogW21vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLmVuZE9mKCdtb250aCcpXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksXG4gICAgICAgICAgICBlbmREYXRlOiBtb21lbnQoKVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAkKCcjcmVwb3J0cmFuZ2Ugc3BhbicpLmh0bWwoc3RhcnQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSArICcgLSAnICsgZW5kLmZvcm1hdCgnTU1NTSBELCBZWVlZJykpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgICQoJyNyZXNlcnZhdGlvbnRpbWUnKS5kYXRlcmFuZ2VwaWNrZXIoeyB0aW1lUGlja2VyOiB0cnVlLCB0aW1lUGlja2VySW5jcmVtZW50OiAzMCwgZm9ybWF0OiAnTU0vREQvWVlZWSBoOm1tIEEnIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKCcuZXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAkKHRoaXMpLmZpbmQoJy5leHBhbmRhYmxlLWNvbnRlbnQnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJleHBhbmRhYmxlLWluZGljYXRvclwiPjxpPjwvaT48L2Rpdj4nKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtaW5kaWNhdG9yJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZXhwYW5kYWJsZScpLnRvZ2dsZUNsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtdHJpZ2dlcjpub3QoLmV4cGFuZGFibGUtb3BlbiknLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gaWYgd2UncmUgaW5zaWRlIGFuIGlmcmFtZSwgcmVsb2FkIHdpdGhvdXQgaWZyYW1lXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxuICAgICAgICB0b3AubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5taW5pY29sb3JzICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgJCgnLm1pbmljb2xvcnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCh0aGlzKS5taW5pY29sb3JzKHtcbiAgICAgICAgICAgICAgICBjb250cm9sOiAkKHRoaXMpLmF0dHIoJ2RhdGEtY29udHJvbCcpIHx8ICdodWUnLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJCh0aGlzKS5hdHRyKCdkYXRhLWRlZmF1bHRWYWx1ZScpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGlubGluZTogJCh0aGlzKS5hdHRyKCdkYXRhLWlubGluZScpID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgbGV0dGVyQ2FzZTogJCh0aGlzKS5hdHRyKCdkYXRhLWxldHRlckNhc2UnKSB8fCAnbG93ZXJjYXNlJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAkKHRoaXMpLmF0dHIoJ2RhdGEtb3BhY2l0eScpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAkKHRoaXMpLmF0dHIoJ2RhdGEtcG9zaXRpb24nKSB8fCAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGhleCwgb3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISBoZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkpIGhleCArPSAnLCAnICsgb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXAnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLm5lc3RhYmxlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgJCgnLm5lc3RhYmxlJykubmVzdGFibGUoe1xuICAgICAgICAgICAgcm9vdENsYXNzOiAnbmVzdGFibGUnLFxuICAgICAgICAgICAgbGlzdE5vZGVOYW1lOiAndWwnLFxuICAgICAgICAgICAgbGlzdENsYXNzOiAnbmVzdGFibGUtbGlzdCcsXG4gICAgICAgICAgICBpdGVtQ2xhc3M6ICduZXN0YWJsZS1pdGVtJyxcbiAgICAgICAgICAgIGRyYWdDbGFzczogJ25lc3RhYmxlLWRyYWcnLFxuICAgICAgICAgICAgaGFuZGxlQ2xhc3M6ICduZXN0YWJsZS1oYW5kbGUnLFxuICAgICAgICAgICAgY29sbGFwc2VkQ2xhc3M6ICduZXN0YWJsZS1jb2xsYXBzZWQnLFxuICAgICAgICAgICAgcGxhY2VDbGFzczogJ25lc3RhYmxlLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIGVtcHR5Q2xhc3M6ICduZXN0YWJsZS1lbXB0eSdcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIFByb2dyZXNzIEJhciBBbmltYXRpb25cbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykud2lkdGgoJCh0aGlzKS5hdHRyKCdhcmlhLXZhbHVlbm93JykgKyAnJScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCdbZGF0YS10b2dnbGUqPVwic2VsZWN0MlwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0LmRhdGEoJ2FsbG93Q2xlYXInKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0LmlzKCdidXR0b24nKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAodC5pcygnaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHQuaXMoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItdGFnc1wiXScpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50YWdzID0gdC5kYXRhKCd0YWdzJykuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdC5zZWxlY3QyKG9wdGlvbnMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItZW5hYmxlXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5zZWxlY3QyKFwiZW5hYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJzZWxlY3QyLWRpc2FibGVcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNlbGVjdDIoXCJkaXNhYmxlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0ZW1wbGF0aW5nXG4gICAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICghIHN0YXRlLmlkKSByZXR1cm4gc3RhdGUudGV4dDtcbiAgICAgICAgICAgIHJldHVybiBcIjxpbWcgY2xhc3M9J2ZsYWcnIHNyYz0naHR0cDovL3NlbGVjdDIuZ2l0aHViLmlvL3NlbGVjdDIvaW1hZ2VzL2ZsYWdzL1wiICsgc3RhdGUuaWQudG9Mb3dlckNhc2UoKSArIFwiLnBuZycvPlwiICsgc3RhdGUudGV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICAkKFwiI3NlbGVjdDJfN1wiKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGZvcm1hdFJlc3VsdDogZm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0U2VsZWN0aW9uOiBmb3JtYXQsXG4gICAgICAgICAgICBlc2NhcGVNYXJrdXA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0cGlja2VyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICQoJy5zZWxlY3RwaWNrZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdHBpY2tlcih7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAkKHRoaXMpLmRhdGEoJ3dpZHRoJykgfHwgJzEwMCUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNob3dIb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnW2RhdGEtc2hvdy1ob3Zlcl0nKS5oaWRlKCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gJCh0aGlzKS5kYXRhKCdzaG93SG92ZXInKTtcblxuICAgICAgICAgICAgc2VsZi5jbG9zZXN0KHBhcmVudCkub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH0pLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2hvd0hvdmVyKCk7XG5cbiAgICB3aW5kb3cuc2hvd0hvdmVyID0gc2hvd0hvdmVyO1xuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2tpbiA9ICQuY29va2llKCdza2luJyk7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2tpbiA9ICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIHNraW47XG59KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5zbGlkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCdbZGF0YS1zbGlkZXI9XCJkZWZhdWx0XCJdJykuc2xpZGVyKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2xpZGVyPVwiZm9ybWF0dGVyXCJdJykuc2xpZGVyKHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50IHZhbHVlOiAnICsgdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLW9uLXNsaWRlXScpLm9uKFwic2xpZGVcIiwgZnVuY3Rpb24gKHNsaWRlRXZ0KSB7XG4gICAgICAgICAgICAkKCQodGhpcykuYXR0cignZGF0YS1vbi1zbGlkZScpKS50ZXh0KHNsaWRlRXZ0LnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNsaWRlci1oYW5kbGUnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWJhcnMgZmEtcm90YXRlLTkwXCI+PC9pPicpO1xuXG4gICAgfVxuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLmRhdGFUYWJsZSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIC8vIERhdGF0YWJsZXNcbiAgICAgICAgJCgnI2RhdGEtdGFibGUnKS5kYXRhVGFibGUoKTtcblxuICAgIH1cblxuICAgIC8vIFRhYmxlIENoZWNrYm94IEFsbFxuICAgICQoJyNjaGVja0FsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgndGFibGUnKS5maW5kKCd0ZCBpbnB1dDpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0YWJzID0gJCh0aGlzKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgb25lYXhpc21vdXNlbW9kZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3N1cGVyID0gdGFicy5nZXRDb250ZW50U2l6ZTtcbiAgICAgICAgdGFicy5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbCh0YWJzKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IHRhYnMud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMgYScpLm9uKCdzaG93bi5icy50YWInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHRhYiA9ICQodGhpcykuY2xvc2VzdCgnLnRhYmJhYmxlJyk7XG4gICAgICAgIHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICAgIHRhcmdldFBhbmUgPSB0YXJnZXQuYXR0cignaHJlZicpIHx8IHRhcmdldC5kYXRhKCd0YXJnZXQnKTtcblxuICAgICAgICAvLyByZWZyZXNoIHRhYnMgd2l0aCBob3Jpem9udGFsIHNjcm9sbFxuICAgICAgICB0YWIuZmluZCgnLm5hdi10YWJzJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgICAgIC8vIHJlZnJlc2ggW2RhdGEtc2Nyb2xsYWJsZV0gd2l0aGluIHRoZSBhY3RpdmF0ZWQgdGFiIHBhbmVcbiAgICAgICAgJCh0YXJnZXRQYW5lKS5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRvb2x0aXBcbiAgICAkKFwiYm9keVwiKS50b29sdGlwKHtzZWxlY3RvcjogJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nLCBjb250YWluZXI6IFwiYm9keVwifSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICBpZiAodHlwZW9mICQuZm4uVG91Y2hTcGluICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwidG91Y2gtc3BpblwiXScpLlRvdWNoU3BpbigpO1xuXG4gICAgfVxuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLmZhbmN5dHJlZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgdmFyIHRyZWVfZ2x5cGhfb3B0aW9ucyA9IHtcbiAgICAgICAgbWFwOiB7XG4gICAgICAgICAgICBjaGVja2JveDogXCJmYSBmYS1zcXVhcmUtb1wiLFxuICAgICAgICAgICAgY2hlY2tib3hTZWxlY3RlZDogXCJmYSBmYS1jaGVjay1zcXVhcmVcIixcbiAgICAgICAgICAgIGNoZWNrYm94VW5rbm93bjogXCJmYSBmYS1jaGVjay1zcXVhcmUgZmEtbXV0ZWRcIixcbiAgICAgICAgICAgIGVycm9yOiBcImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCIsXG4gICAgICAgICAgICBleHBhbmRlckNsb3NlZDogXCJmYSBmYS1jYXJldC1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJMYXp5OiBcImZhIGZhLWFuZ2xlLXJpZ2h0XCIsXG4gICAgICAgICAgICBleHBhbmRlck9wZW46IFwiZmEgZmEtY2FyZXQtZG93blwiLFxuICAgICAgICAgICAgZG9jOiBcImZhIGZhLWZpbGUtb1wiLFxuICAgICAgICAgICAgbm9FeHBhbmRlcjogXCJcIixcbiAgICAgICAgICAgIGRvY09wZW46IFwiZmEgZmEtZmlsZVwiLFxuICAgICAgICAgICAgbG9hZGluZzogXCJmYSBmYS1yZWZyZXNoIGZhLXNwaW5cIixcbiAgICAgICAgICAgIGZvbGRlcjogXCJmYSBmYS1mb2xkZXJcIixcbiAgICAgICAgICAgIGZvbGRlck9wZW46IFwiZmEgZmEtZm9sZGVyLW9wZW5cIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB0cmVlX2RuZF9vcHRpb25zID0ge1xuICAgICAgICBhdXRvRXhwYW5kTVM6IDQwMCxcbiAgICAgICAgICAgIGZvY3VzT25DbGljazogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZlbnRWb2lkTW92ZXM6IHRydWUsIC8vIFByZXZlbnQgZHJvcHBpbmcgbm9kZXMgJ2JlZm9yZSBzZWxmJywgZXRjLlxuICAgICAgICAgICAgcHJldmVudFJlY3Vyc2l2ZU1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzIG9uIG93biBkZXNjZW5kYW50c1xuICAgICAgICAgICAgZHJhZ1N0YXJ0OiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogVGhpcyBmdW5jdGlvbiBNVVNUIGJlIGRlZmluZWQgdG8gZW5hYmxlIGRyYWdnaW5nIGZvciB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gY2FuY2VsIGRyYWdnaW5nIG9mIG5vZGUuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnRW50ZXI6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBkYXRhLm90aGVyTm9kZSBtYXkgYmUgbnVsbCBmb3Igbm9uLWZhbmN5dHJlZSBkcm9wcGFibGVzLlxuICAgICAgICAgICAgICogIFJldHVybiBmYWxzZSB0byBkaXNhbGxvdyBkcm9wcGluZyBvbiBub2RlLiBJbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAqICBkcmFnT3ZlciBhbmQgZHJhZ0xlYXZlIGFyZSBub3QgY2FsbGVkLlxuICAgICAgICAgICAgICogIFJldHVybiAnb3ZlcicsICdiZWZvcmUsIG9yICdhZnRlcicgdG8gZm9yY2UgYSBoaXRNb2RlLlxuICAgICAgICAgICAgICogIFJldHVybiBbJ2JlZm9yZScsICdhZnRlciddIHRvIHJlc3RyaWN0IGF2YWlsYWJsZSBoaXRNb2Rlcy5cbiAgICAgICAgICAgICAqICBBbnkgb3RoZXIgcmV0dXJuIHZhbHVlIHdpbGwgY2FsYyB0aGUgaGl0TW9kZSBmcm9tIHRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZHJvcHBpbmcgYSBwYXJlbnQgYmVsb3cgYW5vdGhlciBwYXJlbnQgKG9ubHkgc29ydFxuICAgICAgICAgICAgLy8gbm9kZXMgdW5kZXIgdGhlIHNhbWUgcGFyZW50KVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmKG5vZGUucGFyZW50ICE9PSBkYXRhLm90aGVyTm9kZS5wYXJlbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvbid0IGFsbG93IGRyb3BwaW5nICpvdmVyKiBhIG5vZGUgKHdvdWxkIGNyZWF0ZSBhIGNoaWxkKVxuICAgICAgICAgICAgcmV0dXJuIFtcImJlZm9yZVwiLCBcImFmdGVyXCJdO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnRHJvcDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcm9wcGluZyBvZiBpdGVtcyBvblxuICAgICAgICAgICAgICogIHRoZSB0cmVlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkYXRhLm90aGVyTm9kZS5tb3ZlVG8obm9kZSwgZGF0YS5oaXRNb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB1c2luZyBkZWZhdWx0IG9wdGlvbnNcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0cmVlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBleHRlbnNpb25zID0gWyBcImdseXBoXCIgXTtcbiAgICAgICAgaWYgKHR5cGVvZiAkKHRoaXMpLmF0dHIoJ2RhdGEtdHJlZS1kbmQnKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZXh0ZW5zaW9ucy5wdXNoKCBcImRuZFwiICk7XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5mYW5jeXRyZWUoe1xuICAgICAgICAgICAgZXh0ZW5zaW9uczogZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgIGdseXBoOiB0cmVlX2dseXBoX29wdGlvbnMsXG4gICAgICAgICAgICBkbmQ6IHRyZWVfZG5kX29wdGlvbnMsXG4gICAgICAgICAgICBjbGlja0ZvbGRlck1vZGU6IDMsXG4gICAgICAgICAgICBjaGVja2JveDogdHlwZW9mICQodGhpcykuYXR0cignZGF0YS10cmVlLWNoZWNrYm94JykgIT09IFwidW5kZWZpbmVkXCIgfHwgZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RNb2RlOiB0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLXRyZWUtc2VsZWN0JykgIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtdHJlZS1zZWxlY3QnKSkgOiAyXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyJdfQ==
