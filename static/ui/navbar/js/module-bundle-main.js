(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/navbar/main.js":[function(require,module,exports){
// Essentials
require('../../../vendor/ui/js/main');

// Layout
require('../../../vendor/layout/js/main');

// Navbar
require('../../../vendor/navbar/js/main');
},{"../../../vendor/layout/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/main.js","../../../vendor/navbar/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/main.js","../../../vendor/ui/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/main.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_gridalicious.js":[function(require,module,exports){
(function($){

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).gridalicious({
            gutter: $(this).data('gutter') || 15,
            width: $(this).data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function(){
                    $(window).trigger('resize');
                }
            }
        });
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";


    $(function(){

        $('[data-toggle="isotope"]').each(function () {
            $(this).isotope({
                layoutMode: $(this).data('layoutMode') || "packery",
                itemSelector: '.item'
            });

            $(this).isotope('on', 'layoutComplete', function(){
                $(window).trigger('resize');
            });
        });

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('[data-scrollable]').niceScroll({
        cursorborder: 0,
        cursorcolor: config.skins[ skin ][ 'primary-color' ],
        horizrailenabled: false
    });

    $('[data-scrollable-h]').each(function(){

        var nice = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true
        });

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    });

    $('.st-content-inner').niceScroll({
        cursorborder: 0,
        cursorcolor: config.skins[ skin ][ 'primary-color' ],
        horizrailenabled: false
    });

    $('[data-scrollable]').getNiceScroll().resize();

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h]').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var t, spc_demo = $('#sidebar-size-pc-demo');

    if (! spc_demo.length) return;

    $(document).on('sidebar.show', function(){
        $('#pc-open').prop('disabled', true);
    })
    .on('sidebar.hidden', function(){
        $('#pc-open').prop('disabled', false);
    });

    spc_demo.on('submit', function (e) {
        e.preventDefault();
        var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
        ve.blur();
        if (! v.length || v < 25) {
            v = 25;
            ve.val(v);
        }
        s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
        sidebar.open('sidebar-menu');
        clearTimeout(t);
        t = setTimeout(function () {
            sidebar.close('sidebar-menu');
        }, 5000);
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_async.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/_switch.js":[function(require,module,exports){
(function ($) {
    $("[name='switch-checkbox']").bootstrapSwitch({
        offColor: 'danger'
    });
})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/main.js":[function(require,module,exports){
require('./_switch');
},{"./_switch":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/_switch.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js":[function(require,module,exports){
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
module.exports=require("/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skin.js")
},{"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skin.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_slider.js":[function(require,module,exports){
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
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/main.js":[function(require,module,exports){
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
},{"./_cover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_nestable.js","./_progress-bars":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tree.js"}]},{},["./app/js/themes/navbar/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzL25hdmJhci9tYWluLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2FzeW5jLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2dyaWRhbGljaW91cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3Njcm9sbGFibGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2luLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW5zLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvbWFpbi5qcyIsImFwcC92ZW5kb3IvbmF2YmFyL2pzL19zd2l0Y2guanMiLCJhcHAvdmVuZG9yL25hdmJhci9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fY292ZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19kYXRlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZGF0ZXJhbmdlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZXhwYW5kYWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2lmcmFtZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX21pbmljb2xvcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19uZXN0YWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3Byb2dyZXNzLWJhcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3QyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2VsZWN0cGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2hvdy1ob3Zlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYmxlcy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b29sdGlwLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdG91Y2hzcGluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdHJlZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEVzc2VudGlhbHNcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci91aS9qcy9tYWluJyk7XG5cbi8vIExheW91dFxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL2xheW91dC9qcy9tYWluJyk7XG5cbi8vIE5hdmJhclxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL25hdmJhci9qcy9tYWluJyk7IiwiZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cbiAgICB2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG4gICAgICAgIGRvYyA9IHdpbi5kb2N1bWVudCxcbiAgICAgICAgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIG1vZGVybiA9IGRvYy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgICAgIGFkZCA9IG1vZGVybiA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgICAgIHJlbSA9IG1vZGVybiA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgICAgIHByZSA9IG1vZGVybiA/ICcnIDogJ29uJyxcblxuICAgICAgICBpbml0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcbiAgICAgICAgICAgIChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVsgcmVtIF0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoISBkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcm9vdC5kb1Njcm9sbCgnbGVmdCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9sbCwgNTApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXQoJ3BvbGwnKTtcbiAgICAgICAgfTtcblxuICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCEgbW9kZXJuICYmIHJvb3QuZG9TY3JvbGwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdG9wID0gISB3aW4uZnJhbWVFbGVtZW50O1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvcCkgcG9sbCgpO1xuICAgICAgICB9XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIHdpblsgYWRkIF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgYXN5bmNMb2FkZXIgPSBmdW5jdGlvbiAodXJscywgY2FsbGJhY2spIHtcblxuICAgICAgICB1cmxzLmZvcmVhY2goZnVuY3Rpb24gKGksIGZpbGUpIHtcbiAgICAgICAgICAgIGxvYWRDc3MoZmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNraW5nIGZvciBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY2FsbGluZyB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgIGNvbnRlbnRMb2FkZWQod2luZG93LCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRDc3MgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWyAwIF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfTtcblxuICAgIC8vIHNpbXBsZSBmb3JlYWNoIGltcGxlbWVudGF0aW9uXG4gICAgQXJyYXkucHJvdG90eXBlLmZvcmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgdGhpc1sgaSBdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luY0xvYWRlcih1cmxzLCBjYWxsYmFjayk7XG5cbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKHdpbmRvdykuc2V0QnJlYWtwb2ludHMoe1xuICAgICAgICBkaXN0aW5jdDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IFsgMzIwLCA0ODAsIDc2OCwgMTAyNCBdXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpe1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlKj1cImdyaWRhbGljaW91c1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmdyaWRhbGljaW91cyh7XG4gICAgICAgICAgICBndXR0ZXI6ICQodGhpcykuZGF0YSgnZ3V0dGVyJykgfHwgMTUsXG4gICAgICAgICAgICB3aWR0aDogJCh0aGlzKS5kYXRhKCd3aWR0aCcpIHx8IDM3MCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnPiBkaXYnLFxuICAgICAgICAgICAgYW5pbWF0aW9uT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuXG4gICAgJChmdW5jdGlvbigpe1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuaXNvdG9wZSh7XG4gICAgICAgICAgICAgICAgbGF5b3V0TW9kZTogJCh0aGlzKS5kYXRhKCdsYXlvdXRNb2RlJykgfHwgXCJwYWNrZXJ5XCIsXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKCdvbicsICdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkb21DaGFuZ2VkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJykubmljZVNjcm9sbCh7XG4gICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGUtaF0nKS5lYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIG5pY2UgPSAkKHRoaXMpLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIF9zdXBlciA9IG5pY2UuZ2V0Q29udGVudFNpemU7XG5cbiAgICAgICAgbmljZS5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwobmljZSk7XG4gICAgICAgICAgICBwYWdlLmggPSBuaWNlLndpbi5oZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICAkKCcuc3QtY29udGVudC1pbm5lcicpLm5pY2VTY3JvbGwoe1xuICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbignZGVib3VuY2VkcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdLCBbZGF0YS1zY3JvbGxhYmxlLWhdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHQsIHNwY19kZW1vID0gJCgnI3NpZGViYXItc2l6ZS1wYy1kZW1vJyk7XG5cbiAgICBpZiAoISBzcGNfZGVtby5sZW5ndGgpIHJldHVybjtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdzaWRlYmFyLnNob3cnLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgfSlcbiAgICAub24oJ3NpZGViYXIuaGlkZGVuJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3BjLW9wZW4nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHNwY19kZW1vLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBzID0gJCgnLnNpZGViYXInKSwgdmUgPSAkKCcjcGMtdmFsdWUnKSwgdiA9IHZlLnZhbCgpO1xuICAgICAgICB2ZS5ibHVyKCk7XG4gICAgICAgIGlmICghIHYubGVuZ3RoIHx8IHYgPCAyNSkge1xuICAgICAgICAgICAgdiA9IDI1O1xuICAgICAgICAgICAgdmUudmFsKHYpO1xuICAgICAgICB9XG4gICAgICAgIHNbIDAgXS5jbGFzc05hbWUgPSBzWyAwIF0uY2xhc3NOYW1lLnJlcGxhY2UoL3NpZGViYXItc2l6ZS0oW1xcZF0rKXBjL2lnLCAnc2lkZWJhci1zaXplLScgKyB2ICsgJ3BjJyk7XG4gICAgICAgIHNpZGViYXIub3Blbignc2lkZWJhci1tZW51Jyk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgnc2lkZWJhci1tZW51Jyk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2tpbiA9ICQuY29va2llKCdza2luJyk7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2tpbiA9ICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIHNraW47XG59KTsiLCJ2YXIgYXN5bmNMb2FkZXIgPSByZXF1aXJlKCcuL19hc3luYycpO1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFuZ2VTa2luID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2tpbiA9ICQuY29va2llKFwic2tpblwiKSxcbiAgICAgICAgICAgIGZpbGUgPSAkLmNvb2tpZShcInNraW4tZmlsZVwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBza2luICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhc3luY0xvYWRlcihbICdjc3MvJyArIGZpbGUgKyAnLm1pbi5jc3MnIF0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1za2luXScpLnJlbW92ZVByb3AoJ2Rpc2FibGVkJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAkKCdbZGF0YS1za2luXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgICQuY29va2llKFwic2tpblwiLCAkKHRoaXMpLmRhdGEoJ3NraW4nKSk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luLWZpbGVcIiwgJCh0aGlzKS5kYXRhKCdmaWxlJykpO1xuXG4gICAgICAgIGNoYW5nZVNraW4oKTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIik7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcgJiYgc2tpbiAhPSAnZGVmYXVsdCcpIHtcbiAgICAgICAgY2hhbmdlU2tpbigpO1xuICAgIH1cblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19icmVha3BvaW50cy5qcycpO1xucmVxdWlyZSgnLi9fZ3JpZGFsaWNpb3VzLmpzJyk7XG5yZXF1aXJlKCcuL19zY3JvbGxhYmxlLmpzJyk7XG5yZXF1aXJlKCcuL19za2lucycpO1xucmVxdWlyZSgnLi9faXNvdG9wZScpO1xuXG4vLyBTaWRlYmFyIFBlcmNlbnRhZ2UgU2l6ZXMgRGVtb1xucmVxdWlyZSgnLi9fc2lkZWJhci1wYycpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgICQoXCJbbmFtZT0nc3dpdGNoLWNoZWNrYm94J11cIikuYm9vdHN0cmFwU3dpdGNoKHtcbiAgICAgICAgb2ZmQ29sb3I6ICdkYW5nZXInXG4gICAgfSk7XG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX3N3aXRjaCcpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ29uc2VydmUgYXNwZWN0IHJhdGlvIG9mIHRoZSBvcmlnbmFsIHJlZ2lvbi4gVXNlZnVsIHdoZW4gc2hyaW5raW5nL2VubGFyZ2luZ1xuICAgICAqIGltYWdlcyB0byBmaXQgaW50byBhIGNlcnRhaW4gYXJlYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNXaWR0aCBTb3VyY2UgYXJlYSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNIZWlnaHQgU291cmNlIGFyZWEgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFdpZHRoIEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4SGVpZ2h0IEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7IHdpZHRoLCBoZWlndGggfVxuICAgICAqL1xuICAgIHZhciBhc3BlY3RSYXRpb0ZpdCA9IGZ1bmN0aW9uIChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG5cbiAgICAgICAgdmFyIHdSYXRpbyA9IG1heFdpZHRoIC8gc3JjV2lkdGgsXG4gICAgICAgICAgICBoUmF0aW8gPSBtYXhIZWlnaHQgLyBzcmNIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0O1xuXG4gICAgICAgIGlmIChzcmNXaWR0aCAvIG1heFdpZHRoIDwgc3JjSGVpZ2h0IC8gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB3aWR0aCA9IG1heFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0ICogd1JhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBzcmNXaWR0aCAqIGhSYXRpbztcbiAgICAgICAgICAgIGhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhlaWdodCgpIHtcblxuICAgICAgICAkKCcuY292ZXIub3ZlcmxheScpLmZpbHRlcignOnZpc2libGUnKS5ub3QoJ1tjbGFzcyo9XCJoZWlnaHRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpID0gdC5maW5kKCdpbWc6Zmlyc3QnKTtcblxuICAgICAgICAgICAgdC5oZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheS1mdWxsJywgdCkuaW5uZXJIZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdkb21DaGFuZ2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Zlci5vdmVybGF5JykuZmlsdGVyKCc6dmlzaWJsZScpLmZpbHRlcignW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGkgPSB0LmZpbmQoJ2ltZzpmaXJzdCcpO1xuXG4gICAgICAgICAgICBpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICBpLmNzcyhhc3BlY3RSYXRpb0ZpdChpLndpZHRoKCksIGkuaGVpZ2h0KCksIHQud2lkdGgoKSwgdC5oZWlnaHQoKSkpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGhlaWdodCk7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgaGVpZ2h0KTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbihcImRlYm91bmNlZHJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoaGVpZ2h0LCAyMDApO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNyZXBvcnRyYW5nZScpLmRhdGVyYW5nZXBpY2tlcihcbiAgICAgICAge1xuICAgICAgICAgICAgcmFuZ2VzOiB7XG4gICAgICAgICAgICAgICAgJ1RvZGF5JzogW21vbWVudCgpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1llc3RlcmRheSc6IFttb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpLCBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCA3IERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCA2KSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdMYXN0IDMwIERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnVGhpcyBNb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgTW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuZW5kT2YoJ21vbnRoJyldXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDI5KSxcbiAgICAgICAgICAgIGVuZERhdGU6IG1vbWVudCgpXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgICQoJyNyZXBvcnRyYW5nZSBzcGFuJykuaHRtbChzdGFydC5mb3JtYXQoJ01NTU0gRCwgWVlZWScpICsgJyAtICcgKyBlbmQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgJCgnI3Jlc2VydmF0aW9udGltZScpLmRhdGVyYW5nZXBpY2tlcih7IHRpbWVQaWNrZXI6IHRydWUsIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IDMwLCBmb3JtYXQ6ICdNTS9ERC9ZWVlZIGg6bW0gQScgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQoJy5leHBhbmRhYmxlJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICQodGhpcykuZmluZCgnLmV4cGFuZGFibGUtY29udGVudCcpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImV4cGFuZGFibGUtaW5kaWNhdG9yXCI+PGk+PC9pPjwvZGl2PicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS1pbmRpY2F0b3InLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5leHBhbmRhYmxlJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS10cmlnZ2VyOm5vdCguZXhwYW5kYWJsZS1vcGVuKScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBpZiB3ZSdyZSBpbnNpZGUgYW4gaWZyYW1lLCByZWxvYWQgd2l0aG91dCBpZnJhbWVcbiAgICBpZiAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgIHRvcC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLm1pbmljb2xvcnMgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCcubWluaWNvbG9ycycpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkKHRoaXMpLm1pbmljb2xvcnMoe1xuICAgICAgICAgICAgICAgIGNvbnRyb2w6ICQodGhpcykuYXR0cignZGF0YS1jb250cm9sJykgfHwgJ2h1ZScsXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtZGVmYXVsdFZhbHVlJykgfHwgJycsXG4gICAgICAgICAgICAgICAgaW5saW5lOiAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5saW5lJykgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICBsZXR0ZXJDYXNlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtbGV0dGVyQ2FzZScpIHx8ICdsb3dlcmNhc2UnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICQodGhpcykuYXR0cignZGF0YS1vcGFjaXR5JyksXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICQodGhpcykuYXR0cignZGF0YS1wb3NpdGlvbicpIHx8ICdib3R0b20gbGVmdCcsXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoaGV4LCBvcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIGhleCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BhY2l0eSkgaGV4ICs9ICcsICcgKyBvcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4ubmVzdGFibGUgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCcubmVzdGFibGUnKS5uZXN0YWJsZSh7XG4gICAgICAgICAgICByb290Q2xhc3M6ICduZXN0YWJsZScsXG4gICAgICAgICAgICBsaXN0Tm9kZU5hbWU6ICd1bCcsXG4gICAgICAgICAgICBsaXN0Q2xhc3M6ICduZXN0YWJsZS1saXN0JyxcbiAgICAgICAgICAgIGl0ZW1DbGFzczogJ25lc3RhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgZHJhZ0NsYXNzOiAnbmVzdGFibGUtZHJhZycsXG4gICAgICAgICAgICBoYW5kbGVDbGFzczogJ25lc3RhYmxlLWhhbmRsZScsXG4gICAgICAgICAgICBjb2xsYXBzZWRDbGFzczogJ25lc3RhYmxlLWNvbGxhcHNlZCcsXG4gICAgICAgICAgICBwbGFjZUNsYXNzOiAnbmVzdGFibGUtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgZW1wdHlDbGFzczogJ25lc3RhYmxlLWVtcHR5J1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy8gUHJvZ3Jlc3MgQmFyIEFuaW1hdGlvblxuICAgICQoJy5wcm9ncmVzcy1iYXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS53aWR0aCgkKHRoaXMpLmF0dHIoJ2FyaWEtdmFsdWVub3cnKSArICclJyk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJzZWxlY3QyXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHQuZGF0YSgnYWxsb3dDbGVhcicpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHQuaXMoJ2J1dHRvbicpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0LmlzKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodC5pcygnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi10YWdzXCJdJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRhZ3MgPSB0LmRhdGEoJ3RhZ3MnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0LnNlbGVjdDIob3B0aW9ucyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1lbmFibGVcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNlbGVjdDIoXCJlbmFibGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItZGlzYWJsZVwiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkuc2VsZWN0MihcImRpc2FibGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRlbXBsYXRpbmdcbiAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKCEgc3RhdGUuaWQpIHJldHVybiBzdGF0ZS50ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIFwiPGltZyBjbGFzcz0nZmxhZycgc3JjPSdodHRwOi8vc2VsZWN0Mi5naXRodWIuaW8vc2VsZWN0Mi9pbWFnZXMvZmxhZ3MvXCIgKyBzdGF0ZS5pZC50b0xvd2VyQ2FzZSgpICsgXCIucG5nJy8+XCIgKyBzdGF0ZS50ZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgICQoXCIjc2VsZWN0Ml83XCIpLnNlbGVjdDIoe1xuICAgICAgICAgICAgZm9ybWF0UmVzdWx0OiBmb3JtYXQsXG4gICAgICAgICAgICBmb3JtYXRTZWxlY3Rpb246IGZvcm1hdCxcbiAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3RwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgJCgnLnNlbGVjdHBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICQodGhpcykuZGF0YSgnd2lkdGgnKSB8fCAnMTAwJSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2hvd0hvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1zaG93LWhvdmVyXScpLmhpZGUoKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSAkKHRoaXMpLmRhdGEoJ3Nob3dIb3ZlcicpO1xuXG4gICAgICAgICAgICBzZWxmLmNsb3Nlc3QocGFyZW50KS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaG93SG92ZXIoKTtcblxuICAgIHdpbmRvdy5zaG93SG92ZXIgPSBzaG93SG92ZXI7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtc2xpZGVyPVwiZGVmYXVsdFwiXScpLnNsaWRlcigpO1xuXG4gICAgICAgICQoJ1tkYXRhLXNsaWRlcj1cImZvcm1hdHRlclwiXScpLnNsaWRlcih7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCB2YWx1ZTogJyArIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1vbi1zbGlkZV0nKS5vbihcInNsaWRlXCIsIGZ1bmN0aW9uIChzbGlkZUV2dCkge1xuICAgICAgICAgICAgJCgkKHRoaXMpLmF0dHIoJ2RhdGEtb24tc2xpZGUnKSkudGV4dChzbGlkZUV2dC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zbGlkZXItaGFuZGxlJykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1iYXJzIGZhLXJvdGF0ZS05MFwiPjwvaT4nKTtcblxuICAgIH1cblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5kYXRhVGFibGUgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAvLyBEYXRhdGFibGVzXG4gICAgICAgICQoJyNkYXRhLXRhYmxlJykuZGF0YVRhYmxlKCk7XG5cbiAgICB9XG5cbiAgICAvLyBUYWJsZSBDaGVja2JveCBBbGxcbiAgICAkKCcjY2hlY2tBbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ3RhYmxlJykuZmluZCgndGQgaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdGhpcy5jaGVja2VkKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi9fc2tpbicpKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGFicyA9ICQodGhpcykubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIG9uZWF4aXNtb3VzZW1vZGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIF9zdXBlciA9IHRhYnMuZ2V0Q29udGVudFNpemU7XG4gICAgICAgIHRhYnMuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwodGFicyk7XG4gICAgICAgICAgICBwYWdlLmggPSB0YWJzLndpbi5oZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzIGEnKS5vbignc2hvd24uYnMudGFiJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmNsb3Nlc3QoJy50YWJiYWJsZScpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXG4gICAgICAgICAgICB0YXJnZXRQYW5lID0gdGFyZ2V0LmF0dHIoJ2hyZWYnKSB8fCB0YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0YWJzIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxcbiAgICAgICAgdGFiLmZpbmQoJy5uYXYtdGFicycpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICAgICAvLyByZWZyZXNoIFtkYXRhLXNjcm9sbGFibGVdIHdpdGhpbiB0aGUgYWN0aXZhdGVkIHRhYiBwYW5lXG4gICAgICAgICQodGFyZ2V0UGFuZSkuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBUb29sdGlwXG4gICAgJChcImJvZHlcIikudG9vbHRpcCh7c2VsZWN0b3I6ICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJywgY29udGFpbmVyOiBcImJvZHlcIn0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLlRvdWNoU3BpbiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvdWNoLXNwaW5cIl0nKS5Ub3VjaFNwaW4oKTtcblxuICAgIH1cblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5mYW5jeXRyZWUgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgIHZhciB0cmVlX2dseXBoX29wdGlvbnMgPSB7XG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgY2hlY2tib3g6IFwiZmEgZmEtc3F1YXJlLW9cIixcbiAgICAgICAgICAgIGNoZWNrYm94U2VsZWN0ZWQ6IFwiZmEgZmEtY2hlY2stc3F1YXJlXCIsXG4gICAgICAgICAgICBjaGVja2JveFVua25vd246IFwiZmEgZmEtY2hlY2stc3F1YXJlIGZhLW11dGVkXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiLFxuICAgICAgICAgICAgZXhwYW5kZXJDbG9zZWQ6IFwiZmEgZmEtY2FyZXQtcmlnaHRcIixcbiAgICAgICAgICAgIGV4cGFuZGVyTGF6eTogXCJmYSBmYS1hbmdsZS1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJPcGVuOiBcImZhIGZhLWNhcmV0LWRvd25cIixcbiAgICAgICAgICAgIGRvYzogXCJmYSBmYS1maWxlLW9cIixcbiAgICAgICAgICAgIG5vRXhwYW5kZXI6IFwiXCIsXG4gICAgICAgICAgICBkb2NPcGVuOiBcImZhIGZhLWZpbGVcIixcbiAgICAgICAgICAgIGxvYWRpbmc6IFwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXCIsXG4gICAgICAgICAgICBmb2xkZXI6IFwiZmEgZmEtZm9sZGVyXCIsXG4gICAgICAgICAgICBmb2xkZXJPcGVuOiBcImZhIGZhLWZvbGRlci1vcGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJlZV9kbmRfb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b0V4cGFuZE1TOiA0MDAsXG4gICAgICAgICAgICBmb2N1c09uQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICBwcmV2ZW50Vm9pZE1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzICdiZWZvcmUgc2VsZicsIGV0Yy5cbiAgICAgICAgICAgIHByZXZlbnRSZWN1cnNpdmVNb3ZlczogdHJ1ZSwgLy8gUHJldmVudCBkcm9wcGluZyBub2RlcyBvbiBvd24gZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcmFnZ2luZyBmb3IgdGhlIHRyZWUuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIGZhbHNlIHRvIGNhbmNlbCBkcmFnZ2luZyBvZiBub2RlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0VudGVyOiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogZGF0YS5vdGhlck5vZGUgbWF5IGJlIG51bGwgZm9yIG5vbi1mYW5jeXRyZWUgZHJvcHBhYmxlcy5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gZGlzYWxsb3cgZHJvcHBpbmcgb24gbm9kZS4gSW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgKiAgZHJhZ092ZXIgYW5kIGRyYWdMZWF2ZSBhcmUgbm90IGNhbGxlZC5cbiAgICAgICAgICAgICAqICBSZXR1cm4gJ292ZXInLCAnYmVmb3JlLCBvciAnYWZ0ZXInIHRvIGZvcmNlIGEgaGl0TW9kZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gWydiZWZvcmUnLCAnYWZ0ZXInXSB0byByZXN0cmljdCBhdmFpbGFibGUgaGl0TW9kZXMuXG4gICAgICAgICAgICAgKiAgQW55IG90aGVyIHJldHVybiB2YWx1ZSB3aWxsIGNhbGMgdGhlIGhpdE1vZGUgZnJvbSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRyb3BwaW5nIGEgcGFyZW50IGJlbG93IGFub3RoZXIgcGFyZW50IChvbmx5IHNvcnRcbiAgICAgICAgICAgIC8vIG5vZGVzIHVuZGVyIHRoZSBzYW1lIHBhcmVudClcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZihub2RlLnBhcmVudCAhPT0gZGF0YS5vdGhlck5vZGUucGFyZW50KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBkcm9wcGluZyAqb3ZlciogYSBub2RlICh3b3VsZCBjcmVhdGUgYSBjaGlsZClcbiAgICAgICAgICAgIHJldHVybiBbXCJiZWZvcmVcIiwgXCJhZnRlclwiXTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0Ryb3A6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBUaGlzIGZ1bmN0aW9uIE1VU1QgYmUgZGVmaW5lZCB0byBlbmFibGUgZHJvcHBpbmcgb2YgaXRlbXMgb25cbiAgICAgICAgICAgICAqICB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZGF0YS5vdGhlck5vZGUubW92ZVRvKG5vZGUsIGRhdGEuaGl0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdXNpbmcgZGVmYXVsdCBvcHRpb25zXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidHJlZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IFsgXCJnbHlwaFwiIF07XG4gICAgICAgIGlmICh0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLXRyZWUtZG5kJykgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucHVzaCggXCJkbmRcIiApO1xuICAgICAgICB9XG4gICAgICAgICQodGhpcykuZmFuY3l0cmVlKHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IGV4dGVuc2lvbnMsXG4gICAgICAgICAgICBnbHlwaDogdHJlZV9nbHlwaF9vcHRpb25zLFxuICAgICAgICAgICAgZG5kOiB0cmVlX2RuZF9vcHRpb25zLFxuICAgICAgICAgICAgY2xpY2tGb2xkZXJNb2RlOiAzLFxuICAgICAgICAgICAgY2hlY2tib3g6IHR5cGVvZiAkKHRoaXMpLmF0dHIoJ2RhdGEtdHJlZS1jaGVja2JveCcpICE9PSBcInVuZGVmaW5lZFwiIHx8IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0TW9kZTogdHlwZW9mICQodGhpcykuYXR0cignZGF0YS10cmVlLXNlbGVjdCcpICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLXRyZWUtc2VsZWN0JykpIDogMlxuICAgICAgICB9KTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCJyZXF1aXJlKCcuL190YWJzJyk7XG5yZXF1aXJlKCcuL190cmVlJyk7XG5yZXF1aXJlKCcuL19zaG93LWhvdmVyJyk7XG5yZXF1aXJlKCcuL19kYXRlcmFuZ2VwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2V4cGFuZGFibGUnKTtcbnJlcXVpcmUoJy4vX25lc3RhYmxlJyk7XG5yZXF1aXJlKCcuL19jb3ZlcicpO1xucmVxdWlyZSgnLi9fdG9vbHRpcCcpO1xucmVxdWlyZSgnLi9fdGFibGVzJyk7XG5yZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19pZnJhbWUnKTtcblxuLy8gRm9ybXNcbnJlcXVpcmUoJy4vX3RvdWNoc3BpbicpO1xucmVxdWlyZSgnLi9fc2VsZWN0MicpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL19zZWxlY3RwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vX21pbmljb2xvcnMnKTsiXX0=
