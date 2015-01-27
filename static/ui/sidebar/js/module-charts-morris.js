(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');

},{"./_area":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_area.js","./_bar":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_bar.js","./_donut":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_donut.js","./_line":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_line.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_area.js":[function(require,module,exports){
var area = require('./lib/_area');

(function ($) {
    $(function () {
        area();
        $('[data-skin]').on('click', area);
    });
})(jQuery);
},{"./lib/_area":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_area.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_bar.js":[function(require,module,exports){
var bar = require('./lib/_bar');

(function ($) {
    $(function () {
        bar();
        $('[data-skin]').on('click', bar);
    });
})(jQuery);
},{"./lib/_bar":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_bar.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_donut.js":[function(require,module,exports){
var donut = require('./lib/_donut');

(function ($) {
    $(function () {
        donut();
        $('[data-skin]').on('click', donut);
    });
})(jQuery);
},{"./lib/_donut":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_donut.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_line.js":[function(require,module,exports){
var line = require('./lib/_line');

(function ($) {
    $(function () {
        line();
        $('[data-skin]').on('click', line);
    });
})(jQuery);
},{"./lib/_line":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_line.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_area.js":[function(require,module,exports){
module.exports = function () {

    var skin = require('../../lib/_skin')();
    var wrapper = 'area-chart';

    if (! $("#" + wrapper).length) return;

    $("#" + wrapper).empty();

    new Morris.Area({
        lineColors: [config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ]],
        pointFillColors: config.skins[ skin ][ 'primary-color' ],
        fillOpacity: '0.3',
        element: wrapper,
        data: [
            {y: '1.1.', a: 30, b: 90},
            {y: '2.1.', a: 35, b: 65},
            {y: '3.1.', a: 50, b: 40},
            {y: '4.1.', a: 75, b: 65},
            {y: '5.1.', a: 50, b: 40},
            {y: '6.1.', a: 75, b: 65},
            {y: '7.1.', a: 60, b: 90}
        ],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Series A'],
        gridTextColor: colors[ 'default-color' ],
        gridTextWeight: 'bold',
        resize: true
    });
};
},{"../../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_bar.js":[function(require,module,exports){
module.exports = function () {

    var skin = require('../../lib/_skin')();
    var wrapper = 'bar-chart';

    if (! $("#" + wrapper).length) return;

    $("#" + wrapper).empty();

    new Morris.Bar({
        barColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ] ],
        element: wrapper,
        data: [
            {y: '2006', a: 100, b: 90, c: 40},
            {y: '2007', a: 75, b: 65, c: 100},
            {y: '2008', a: 50, b: 40, c: 30},
            {y: '2009', a: 75, b: 65, c: 85},
            {y: '2010', a: 50, b: 40, c: 45},
            {y: '2011', a: 75, b: 65, c: 90},
            {y: '2012', a: 100, b: 90, c: 80}
        ],
        gridTextColor: colors[ 'default-color' ],
        gridTextWeight: 'bold',
        resize: true,
        xkey: 'y',
        ykeys: [ 'a', 'b', 'c' ],
        labels: [ 'Series A', 'Series B', 'Series C' ]
    });
};
},{"../../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_donut.js":[function(require,module,exports){
module.exports = function () {

    var skin = require('../../lib/_skin')();
    var wrapper = 'donut-chart';

    if (! $("#" + wrapper).length) return;

    $("#" + wrapper).empty();

    new Morris.Donut({
        element: wrapper,
        colors: [ colors[ 'danger-color' ], config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
        data: [
            {label: "Download Sales", value: 12},
            {label: "In-Store Sales", value: 30},
            {label: "Mail-Order Sales", value: 20}
        ]
    });
};

},{"../../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/lib/_line.js":[function(require,module,exports){
module.exports = function () {

    var skin = require('../../lib/_skin')();
    var wrapper = 'line-chart';

    if (! $("#" + wrapper).length) return;

    $("#" + wrapper).empty();

    new Morris.Line({
        lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
        pointFillColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
        pointStrokeColors: [ '#ffffff', '#ffffff' ],
        gridTextColor: colors[ 'default-color' ],
        gridTextWeight: 'bold',

        // ID of the element in which to draw the chart.
        element: wrapper,
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [
            {date: '2014-02', a: 2000, b: 2400},
            {date: '2014-03', a: 1200, b: 2500},
            {date: '2014-04', a: 3200, b: 2000},
            {date: '2014-05', a: 1600, b: 1440},
            {date: '2014-06', a: 1290, b: 2830},
            {date: '2014-07', a: 1930, b: 1200},
            {date: '2014-08', a: 2120, b: 3000}
        ],
        // The name of the data record attribute that contains x-values.
        xkey: 'date',
        // A list of names of data record attributes that contain y-values.
        ykeys: [ 'a', 'b' ],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: [ 'Series A', 'Series B' ],
        resize: true
    });
};
},{"../../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}]},{},["./app/vendor/charts/js/morris/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2xpYi9fc2tpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYXJlYS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYmFyLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvbW9ycmlzL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fbGluZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9saWIvX2FyZWEuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbGliL19iYXIuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbGliL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9saWIvX2xpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vX2FyZWEnKTtcbnJlcXVpcmUoJy4vX2JhcicpO1xucmVxdWlyZSgnLi9fZG9udXQnKTtcbnJlcXVpcmUoJy4vX2xpbmUnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2tpbiA9ICQuY29va2llKCdza2luJyk7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2tpbiA9ICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIHNraW47XG59KTsiLCJ2YXIgYXJlYSA9IHJlcXVpcmUoJy4vbGliL19hcmVhJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBhcmVhKCk7XG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgYXJlYSk7XG4gICAgfSk7XG59KShqUXVlcnkpOyIsInZhciBiYXIgPSByZXF1aXJlKCcuL2xpYi9fYmFyJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBiYXIoKTtcbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBiYXIpO1xuICAgIH0pO1xufSkoalF1ZXJ5KTsiLCJ2YXIgZG9udXQgPSByZXF1aXJlKCcuL2xpYi9fZG9udXQnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvbnV0KCk7XG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgZG9udXQpO1xuICAgIH0pO1xufSkoalF1ZXJ5KTsiLCJ2YXIgbGluZSA9IHJlcXVpcmUoJy4vbGliL19saW5lJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBsaW5lKCk7XG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgbGluZSk7XG4gICAgfSk7XG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi8uLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciB3cmFwcGVyID0gJ2FyZWEtY2hhcnQnO1xuXG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgJChcIiNcIiArIHdyYXBwZXIpLmVtcHR5KCk7XG5cbiAgICBuZXcgTW9ycmlzLkFyZWEoe1xuICAgICAgICBsaW5lQ29sb3JzOiBbY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF1dLFxuICAgICAgICBwb2ludEZpbGxDb2xvcnM6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgZmlsbE9wYWNpdHk6ICcwLjMnLFxuICAgICAgICBlbGVtZW50OiB3cmFwcGVyLFxuICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICB7eTogJzEuMS4nLCBhOiAzMCwgYjogOTB9LFxuICAgICAgICAgICAge3k6ICcyLjEuJywgYTogMzUsIGI6IDY1fSxcbiAgICAgICAgICAgIHt5OiAnMy4xLicsIGE6IDUwLCBiOiA0MH0sXG4gICAgICAgICAgICB7eTogJzQuMS4nLCBhOiA3NSwgYjogNjV9LFxuICAgICAgICAgICAge3k6ICc1LjEuJywgYTogNTAsIGI6IDQwfSxcbiAgICAgICAgICAgIHt5OiAnNi4xLicsIGE6IDc1LCBiOiA2NX0sXG4gICAgICAgICAgICB7eTogJzcuMS4nLCBhOiA2MCwgYjogOTB9XG4gICAgICAgIF0sXG4gICAgICAgIHhrZXk6ICd5JyxcbiAgICAgICAgeWtleXM6IFsnYSddLFxuICAgICAgICBsYWJlbHM6IFsnU2VyaWVzIEEnXSxcbiAgICAgICAgZ3JpZFRleHRDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgZ3JpZFRleHRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgcmVzaXplOiB0cnVlXG4gICAgfSk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi8uLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciB3cmFwcGVyID0gJ2Jhci1jaGFydCc7XG5cbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICAkKFwiI1wiICsgd3JhcHBlcikuZW1wdHkoKTtcblxuICAgIG5ldyBNb3JyaXMuQmFyKHtcbiAgICAgICAgYmFyQ29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdIF0sXG4gICAgICAgIGVsZW1lbnQ6IHdyYXBwZXIsXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHt5OiAnMjAwNicsIGE6IDEwMCwgYjogOTAsIGM6IDQwfSxcbiAgICAgICAgICAgIHt5OiAnMjAwNycsIGE6IDc1LCBiOiA2NSwgYzogMTAwfSxcbiAgICAgICAgICAgIHt5OiAnMjAwOCcsIGE6IDUwLCBiOiA0MCwgYzogMzB9LFxuICAgICAgICAgICAge3k6ICcyMDA5JywgYTogNzUsIGI6IDY1LCBjOiA4NX0sXG4gICAgICAgICAgICB7eTogJzIwMTAnLCBhOiA1MCwgYjogNDAsIGM6IDQ1fSxcbiAgICAgICAgICAgIHt5OiAnMjAxMScsIGE6IDc1LCBiOiA2NSwgYzogOTB9LFxuICAgICAgICAgICAge3k6ICcyMDEyJywgYTogMTAwLCBiOiA5MCwgYzogODB9XG4gICAgICAgIF0sXG4gICAgICAgIGdyaWRUZXh0Q29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0sXG4gICAgICAgIGdyaWRUZXh0V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIHJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgeGtleTogJ3knLFxuICAgICAgICB5a2V5czogWyAnYScsICdiJywgJ2MnIF0sXG4gICAgICAgIGxhYmVsczogWyAnU2VyaWVzIEEnLCAnU2VyaWVzIEInLCAnU2VyaWVzIEMnIF1cbiAgICB9KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIHdyYXBwZXIgPSAnZG9udXQtY2hhcnQnO1xuXG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgJChcIiNcIiArIHdyYXBwZXIpLmVtcHR5KCk7XG5cbiAgICBuZXcgTW9ycmlzLkRvbnV0KHtcbiAgICAgICAgZWxlbWVudDogd3JhcHBlcixcbiAgICAgICAgY29sb3JzOiBbIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSwgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdIF0sXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtsYWJlbDogXCJEb3dubG9hZCBTYWxlc1wiLCB2YWx1ZTogMTJ9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkluLVN0b3JlIFNhbGVzXCIsIHZhbHVlOiAzMH0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiTWFpbC1PcmRlciBTYWxlc1wiLCB2YWx1ZTogMjB9XG4gICAgICAgIF1cbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgd3JhcHBlciA9ICdsaW5lLWNoYXJ0JztcblxuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgICQoXCIjXCIgKyB3cmFwcGVyKS5lbXB0eSgpO1xuXG4gICAgbmV3IE1vcnJpcy5MaW5lKHtcbiAgICAgICAgbGluZUNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSBdLFxuICAgICAgICBwb2ludEZpbGxDb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0gXSxcbiAgICAgICAgcG9pbnRTdHJva2VDb2xvcnM6IFsgJyNmZmZmZmYnLCAnI2ZmZmZmZicgXSxcbiAgICAgICAgZ3JpZFRleHRDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgZ3JpZFRleHRXZWlnaHQ6ICdib2xkJyxcblxuICAgICAgICAvLyBJRCBvZiB0aGUgZWxlbWVudCBpbiB3aGljaCB0byBkcmF3IHRoZSBjaGFydC5cbiAgICAgICAgZWxlbWVudDogd3JhcHBlcixcbiAgICAgICAgLy8gQ2hhcnQgZGF0YSByZWNvcmRzIC0tIGVhY2ggZW50cnkgaW4gdGhpcyBhcnJheSBjb3JyZXNwb25kcyB0byBhIHBvaW50IG9uXG4gICAgICAgIC8vIHRoZSBjaGFydC5cbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAge2RhdGU6ICcyMDE0LTAyJywgYTogMjAwMCwgYjogMjQwMH0sXG4gICAgICAgICAgICB7ZGF0ZTogJzIwMTQtMDMnLCBhOiAxMjAwLCBiOiAyNTAwfSxcbiAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNCcsIGE6IDMyMDAsIGI6IDIwMDB9LFxuICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA1JywgYTogMTYwMCwgYjogMTQ0MH0sXG4gICAgICAgICAgICB7ZGF0ZTogJzIwMTQtMDYnLCBhOiAxMjkwLCBiOiAyODMwfSxcbiAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNycsIGE6IDE5MzAsIGI6IDEyMDB9LFxuICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA4JywgYTogMjEyMCwgYjogMzAwMH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gVGhlIG5hbWUgb2YgdGhlIGRhdGEgcmVjb3JkIGF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIHgtdmFsdWVzLlxuICAgICAgICB4a2V5OiAnZGF0ZScsXG4gICAgICAgIC8vIEEgbGlzdCBvZiBuYW1lcyBvZiBkYXRhIHJlY29yZCBhdHRyaWJ1dGVzIHRoYXQgY29udGFpbiB5LXZhbHVlcy5cbiAgICAgICAgeWtleXM6IFsgJ2EnLCAnYicgXSxcbiAgICAgICAgLy8gTGFiZWxzIGZvciB0aGUgeWtleXMgLS0gd2lsbCBiZSBkaXNwbGF5ZWQgd2hlbiB5b3UgaG92ZXIgb3ZlciB0aGVcbiAgICAgICAgLy8gY2hhcnQuXG4gICAgICAgIGxhYmVsczogWyAnU2VyaWVzIEEnLCAnU2VyaWVzIEInIF0sXG4gICAgICAgIHJlc2l6ZTogdHJ1ZVxuICAgIH0pO1xufTsiXX0=
