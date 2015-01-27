(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/docs/main.js":[function(require,module,exports){
// Essentials
require('../../../vendor/ui/js/main');

// Layout
require('../../../vendor/layout/js/main');

// Sidebar
require('../../../vendor/navbar/js/main');

// Sidebar
require('../../../vendor/sidebar/js/main');

// CORE
require('./theme-core');
},{"../../../vendor/layout/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/main.js","../../../vendor/navbar/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/main.js","../../../vendor/sidebar/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/main.js","../../../vendor/ui/js/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/main.js","./theme-core":"/persistent/var/www/html/themekit-3.6.1/dev/app/js/themes/docs/theme-core.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/js/themes/docs/_docs.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.st-content-inner').scrollspy({target: '#menu', offset: 56});

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/js/themes/docs/theme-core.js":[function(require,module,exports){
// CUSTOM
require('./_docs');
},{"./_docs":"/persistent/var/www/html/themekit-3.6.1/dev/app/js/themes/docs/_docs.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
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
},{"./_switch":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/navbar/js/_switch.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_collapsible.js":[function(require,module,exports){
(function($){

    require('./_transform_collapse')();

})(jQuery);
},{"./_transform_collapse":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_transform_collapse.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {

    var transform_dd = require('./_transform_dropdown'),
        transform_collapse = require('./_transform_collapse');

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{"./_transform_collapse":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_transform_collapse.js","./_transform_dropdown":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_transform_dropdown.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_options.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    /*jshint browser: true, strict: false */

    $('#subnav').collapse({'toggle': false});

    $('[data-toggle="sidebar-transform"]').on('click', function () {
        $('body').toggleClass('sidebar-mini');
        if ($('body').is('.sidebar-mini')) $('.sidebar-menu .collapse').collapse('hide');
        $('#dropdown-temp').hide();
        $('.sidebar-menu .open').removeClass('open');
    });

})(jQuery);

(function ($) {

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            container = $('.st-container'),

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {
            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }
        });

        $('.sidebar').each(function(){
            var sidebar = $(this);

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_transform_collapse.js":[function(require,module,exports){
module.exports = function () {

    $('.sidebar[data-type="collapse"]').each(function(){

        var dd = $(this);

        dd.find('.sidebar-menu > li > a').off('mouseenter');
        dd.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        dd.find('.sidebar-menu > li > a').off('mouseenter');
        dd.find('.sidebar-menu > li > a').off('click');
        dd.off('mouseleave');
        dd.find('.dropdown').off('mouseover');
        dd.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        dd.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        dd.find('#dropdown-temp').remove();

        dd.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse');

        dd.find('.collapse').on('shown.bs.collapse', function () {
            dd.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        dd.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open [data-toggle="collapse"]');
            if (parents.length) {
                parents.trigger('click');
            }
            $(this).closest('.hasSubmenu').addClass("open");
        });

        dd.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass("open");
        });

        dd.find('.collapse').collapse({ 'toggle': false });

    });
};
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_transform_dropdown.js":[function(require,module,exports){
module.exports = function () {

    $('.sidebar[data-type="dropdown"]').each(function(){

        var dd = $(this);

        dd.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = dd.find('[data-scrollable]').getNiceScroll()[ 0 ];

        nice.scrollstart(function () {
            if (! dd.is('[data-type="dropdown"]')) return;
            dd.addClass('scrolling');
            dd.find('#dropdown-temp > ul > li').empty();
            dd.find('#dropdown-temp').hide();
            dd.find('.open').removeClass('open');
        });

        nice.scrollend(function () {
            if (! dd.is('[data-type="dropdown"]')) return;
            $.data(this, 'lastScrollTop', nice.getScrollTop());
            dd.removeClass('scrolling');
        });

        dd.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        dd.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var sidebar = $(this).parents('.sidebar:first'),
                c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        dd.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        dd.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        dd.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        dd.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    });

};
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');
},{"./_breakpoints":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_breakpoints.js","./_collapsible":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_collapsible.js","./_dropdown":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_dropdown.js","./_sidebar-menu":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/sidebar/js/_sidebar-toggle.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js":[function(require,module,exports){
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
},{"./_cover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_nestable.js","./_progress-bars":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/ui/js/_tree.js"}]},{},["./app/js/themes/docs/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzL2RvY3MvbWFpbi5qcyIsImFwcC9qcy90aGVtZXMvZG9jcy9fZG9jcy5qcyIsImFwcC9qcy90aGVtZXMvZG9jcy90aGVtZS1jb3JlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2FzeW5jLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2dyaWRhbGljaW91cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3Njcm9sbGFibGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2luLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW5zLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvbWFpbi5qcyIsImFwcC92ZW5kb3IvbmF2YmFyL2pzL19zd2l0Y2guanMiLCJhcHAvdmVuZG9yL25hdmJhci9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19icmVha3BvaW50cy5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fY29sbGFwc2libGUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX2Ryb3Bkb3duLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19vcHRpb25zLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19zaWRlYmFyLW1lbnUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX3NpZGViYXItdG9nZ2xlLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL190cmFuc2Zvcm1fY29sbGFwc2UuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX3RyYW5zZm9ybV9kcm9wZG93bi5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fY292ZXIuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19kYXRlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZGF0ZXJhbmdlcGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZXhwYW5kYWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2lmcmFtZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX21pbmljb2xvcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19uZXN0YWJsZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3Byb2dyZXNzLWJhcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3QyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2VsZWN0cGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2hvdy1ob3Zlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYmxlcy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b29sdGlwLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdG91Y2hzcGluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdHJlZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBFc3NlbnRpYWxzXG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvdWkvanMvbWFpbicpO1xuXG4vLyBMYXlvdXRcbnJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9sYXlvdXQvanMvbWFpbicpO1xuXG4vLyBTaWRlYmFyXG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvbmF2YmFyL2pzL21haW4nKTtcblxuLy8gU2lkZWJhclxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3NpZGViYXIvanMvbWFpbicpO1xuXG4vLyBDT1JFXG5yZXF1aXJlKCcuL3RoZW1lLWNvcmUnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJy5zdC1jb250ZW50LWlubmVyJykuc2Nyb2xsc3B5KHt0YXJnZXQ6ICcjbWVudScsIG9mZnNldDogNTZ9KTtcblxufSkoalF1ZXJ5KTsiLCIvLyBDVVNUT01cbnJlcXVpcmUoJy4vX2RvY3MnKTsiLCJmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuICAgIHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cbiAgICAgICAgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgbW9kZXJuID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICAgICAgYWRkID0gbW9kZXJuID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICAgICAgcmVtID0gbW9kZXJuID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICAgICAgcHJlID0gbW9kZXJuID8gJycgOiAnb24nLFxuXG4gICAgICAgIGluaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuICAgICAgICAgICAgKGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpWyByZW0gXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghIGRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsLCA1MCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdCgncG9sbCcpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuICAgIGVsc2Uge1xuICAgICAgICBpZiAoISBtb2Rlcm4gJiYgcm9vdC5kb1Njcm9sbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0b3AgPSAhIHdpbi5mcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9wKSBwb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgd2luWyBhZGQgXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJscywgY2FsbGJhY2spIHtcblxuICAgIHZhciBhc3luY0xvYWRlciA9IGZ1bmN0aW9uICh1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHVybHMuZm9yZWFjaChmdW5jdGlvbiAoaSwgZmlsZSkge1xuICAgICAgICAgICAgbG9hZENzcyhmaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2tpbmcgZm9yIGEgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY29udGVudExvYWRlZCh3aW5kb3csIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZENzcyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbIDAgXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9O1xuXG4gICAgLy8gc2ltcGxlIGZvcmVhY2ggaW1wbGVtZW50YXRpb25cbiAgICBBcnJheS5wcm90b3R5cGUuZm9yZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCB0aGlzWyBpIF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jTG9hZGVyKHVybHMsIGNhbGxiYWNrKTtcblxufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQod2luZG93KS5zZXRCcmVha3BvaW50cyh7XG4gICAgICAgIGRpc3RpbmN0OiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czogWyAzMjAsIDQ4MCwgNzY4LCAxMDI0IF1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCl7XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwiZ3JpZGFsaWNpb3VzXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuZ3JpZGFsaWNpb3VzKHtcbiAgICAgICAgICAgIGd1dHRlcjogJCh0aGlzKS5kYXRhKCdndXR0ZXInKSB8fCAxNSxcbiAgICAgICAgICAgIHdpZHRoOiAkKHRoaXMpLmRhdGEoJ3dpZHRoJykgfHwgMzcwLFxuICAgICAgICAgICAgc2VsZWN0b3I6ICc+IGRpdicsXG4gICAgICAgICAgICBhbmltYXRpb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cbiAgICAkKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKHtcbiAgICAgICAgICAgICAgICBsYXlvdXRNb2RlOiAkKHRoaXMpLmRhdGEoJ2xheW91dE1vZGUnKSB8fCBcInBhY2tlcnlcIixcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXRlbSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoJ29uJywgJ2xheW91dENvbXBsZXRlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RvbUNoYW5nZWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4vX3NraW4nKSgpO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZS1oXScpLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgbmljZSA9ICQodGhpcykubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgICAgICBuaWNlLmdldENvbnRlbnRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgICQoJy5zdC1jb250ZW50LWlubmVyJykubmljZVNjcm9sbCh7XG4gICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgdmFyIHQ7XG4gICAgJCh3aW5kb3cpLm9uKCdkZWJvdW5jZWRyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0sIFtkYXRhLXNjcm9sbGFibGUtaF0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgdCwgc3BjX2RlbW8gPSAkKCcjc2lkZWJhci1zaXplLXBjLWRlbW8nKTtcblxuICAgIGlmICghIHNwY19kZW1vLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgJChkb2N1bWVudCkub24oJ3NpZGViYXIuc2hvdycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyNwYy1vcGVuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB9KVxuICAgIC5vbignc2lkZWJhci5oaWRkZW4nLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgc3BjX2RlbW8ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHMgPSAkKCcuc2lkZWJhcicpLCB2ZSA9ICQoJyNwYy12YWx1ZScpLCB2ID0gdmUudmFsKCk7XG4gICAgICAgIHZlLmJsdXIoKTtcbiAgICAgICAgaWYgKCEgdi5sZW5ndGggfHwgdiA8IDI1KSB7XG4gICAgICAgICAgICB2ID0gMjU7XG4gICAgICAgICAgICB2ZS52YWwodik7XG4gICAgICAgIH1cbiAgICAgICAgc1sgMCBdLmNsYXNzTmFtZSA9IHNbIDAgXS5jbGFzc05hbWUucmVwbGFjZSgvc2lkZWJhci1zaXplLShbXFxkXSspcGMvaWcsICdzaWRlYmFyLXNpemUtJyArIHYgKyAncGMnKTtcbiAgICAgICAgc2lkZWJhci5vcGVuKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsInZhciBhc3luY0xvYWRlciA9IHJlcXVpcmUoJy4vX2FzeW5jJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYW5nZVNraW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpLFxuICAgICAgICAgICAgZmlsZSA9ICQuY29va2llKFwic2tpbi1maWxlXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFzeW5jTG9hZGVyKFsgJ2Nzcy8nICsgZmlsZSArICcubWluLmNzcycgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXNraW5dJykucmVtb3ZlUHJvcCgnZGlzYWJsZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luXCIsICQodGhpcykuZGF0YSgnc2tpbicpKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW4tZmlsZVwiLCAkKHRoaXMpLmRhdGEoJ2ZpbGUnKSk7XG5cbiAgICAgICAgY2hhbmdlU2tpbigpO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgc2tpbiA9ICQuY29va2llKFwic2tpblwiKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJyAmJiBza2luICE9ICdkZWZhdWx0Jykge1xuICAgICAgICBjaGFuZ2VTa2luKCk7XG4gICAgfVxuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzLmpzJyk7XG5yZXF1aXJlKCcuL19ncmlkYWxpY2lvdXMuanMnKTtcbnJlcXVpcmUoJy4vX3Njcm9sbGFibGUuanMnKTtcbnJlcXVpcmUoJy4vX3NraW5zJyk7XG5yZXF1aXJlKCcuL19pc290b3BlJyk7XG5cbi8vIFNpZGViYXIgUGVyY2VudGFnZSBTaXplcyBEZW1vXG5yZXF1aXJlKCcuL19zaWRlYmFyLXBjJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgJChcIltuYW1lPSdzd2l0Y2gtY2hlY2tib3gnXVwiKS5ib290c3RyYXBTd2l0Y2goe1xuICAgICAgICBvZmZDb2xvcjogJ2RhbmdlcidcbiAgICB9KTtcbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fc3dpdGNoJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCJodG1sXCIpLmFkZENsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyLnNpZGViYXItdmlzaWJsZS1kZXNrdG9wJykubm90KCc6dmlzaWJsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gc2lkZWJhci5vcHRpb25zKCQodGhpcykpO1xuICAgICAgICAgICAgICAgIHNpZGViYXIub3BlbigkKHRoaXMpLmF0dHIoJ2lkJyksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG4gICAgICAgICAgICAkKCcuc2lkZWJhcjp2aXNpYmxlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NzY4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAoJCgnLmhpZGUtc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICByZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50MTAyNCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaWYgKCQoJy5oaWRlLXNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgcmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDQ4MCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEgJCgnLnNpZGViYXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBoaWRlKCk7XG4gICAgfVxuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uKCQpe1xuXG4gICAgcmVxdWlyZSgnLi9fdHJhbnNmb3JtX2NvbGxhcHNlJykoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciB0cmFuc2Zvcm1fZGQgPSByZXF1aXJlKCcuL190cmFuc2Zvcm1fZHJvcGRvd24nKSxcbiAgICAgICAgdHJhbnNmb3JtX2NvbGxhcHNlID0gcmVxdWlyZSgnLi9fdHJhbnNmb3JtX2NvbGxhcHNlJyk7XG5cbiAgICB0cmFuc2Zvcm1fZGQoKTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ0ODAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykuYXR0cignZGF0YS10eXBlJywgJ2NvbGxhcHNlJykuYXR0cignZGF0YS10cmFuc2Zvcm1lZCcsIHRydWUpO1xuICAgICAgICB0cmFuc2Zvcm1fY29sbGFwc2UoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1ha2VfZGQoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdW2RhdGEtdHJhbnNmb3JtZWRdJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdW2RhdGEtdHJhbnNmb3JtZWRdJykuYXR0cignZGF0YS10eXBlJywgJ2Ryb3Bkb3duJykuYXR0cignZGF0YS10cmFuc2Zvcm1lZCcsIHRydWUpO1xuICAgICAgICB0cmFuc2Zvcm1fZGQoKTtcbiAgICB9XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NzY4JywgbWFrZV9kZCk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50MTAyNCcsIG1ha2VfZGQpO1xuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNpZGViYXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBcInRyYW5zZm9ybS1idXR0b25cIjogc2lkZWJhci5kYXRhKCd0cmFuc2Zvcm1CdXR0b24nKSA9PT0gdHJ1ZSxcbiAgICAgICAgXCJ0cmFuc2Zvcm0tYnV0dG9uLWljb25cIjogc2lkZWJhci5kYXRhKCd0cmFuc2Zvcm1CdXR0b25JY29uJykgfHwgJ2ZhLWVsbGlwc2lzLWgnXG4gICAgfTtcbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2lkZWJhcnMgPSAkKCcuc2lkZWJhcicpO1xuXG4gICAgc2lkZWJhcnMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4vX29wdGlvbnMnKShzaWRlYmFyKTtcblxuICAgICAgICBpZiAob3B0aW9uc1sgJ3RyYW5zZm9ybS1idXR0b24nIF0pIHtcbiAgICAgICAgICAgIHZhciBidXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nKTtcblxuICAgICAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3NpZGViYXItdHJhbnNmb3JtJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0biBidG4tZGVmYXVsdCcpXG4gICAgICAgICAgICAgICAgLmh0bWwoJzxpIGNsYXNzPVwiZmEgJyArIG9wdGlvbnNbICd0cmFuc2Zvcm0tYnV0dG9uLWljb24nIF0gKyAnXCI+PC9pPicpO1xuXG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUnKS5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIC8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogZmFsc2UgKi9cblxuICAgICQoJyNzdWJuYXYnKS5jb2xsYXBzZSh7J3RvZ2dsZSc6IGZhbHNlfSk7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLXRyYW5zZm9ybVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzaWRlYmFyLW1pbmknKTtcbiAgICAgICAgaWYgKCQoJ2JvZHknKS5pcygnLnNpZGViYXItbWluaScpKSAkKCcuc2lkZWJhci1tZW51IC5jb2xsYXBzZScpLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgICAgICQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAkKCcuc2lkZWJhci1tZW51IC5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICBmdW5jdGlvbiBtb2JpbGVjaGVjaygpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgaWYgKC8oYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGt8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWluby9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpXG4gICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH1cblxuICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGVmZmVjdDogJ3N0LWVmZmVjdC0xJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTUwLFxuICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb250YWluZXIgPSAkKCcuc3QtY29udGFpbmVyJyksXG5cbiAgICAgICAgICAgIGV2ZW50dHlwZSA9IG1vYmlsZWNoZWNrKCkgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLFxuXG4gICAgICAgICAgICBnZXRMYXlvdXRDbGFzc2VzID0gZnVuY3Rpb24gKHNpZGViYXIsIGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxheW91dENsYXNzZXMgPSBzaWRlYmFyLmRhdGEoJ2xheW91dENsYXNzZXMnKTtcblxuICAgICAgICAgICAgICAgIGlmICghIGxheW91dENsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvZ2dsZUxheW91dCA9IHNpZGViYXIuZGF0YSgndG9nZ2xlTGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9nZ2xlTGF5b3V0ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gdG9nZ2xlTGF5b3V0LnNwbGl0KFwiLFwiKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXIuZGF0YSgnbGF5b3V0Q2xhc3NlcycsIGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxheW91dENsYXNzZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBuZXcgUmVnRXhwKCdzaWRlYmFyLScgKyBkaXJlY3Rpb24gKyAnKFxcXFxTKyknLCAnaWcnKTtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9ICQoJ2h0bWwnKS5nZXQoMCkuY2xhc3NOYW1lLm1hdGNoKG1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheW91dENsYXNzZXMgIT09IG51bGwgJiYgbGF5b3V0Q2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSBsYXlvdXRDbGFzc2VzLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5kYXRhKCdsYXlvdXRDbGFzc2VzJywgbGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGF5b3V0Q2xhc3NlcztcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0U2lkZWJhckRhdGFPcHRpb25zID0gZnVuY3Rpb24oc2lkZWJhcil7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3Q6IHNpZGViYXIuZGF0YSgnZWZmZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHNpZGViYXIuZGF0YSgnb3ZlcmxheScpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYW5pbWF0aW5nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnYW5pbWF0aW5nJykpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2V0ID0gZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdHlwZW9mIGlkICE9PSAndW5kZWZpbmVkJyA/ICcjJyArIGlkIDogY29udGFpbmVyLmRhdGEoJ3N0TWVudVRhcmdldCcpLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyID0gJCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmlzKCc6dmlzaWJsZScpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBlZmZlY3QgPSB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucy5lZmZlY3QgPyBvcHRpb25zLmVmZmVjdCA6IGNvbnRhaW5lci5kYXRhKCdzdE1lbnVFZmZlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gc2lkZWJhci5pcygnLmxlZnQnKSA/ICdsJyA6ICdyJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHNpZGViYXIuZ2V0KDApLmNsYXNzTmFtZS5tYXRjaCgvc2lkZWJhci1zaXplLShcXFMrKS8pLnBvcCgpLFxuICAgICAgICAgICAgICAgICAgICBodG1sQ2xhc3MgPSAnc3QtZWZmZWN0LScgKyBkaXJlY3Rpb24gKyBzaXplLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVMYXlvdXQgPSBzaWRlYmFyLmRhdGEoJ3RvZ2dsZUxheW91dCcpLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gZ2V0TGF5b3V0Q2xhc3NlcyhzaWRlYmFyLCBkaXJlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiBzaWRlYmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuaGlkZScsIGV2ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl1baHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKGh0bWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhlZmZlY3QpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdzdC1tZW51LW9wZW4gc3QtcHVzaGVyLW92ZXJsYXknKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUxheW91dCkgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nZXQoMCkuY2xhc3NOYW1lID0gJ3N0LWNvbnRhaW5lcic7IC8vIGNsZWFyXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLmhpZGRlbicsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgfSwgZGVmYXVsdHMuZHVyYXRpb24pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvcGVuID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIG9uIG1vYmlsZSwgYWxsb3cgb25seSBvbmUgc2lkZWJhciB0byBiZSBvcGVuIGF0IHRoZSBzYW1lIHRpbWVcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjggJiYgY29udGFpbmVyLmhhc0NsYXNzKCdzdC1tZW51LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl1baHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVmZmVjdCA9IG9wdGlvbnMuZWZmZWN0LFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5ID0gb3B0aW9ucy5vdmVybGF5O1xuXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHNpZGViYXIuaXMoJy5sZWZ0JykgPyAnbCcgOiAncicsXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBzaWRlYmFyLmdldCgwKS5jbGFzc05hbWUubWF0Y2goL3NpZGViYXItc2l6ZS0oXFxTKykvKS5wb3AoKSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbENsYXNzID0gJ3N0LWVmZmVjdC0nICsgZGlyZWN0aW9uICsgc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTGF5b3V0ID0gc2lkZWJhci5kYXRhKCd0b2dnbGVMYXlvdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IGdldExheW91dENsYXNzZXMoc2lkZWJhciwgZGlyZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhcjogc2lkZWJhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLnNob3cnLCBldmVudERhdGEpO1xuXG4gICAgICAgICAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKGh0bWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5zaG93KCkucmVtb3ZlQ2xhc3MoJ3NpZGViYXItY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3RNZW51RWZmZWN0JywgZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3RNZW51VGFyZ2V0JywgdGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxheSkgY29udGFpbmVyLmFkZENsYXNzKCdzdC1wdXNoZXItb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnc3QtbWVudS1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9LCAyNSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUxheW91dCkgJCgnaHRtbCcpLmFkZENsYXNzKGxheW91dENsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzaWRlYmFyLnNob3duJywgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZhciBhID0gYW5pbWF0aW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBidXR0b24uYXR0cignaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIgPSAkKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50QWN0aXZlRWxlbWVudCA9ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpLm5vdCh0aGlzKS5jbG9zZXN0KCdsaScpLmxlbmd0aCA/ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpLm5vdCh0aGlzKS5jbG9zZXN0KCdsaScpIDogJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlRWxlbWVudCA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5sZW5ndGggPyAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykgOiAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVFbGVtZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJ2h0bWwnKS5oYXNDbGFzcygnc2hvdy1zaWRlYmFyJykpIGFjdGl2ZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSAkKCdodG1sJykuYWRkQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFPcHRpb25zID0gZ2V0U2lkZWJhckRhdGFPcHRpb25zKHNpZGViYXIpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25PcHRpb25zID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGEoJ2VmZmVjdCcpKSBidXR0b25PcHRpb25zLmVmZmVjdCA9IGJ1dHRvbi5kYXRhKCdlZmZlY3QnKTtcbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGEoJ292ZXJsYXknKSkgYnV0dG9uT3B0aW9ucy5vdmVybGF5ID0gYnV0dG9uLmRhdGEoJ292ZXJsYXknKTtcblxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBkYXRhT3B0aW9ucywgYnV0dG9uT3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmhhc0NsYXNzKCdzaWRlYmFyLWNsb3NlZCcpICYmIHNpZGViYXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoc2lkZWJhci5hdHRyKCdpZCcpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9wZW4odGFyZ2V0LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAkKCdib2R5Jykub24oZXZlbnR0eXBlLCAnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJywgdG9nZ2xlKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIG51bGwsICdlc2MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmhhc0NsYXNzKCdzdC1tZW51LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2lkZWJhcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBzaWRlYmFyID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgLyogU2lkZWJhciBUb2dnbGUgQmFyICovXG4gICAgICAgICAgICBpZiAoc2lkZWJhci5kYXRhKCd0b2dnbGVCYXInKSkge1xuICAgICAgICAgICAgICAgIHZhciBiYXIgPSAkKCc8YT48L2E+Jyk7XG4gICAgICAgICAgICAgICAgYmFyLmF0dHIoJ2hyZWYnLCAnIycgKyBzaWRlYmFyLmF0dHIoJ2lkJykpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdzaWRlYmFyLW1lbnUnKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NpZGViYXItdG9nZ2xlLWJhcicpO1xuXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hcHBlbmQoYmFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LnNpZGViYXIgPSB7XG5cbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBhbmltYXRpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoYSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbignIycgKyBpZCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0KGlkLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb3B0aW9uczogZ2V0U2lkZWJhckRhdGFPcHRpb25zXG5cbiAgICAgICAgfTtcblxuICAgIH0pKCk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgZGQgPSAkKHRoaXMpO1xuXG4gICAgICAgIGRkLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgZGQuZmluZCgnLnNpZGViYXItbWVudSA+IGxpLmRyb3Bkb3duID4gYScpLm9mZignbW91c2VlbnRlcicpO1xuICAgICAgICBkZC5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdtb3VzZWVudGVyJyk7XG4gICAgICAgIGRkLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIGRkLm9mZignbW91c2VsZWF2ZScpO1xuICAgICAgICBkZC5maW5kKCcuZHJvcGRvd24nKS5vZmYoJ21vdXNlb3ZlcicpO1xuICAgICAgICBkZC5maW5kKCcuZHJvcGRvd24nKS5vZmYoJ21vdXNlb3V0Jyk7XG5cbiAgICAgICAgJCgnYm9keScpLm9mZignbW91c2VvdXQnLCAnI2Ryb3Bkb3duLXRlbXAgLmRyb3Bkb3duJyk7XG5cbiAgICAgICAgZGQuZmluZCgndWwuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ2hpZGRlbi5icy5jb2xsYXBzZScpO1xuXG4gICAgICAgIGRkLmZpbmQoJyNkcm9wZG93bi10ZW1wJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZGQuZmluZCgnLmhhc1N1Ym1lbnUnKS5yZW1vdmVDbGFzcygnZHJvcGRvd24nKVxuICAgICAgICAgICAgLmZpbmQoJz4gdWwnKS5hZGRDbGFzcygnY29sbGFwc2UnKS5yZW1vdmVDbGFzcygnZHJvcGRvd24tbWVudSBzdWJtZW51LWhpZGUgc3VibWVudS1zaG93JylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLmZpbmQoJz4gYScpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ2NvbGxhcHNlJyk7XG5cbiAgICAgICAgZGQuZmluZCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGQuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlXG4gICAgICAgIGRkLmZpbmQoJy5jb2xsYXBzZScpLm9uKCdzaG93LmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQodGhpcykucGFyZW50cygndWw6Zmlyc3QnKS5maW5kKCc+IGxpLm9wZW4gW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhhc1N1Ym1lbnUnKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRkLmZpbmQoJy5jb2xsYXBzZScpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhhc1N1Ym1lbnUnKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRkLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKHsgJ3RvZ2dsZSc6IGZhbHNlIH0pO1xuXG4gICAgfSk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIGRkID0gJCh0aGlzKTtcblxuICAgICAgICBkZC5maW5kKCcuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRkZW4uYnMuY29sbGFwc2UnKTtcblxuICAgICAgICB2YXIgbmljZSA9IGRkLmZpbmQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpWyAwIF07XG5cbiAgICAgICAgbmljZS5zY3JvbGxzdGFydChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISBkZC5pcygnW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykpIHJldHVybjtcbiAgICAgICAgICAgIGRkLmFkZENsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgICAgIGRkLmZpbmQoJyNkcm9wZG93bi10ZW1wID4gdWwgPiBsaScpLmVtcHR5KCk7XG4gICAgICAgICAgICBkZC5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgIGRkLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmljZS5zY3JvbGxlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEgZGQuaXMoJ1tkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpKSByZXR1cm47XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ2xhc3RTY3JvbGxUb3AnLCBuaWNlLmdldFNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgIGRkLnJlbW92ZUNsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGQuZmluZCgnLmhhc1N1Ym1lbnUnKS5hZGRDbGFzcygnZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnb3BlbicpXG4gICAgICAgICAgICAuZmluZCgnPiB1bCcpLmFkZENsYXNzKCdkcm9wZG93bi1tZW51JykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJykucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAuZmluZCgnPiBhJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS10b2dnbGUnKTtcblxuICAgICAgICBkZC5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkuZHJvcGRvd24gPiBhJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBzaWRlYmFyID0gJCh0aGlzKS5wYXJlbnRzKCcuc2lkZWJhcjpmaXJzdCcpLFxuICAgICAgICAgICAgICAgIGMgPSBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJyk7XG5cbiAgICAgICAgICAgIHNpZGViYXIuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgYy5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmICghICQodGhpcykucGFyZW50KCcuZHJvcGRvd24nKS5pcygnLm9wZW4nKSAmJiAhIHNpZGViYXIuaXMoJy5zY3JvbGxpbmcnKSkge1xuICAgICAgICAgICAgICAgIHZhciBwID0gJCh0aGlzKS5wYXJlbnQoJy5kcm9wZG93bicpLFxuICAgICAgICAgICAgICAgICAgICB0ID0gcC5maW5kKCc+IC5kcm9wZG93bi1tZW51JykuY2xvbmUoKS5yZW1vdmVDbGFzcygnc3VibWVudS1oaWRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBjLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gJCgnPGRpdi8+JykuYXR0cignaWQnLCAnZHJvcGRvd24tdGVtcCcpLmFwcGVuZFRvKHNpZGViYXIpO1xuICAgICAgICAgICAgICAgICAgICBjLmh0bWwoJzx1bD48bGk+PC9saT48L3VsPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMuc2hvdygpO1xuICAgICAgICAgICAgICAgIGMuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjID0gYy5maW5kKCc+IHVsID4gbGknKS5jc3Moe292ZXJmbG93OiAndmlzaWJsZSd9KS5hZGRDbGFzcygnZHJvcGRvd24gb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgcC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIHQuYXBwZW5kVG8oYykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBwLm9mZnNldCgpLnRvcCAtIGMub2Zmc2V0KCkudG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMTAwJSdcbiAgICAgICAgICAgICAgICB9KS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2lkZWJhci5pcygnLnJpZ2h0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRkLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCEgJCh0aGlzKS5wYXJlbnQoKS5pcygnLmRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQodGhpcykuY2xvc2VzdCgnLnNpZGViYXInKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRkLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkuaXMoJy5kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRkLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZC5maW5kKCcuZHJvcGRvd24nKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb3BlbicpLmNoaWxkcmVuKCd1bCcpLnJlbW92ZUNsYXNzKCdzdWJtZW51LWhpZGUnKS5hZGRDbGFzcygnc3VibWVudS1zaG93Jyk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJ3VsJykucmVtb3ZlQ2xhc3MoJy5zdWJtZW51LXNob3cnKS5hZGRDbGFzcygnc3VibWVudS1oaWRlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignbW91c2VvdXQnLCAnI2Ryb3Bkb3duLXRlbXAgLmRyb3Bkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLnNpZGViYXItbWVudSAub3BlbicsICQodGhpcykuY2xvc2VzdCgnLnNpZGViYXInKSkucmVtb3ZlQ2xhc3MoJy5vcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn07IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX3NpZGViYXItbWVudScpO1xucmVxdWlyZSgnLi9fY29sbGFwc2libGUnKTtcbnJlcXVpcmUoJy4vX2Ryb3Bkb3duJyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLXRvZ2dsZScpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ29uc2VydmUgYXNwZWN0IHJhdGlvIG9mIHRoZSBvcmlnbmFsIHJlZ2lvbi4gVXNlZnVsIHdoZW4gc2hyaW5raW5nL2VubGFyZ2luZ1xuICAgICAqIGltYWdlcyB0byBmaXQgaW50byBhIGNlcnRhaW4gYXJlYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNXaWR0aCBTb3VyY2UgYXJlYSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNIZWlnaHQgU291cmNlIGFyZWEgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFdpZHRoIEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4SGVpZ2h0IEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7IHdpZHRoLCBoZWlndGggfVxuICAgICAqL1xuICAgIHZhciBhc3BlY3RSYXRpb0ZpdCA9IGZ1bmN0aW9uIChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG5cbiAgICAgICAgdmFyIHdSYXRpbyA9IG1heFdpZHRoIC8gc3JjV2lkdGgsXG4gICAgICAgICAgICBoUmF0aW8gPSBtYXhIZWlnaHQgLyBzcmNIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0O1xuXG4gICAgICAgIGlmIChzcmNXaWR0aCAvIG1heFdpZHRoIDwgc3JjSGVpZ2h0IC8gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB3aWR0aCA9IG1heFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0ICogd1JhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBzcmNXaWR0aCAqIGhSYXRpbztcbiAgICAgICAgICAgIGhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhlaWdodCgpIHtcblxuICAgICAgICAkKCcuY292ZXIub3ZlcmxheScpLmZpbHRlcignOnZpc2libGUnKS5ub3QoJ1tjbGFzcyo9XCJoZWlnaHRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpID0gdC5maW5kKCdpbWc6Zmlyc3QnKTtcblxuICAgICAgICAgICAgdC5oZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheS1mdWxsJywgdCkuaW5uZXJIZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdkb21DaGFuZ2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Zlci5vdmVybGF5JykuZmlsdGVyKCc6dmlzaWJsZScpLmZpbHRlcignW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGkgPSB0LmZpbmQoJ2ltZzpmaXJzdCcpO1xuXG4gICAgICAgICAgICBpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICBpLmNzcyhhc3BlY3RSYXRpb0ZpdChpLndpZHRoKCksIGkuaGVpZ2h0KCksIHQud2lkdGgoKSwgdC5oZWlnaHQoKSkpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGhlaWdodCk7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgaGVpZ2h0KTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbihcImRlYm91bmNlZHJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoaGVpZ2h0LCAyMDApO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNyZXBvcnRyYW5nZScpLmRhdGVyYW5nZXBpY2tlcihcbiAgICAgICAge1xuICAgICAgICAgICAgcmFuZ2VzOiB7XG4gICAgICAgICAgICAgICAgJ1RvZGF5JzogW21vbWVudCgpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1llc3RlcmRheSc6IFttb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpLCBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCA3IERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCA2KSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdMYXN0IDMwIERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnVGhpcyBNb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgTW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuZW5kT2YoJ21vbnRoJyldXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDI5KSxcbiAgICAgICAgICAgIGVuZERhdGU6IG1vbWVudCgpXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgICQoJyNyZXBvcnRyYW5nZSBzcGFuJykuaHRtbChzdGFydC5mb3JtYXQoJ01NTU0gRCwgWVlZWScpICsgJyAtICcgKyBlbmQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgJCgnI3Jlc2VydmF0aW9udGltZScpLmRhdGVyYW5nZXBpY2tlcih7IHRpbWVQaWNrZXI6IHRydWUsIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IDMwLCBmb3JtYXQ6ICdNTS9ERC9ZWVlZIGg6bW0gQScgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQoJy5leHBhbmRhYmxlJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICQodGhpcykuZmluZCgnLmV4cGFuZGFibGUtY29udGVudCcpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImV4cGFuZGFibGUtaW5kaWNhdG9yXCI+PGk+PC9pPjwvZGl2PicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS1pbmRpY2F0b3InLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5leHBhbmRhYmxlJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS10cmlnZ2VyOm5vdCguZXhwYW5kYWJsZS1vcGVuKScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBpZiB3ZSdyZSBpbnNpZGUgYW4gaWZyYW1lLCByZWxvYWQgd2l0aG91dCBpZnJhbWVcbiAgICBpZiAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgIHRvcC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLm1pbmljb2xvcnMgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCcubWluaWNvbG9ycycpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkKHRoaXMpLm1pbmljb2xvcnMoe1xuICAgICAgICAgICAgICAgIGNvbnRyb2w6ICQodGhpcykuYXR0cignZGF0YS1jb250cm9sJykgfHwgJ2h1ZScsXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtZGVmYXVsdFZhbHVlJykgfHwgJycsXG4gICAgICAgICAgICAgICAgaW5saW5lOiAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5saW5lJykgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICBsZXR0ZXJDYXNlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtbGV0dGVyQ2FzZScpIHx8ICdsb3dlcmNhc2UnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICQodGhpcykuYXR0cignZGF0YS1vcGFjaXR5JyksXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICQodGhpcykuYXR0cignZGF0YS1wb3NpdGlvbicpIHx8ICdib3R0b20gbGVmdCcsXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoaGV4LCBvcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIGhleCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BhY2l0eSkgaGV4ICs9ICcsICcgKyBvcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4ubmVzdGFibGUgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAkKCcubmVzdGFibGUnKS5uZXN0YWJsZSh7XG4gICAgICAgICAgICByb290Q2xhc3M6ICduZXN0YWJsZScsXG4gICAgICAgICAgICBsaXN0Tm9kZU5hbWU6ICd1bCcsXG4gICAgICAgICAgICBsaXN0Q2xhc3M6ICduZXN0YWJsZS1saXN0JyxcbiAgICAgICAgICAgIGl0ZW1DbGFzczogJ25lc3RhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgZHJhZ0NsYXNzOiAnbmVzdGFibGUtZHJhZycsXG4gICAgICAgICAgICBoYW5kbGVDbGFzczogJ25lc3RhYmxlLWhhbmRsZScsXG4gICAgICAgICAgICBjb2xsYXBzZWRDbGFzczogJ25lc3RhYmxlLWNvbGxhcHNlZCcsXG4gICAgICAgICAgICBwbGFjZUNsYXNzOiAnbmVzdGFibGUtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgZW1wdHlDbGFzczogJ25lc3RhYmxlLWVtcHR5J1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy8gUHJvZ3Jlc3MgQmFyIEFuaW1hdGlvblxuICAgICQoJy5wcm9ncmVzcy1iYXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS53aWR0aCgkKHRoaXMpLmF0dHIoJ2FyaWEtdmFsdWVub3cnKSArICclJyk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJzZWxlY3QyXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHQuZGF0YSgnYWxsb3dDbGVhcicpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHQuaXMoJ2J1dHRvbicpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0LmlzKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodC5pcygnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi10YWdzXCJdJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRhZ3MgPSB0LmRhdGEoJ3RhZ3MnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0LnNlbGVjdDIob3B0aW9ucyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1lbmFibGVcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNlbGVjdDIoXCJlbmFibGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItZGlzYWJsZVwiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkuc2VsZWN0MihcImRpc2FibGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRlbXBsYXRpbmdcbiAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKCEgc3RhdGUuaWQpIHJldHVybiBzdGF0ZS50ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIFwiPGltZyBjbGFzcz0nZmxhZycgc3JjPSdodHRwOi8vc2VsZWN0Mi5naXRodWIuaW8vc2VsZWN0Mi9pbWFnZXMvZmxhZ3MvXCIgKyBzdGF0ZS5pZC50b0xvd2VyQ2FzZSgpICsgXCIucG5nJy8+XCIgKyBzdGF0ZS50ZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgICQoXCIjc2VsZWN0Ml83XCIpLnNlbGVjdDIoe1xuICAgICAgICAgICAgZm9ybWF0UmVzdWx0OiBmb3JtYXQsXG4gICAgICAgICAgICBmb3JtYXRTZWxlY3Rpb246IGZvcm1hdCxcbiAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3RwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgJCgnLnNlbGVjdHBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICQodGhpcykuZGF0YSgnd2lkdGgnKSB8fCAnMTAwJSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2hvd0hvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1zaG93LWhvdmVyXScpLmhpZGUoKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSAkKHRoaXMpLmRhdGEoJ3Nob3dIb3ZlcicpO1xuXG4gICAgICAgICAgICBzZWxmLmNsb3Nlc3QocGFyZW50KS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaG93SG92ZXIoKTtcblxuICAgIHdpbmRvdy5zaG93SG92ZXIgPSBzaG93SG92ZXI7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtc2xpZGVyPVwiZGVmYXVsdFwiXScpLnNsaWRlcigpO1xuXG4gICAgICAgICQoJ1tkYXRhLXNsaWRlcj1cImZvcm1hdHRlclwiXScpLnNsaWRlcih7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCB2YWx1ZTogJyArIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1vbi1zbGlkZV0nKS5vbihcInNsaWRlXCIsIGZ1bmN0aW9uIChzbGlkZUV2dCkge1xuICAgICAgICAgICAgJCgkKHRoaXMpLmF0dHIoJ2RhdGEtb24tc2xpZGUnKSkudGV4dChzbGlkZUV2dC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zbGlkZXItaGFuZGxlJykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1iYXJzIGZhLXJvdGF0ZS05MFwiPjwvaT4nKTtcblxuICAgIH1cblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5kYXRhVGFibGUgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAvLyBEYXRhdGFibGVzXG4gICAgICAgICQoJyNkYXRhLXRhYmxlJykuZGF0YVRhYmxlKCk7XG5cbiAgICB9XG5cbiAgICAvLyBUYWJsZSBDaGVja2JveCBBbGxcbiAgICAkKCcjY2hlY2tBbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ3RhYmxlJykuZmluZCgndGQgaW5wdXQ6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdGhpcy5jaGVja2VkKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi9fc2tpbicpKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGFicyA9ICQodGhpcykubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIG9uZWF4aXNtb3VzZW1vZGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIF9zdXBlciA9IHRhYnMuZ2V0Q29udGVudFNpemU7XG4gICAgICAgIHRhYnMuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwodGFicyk7XG4gICAgICAgICAgICBwYWdlLmggPSB0YWJzLndpbi5oZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG5cbiAgICAkKCcudGFiYmFibGUgLm5hdi10YWJzIGEnKS5vbignc2hvd24uYnMudGFiJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmNsb3Nlc3QoJy50YWJiYWJsZScpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXG4gICAgICAgICAgICB0YXJnZXRQYW5lID0gdGFyZ2V0LmF0dHIoJ2hyZWYnKSB8fCB0YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCB0YWJzIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxcbiAgICAgICAgdGFiLmZpbmQoJy5uYXYtdGFicycpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICAgICAvLyByZWZyZXNoIFtkYXRhLXNjcm9sbGFibGVdIHdpdGhpbiB0aGUgYWN0aXZhdGVkIHRhYiBwYW5lXG4gICAgICAgICQodGFyZ2V0UGFuZSkuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBUb29sdGlwXG4gICAgJChcImJvZHlcIikudG9vbHRpcCh7c2VsZWN0b3I6ICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJywgY29udGFpbmVyOiBcImJvZHlcIn0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgaWYgKHR5cGVvZiAkLmZuLlRvdWNoU3BpbiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvdWNoLXNwaW5cIl0nKS5Ub3VjaFNwaW4oKTtcblxuICAgIH1cblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIGlmICh0eXBlb2YgJC5mbi5mYW5jeXRyZWUgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgIHZhciB0cmVlX2dseXBoX29wdGlvbnMgPSB7XG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgY2hlY2tib3g6IFwiZmEgZmEtc3F1YXJlLW9cIixcbiAgICAgICAgICAgIGNoZWNrYm94U2VsZWN0ZWQ6IFwiZmEgZmEtY2hlY2stc3F1YXJlXCIsXG4gICAgICAgICAgICBjaGVja2JveFVua25vd246IFwiZmEgZmEtY2hlY2stc3F1YXJlIGZhLW11dGVkXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiLFxuICAgICAgICAgICAgZXhwYW5kZXJDbG9zZWQ6IFwiZmEgZmEtY2FyZXQtcmlnaHRcIixcbiAgICAgICAgICAgIGV4cGFuZGVyTGF6eTogXCJmYSBmYS1hbmdsZS1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJPcGVuOiBcImZhIGZhLWNhcmV0LWRvd25cIixcbiAgICAgICAgICAgIGRvYzogXCJmYSBmYS1maWxlLW9cIixcbiAgICAgICAgICAgIG5vRXhwYW5kZXI6IFwiXCIsXG4gICAgICAgICAgICBkb2NPcGVuOiBcImZhIGZhLWZpbGVcIixcbiAgICAgICAgICAgIGxvYWRpbmc6IFwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXCIsXG4gICAgICAgICAgICBmb2xkZXI6IFwiZmEgZmEtZm9sZGVyXCIsXG4gICAgICAgICAgICBmb2xkZXJPcGVuOiBcImZhIGZhLWZvbGRlci1vcGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJlZV9kbmRfb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b0V4cGFuZE1TOiA0MDAsXG4gICAgICAgICAgICBmb2N1c09uQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICBwcmV2ZW50Vm9pZE1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzICdiZWZvcmUgc2VsZicsIGV0Yy5cbiAgICAgICAgICAgIHByZXZlbnRSZWN1cnNpdmVNb3ZlczogdHJ1ZSwgLy8gUHJldmVudCBkcm9wcGluZyBub2RlcyBvbiBvd24gZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcmFnZ2luZyBmb3IgdGhlIHRyZWUuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIGZhbHNlIHRvIGNhbmNlbCBkcmFnZ2luZyBvZiBub2RlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0VudGVyOiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogZGF0YS5vdGhlck5vZGUgbWF5IGJlIG51bGwgZm9yIG5vbi1mYW5jeXRyZWUgZHJvcHBhYmxlcy5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gZGlzYWxsb3cgZHJvcHBpbmcgb24gbm9kZS4gSW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgKiAgZHJhZ092ZXIgYW5kIGRyYWdMZWF2ZSBhcmUgbm90IGNhbGxlZC5cbiAgICAgICAgICAgICAqICBSZXR1cm4gJ292ZXInLCAnYmVmb3JlLCBvciAnYWZ0ZXInIHRvIGZvcmNlIGEgaGl0TW9kZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gWydiZWZvcmUnLCAnYWZ0ZXInXSB0byByZXN0cmljdCBhdmFpbGFibGUgaGl0TW9kZXMuXG4gICAgICAgICAgICAgKiAgQW55IG90aGVyIHJldHVybiB2YWx1ZSB3aWxsIGNhbGMgdGhlIGhpdE1vZGUgZnJvbSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRyb3BwaW5nIGEgcGFyZW50IGJlbG93IGFub3RoZXIgcGFyZW50IChvbmx5IHNvcnRcbiAgICAgICAgICAgIC8vIG5vZGVzIHVuZGVyIHRoZSBzYW1lIHBhcmVudClcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZihub2RlLnBhcmVudCAhPT0gZGF0YS5vdGhlck5vZGUucGFyZW50KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBkcm9wcGluZyAqb3ZlciogYSBub2RlICh3b3VsZCBjcmVhdGUgYSBjaGlsZClcbiAgICAgICAgICAgIHJldHVybiBbXCJiZWZvcmVcIiwgXCJhZnRlclwiXTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0Ryb3A6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBUaGlzIGZ1bmN0aW9uIE1VU1QgYmUgZGVmaW5lZCB0byBlbmFibGUgZHJvcHBpbmcgb2YgaXRlbXMgb25cbiAgICAgICAgICAgICAqICB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZGF0YS5vdGhlck5vZGUubW92ZVRvKG5vZGUsIGRhdGEuaGl0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdXNpbmcgZGVmYXVsdCBvcHRpb25zXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidHJlZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IFsgXCJnbHlwaFwiIF07XG4gICAgICAgIGlmICh0eXBlb2YgJCh0aGlzKS5hdHRyKCdkYXRhLXRyZWUtZG5kJykgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucHVzaCggXCJkbmRcIiApO1xuICAgICAgICB9XG4gICAgICAgICQodGhpcykuZmFuY3l0cmVlKHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IGV4dGVuc2lvbnMsXG4gICAgICAgICAgICBnbHlwaDogdHJlZV9nbHlwaF9vcHRpb25zLFxuICAgICAgICAgICAgZG5kOiB0cmVlX2RuZF9vcHRpb25zLFxuICAgICAgICAgICAgY2xpY2tGb2xkZXJNb2RlOiAzLFxuICAgICAgICAgICAgY2hlY2tib3g6IHR5cGVvZiAkKHRoaXMpLmF0dHIoJ2RhdGEtdHJlZS1jaGVja2JveCcpICE9PSBcInVuZGVmaW5lZFwiIHx8IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0TW9kZTogdHlwZW9mICQodGhpcykuYXR0cignZGF0YS10cmVlLXNlbGVjdCcpICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLXRyZWUtc2VsZWN0JykpIDogMlxuICAgICAgICB9KTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCJyZXF1aXJlKCcuL190YWJzJyk7XG5yZXF1aXJlKCcuL190cmVlJyk7XG5yZXF1aXJlKCcuL19zaG93LWhvdmVyJyk7XG5yZXF1aXJlKCcuL19kYXRlcmFuZ2VwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2V4cGFuZGFibGUnKTtcbnJlcXVpcmUoJy4vX25lc3RhYmxlJyk7XG5yZXF1aXJlKCcuL19jb3ZlcicpO1xucmVxdWlyZSgnLi9fdG9vbHRpcCcpO1xucmVxdWlyZSgnLi9fdGFibGVzJyk7XG5yZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19pZnJhbWUnKTtcblxuLy8gRm9ybXNcbnJlcXVpcmUoJy4vX3RvdWNoc3BpbicpO1xucmVxdWlyZSgnLi9fc2VsZWN0MicpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL19zZWxlY3RwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vX21pbmljb2xvcnMnKTsiXX0=
