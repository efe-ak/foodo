(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
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
},{"./_async":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/layout/js/_async.js"}]},{},["./app/vendor/layout/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2FzeW5jLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2dyaWRhbGljaW91cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3Njcm9sbGFibGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2luLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMuanMnKTtcbnJlcXVpcmUoJy4vX2dyaWRhbGljaW91cy5qcycpO1xucmVxdWlyZSgnLi9fc2Nyb2xsYWJsZS5qcycpO1xucmVxdWlyZSgnLi9fc2tpbnMnKTtcbnJlcXVpcmUoJy4vX2lzb3RvcGUnKTtcblxuLy8gU2lkZWJhciBQZXJjZW50YWdlIFNpemVzIERlbW9cbnJlcXVpcmUoJy4vX3NpZGViYXItcGMnKTsiLCJmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuICAgIHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cbiAgICAgICAgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgbW9kZXJuID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICAgICAgYWRkID0gbW9kZXJuID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICAgICAgcmVtID0gbW9kZXJuID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICAgICAgcHJlID0gbW9kZXJuID8gJycgOiAnb24nLFxuXG4gICAgICAgIGluaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuICAgICAgICAgICAgKGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpWyByZW0gXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghIGRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsLCA1MCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdCgncG9sbCcpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuICAgIGVsc2Uge1xuICAgICAgICBpZiAoISBtb2Rlcm4gJiYgcm9vdC5kb1Njcm9sbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0b3AgPSAhIHdpbi5mcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9wKSBwb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgd2luWyBhZGQgXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJscywgY2FsbGJhY2spIHtcblxuICAgIHZhciBhc3luY0xvYWRlciA9IGZ1bmN0aW9uICh1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHVybHMuZm9yZWFjaChmdW5jdGlvbiAoaSwgZmlsZSkge1xuICAgICAgICAgICAgbG9hZENzcyhmaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2tpbmcgZm9yIGEgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY29udGVudExvYWRlZCh3aW5kb3csIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZENzcyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbIDAgXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9O1xuXG4gICAgLy8gc2ltcGxlIGZvcmVhY2ggaW1wbGVtZW50YXRpb25cbiAgICBBcnJheS5wcm90b3R5cGUuZm9yZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCB0aGlzWyBpIF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jTG9hZGVyKHVybHMsIGNhbGxiYWNrKTtcblxufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQod2luZG93KS5zZXRCcmVha3BvaW50cyh7XG4gICAgICAgIGRpc3RpbmN0OiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czogWyAzMjAsIDQ4MCwgNzY4LCAxMDI0IF1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCl7XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwiZ3JpZGFsaWNpb3VzXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuZ3JpZGFsaWNpb3VzKHtcbiAgICAgICAgICAgIGd1dHRlcjogJCh0aGlzKS5kYXRhKCdndXR0ZXInKSB8fCAxNSxcbiAgICAgICAgICAgIHdpZHRoOiAkKHRoaXMpLmRhdGEoJ3dpZHRoJykgfHwgMzcwLFxuICAgICAgICAgICAgc2VsZWN0b3I6ICc+IGRpdicsXG4gICAgICAgICAgICBhbmltYXRpb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG5cbiAgICAkKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKHtcbiAgICAgICAgICAgICAgICBsYXlvdXRNb2RlOiAkKHRoaXMpLmRhdGEoJ2xheW91dE1vZGUnKSB8fCBcInBhY2tlcnlcIixcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXRlbSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoJ29uJywgJ2xheW91dENvbXBsZXRlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RvbUNoYW5nZWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4vX3NraW4nKSgpO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZS1oXScpLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgbmljZSA9ICQodGhpcykubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgICAgICBuaWNlLmdldENvbnRlbnRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgICQoJy5zdC1jb250ZW50LWlubmVyJykubmljZVNjcm9sbCh7XG4gICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgdmFyIHQ7XG4gICAgJCh3aW5kb3cpLm9uKCdkZWJvdW5jZWRyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0sIFtkYXRhLXNjcm9sbGFibGUtaF0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgdCwgc3BjX2RlbW8gPSAkKCcjc2lkZWJhci1zaXplLXBjLWRlbW8nKTtcblxuICAgIGlmICghIHNwY19kZW1vLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgJChkb2N1bWVudCkub24oJ3NpZGViYXIuc2hvdycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyNwYy1vcGVuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB9KVxuICAgIC5vbignc2lkZWJhci5oaWRkZW4nLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgc3BjX2RlbW8ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHMgPSAkKCcuc2lkZWJhcicpLCB2ZSA9ICQoJyNwYy12YWx1ZScpLCB2ID0gdmUudmFsKCk7XG4gICAgICAgIHZlLmJsdXIoKTtcbiAgICAgICAgaWYgKCEgdi5sZW5ndGggfHwgdiA8IDI1KSB7XG4gICAgICAgICAgICB2ID0gMjU7XG4gICAgICAgICAgICB2ZS52YWwodik7XG4gICAgICAgIH1cbiAgICAgICAgc1sgMCBdLmNsYXNzTmFtZSA9IHNbIDAgXS5jbGFzc05hbWUucmVwbGFjZSgvc2lkZWJhci1zaXplLShbXFxkXSspcGMvaWcsICdzaWRlYmFyLXNpemUtJyArIHYgKyAncGMnKTtcbiAgICAgICAgc2lkZWJhci5vcGVuKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsInZhciBhc3luY0xvYWRlciA9IHJlcXVpcmUoJy4vX2FzeW5jJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYW5nZVNraW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpLFxuICAgICAgICAgICAgZmlsZSA9ICQuY29va2llKFwic2tpbi1maWxlXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFzeW5jTG9hZGVyKFsgJ2Nzcy8nICsgZmlsZSArICcubWluLmNzcycgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXNraW5dJykucmVtb3ZlUHJvcCgnZGlzYWJsZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luXCIsICQodGhpcykuZGF0YSgnc2tpbicpKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW4tZmlsZVwiLCAkKHRoaXMpLmRhdGEoJ2ZpbGUnKSk7XG5cbiAgICAgICAgY2hhbmdlU2tpbigpO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgc2tpbiA9ICQuY29va2llKFwic2tpblwiKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJyAmJiBza2luICE9ICdkZWZhdWx0Jykge1xuICAgICAgICBjaGFuZ2VTa2luKCk7XG4gICAgfVxuXG59KShqUXVlcnkpOyJdfQ==
