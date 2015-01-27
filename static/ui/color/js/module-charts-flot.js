(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/charts/js/flot/main.js":[function(require,module,exports){
require('./_simple');
require('./_mixed');
require('./_line');
require('./_horizontal');
require('./_line_fill_nopoints');
require('./_line_fill_nopoints_2');
require('./_bars-ordered');
require('./_donut');
require('./_bars-stacked');
require('./_pie');
require('./_bars-horizontal');
require('./_autoupdate');
},{"./_autoupdate":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_autoupdate.js","./_bars-horizontal":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-horizontal.js","./_bars-ordered":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-ordered.js","./_bars-stacked":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-stacked.js","./_donut":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_donut.js","./_horizontal":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_horizontal.js","./_line":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line.js","./_line_fill_nopoints":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints.js","./_line_fill_nopoints_2":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints_2.js","./_mixed":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_mixed.js","./_pie":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_pie.js","./_simple":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_simple.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_autoupdate.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_live';
    if (! $("#" + wrapper).length) return;

    charts.chart_live =
    {
        // chart data
        data: [],
        totalPoints: 300,
        updateInterval: 200,

        // we use an inline data source in the example, usually data would
        // be fetched from a server
        getRandomData: function () {
            if (this.data.length > 0)
                this.data = this.data.slice(1);

            // do a random walk
            while (this.data.length < this.totalPoints) {
                var prev = this.data.length > 0 ? this.data[ this.data.length - 1 ] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                this.data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < this.data.length; ++ i)
                res.push([ i, this.data[ i ] ]);
            return res;
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                grow: {active: false},
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                }
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "Value is : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: '#efefef'
            },
            xaxis: {
                show: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot($(this.placeholder), [ this.getRandomData() ], this.options);
            setTimeout(this.update, charts.chart_live.updateInterval);
        },

        // update
        update: function () {
            charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
            charts.chart_live.plot.draw();

            setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
        }
    };

    charts.chart_live.init();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-horizontal.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_horizontal_bars';
    if (! $("#" + wrapper).length) return;

    charts.chart_horizontal_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: { active: false },
                bars: {
                    show: true,
                    horizontal: true,
                    barWidth: 0.2,
                    fill: 1
                }
            },
            legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
            yaxis: {
                ticks: 3,
                tickColor: 'transparent',
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: { ticks: 4, tickDecimals: 0 },
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#" + wrapper,

        // initialize
        init: function () {
            // apply styling
            // charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 1; i <= 5; i += 1)
                d1.push([ parseInt(Math.random() * 30), i ]);

            this.data = [];
            this.data.push({
                label: "Sales Volume",
                data: d1,
                bars: {
                    horizontal: true,
                    show: true,
                    barWidth: 0.5
                }
            });

            this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };

    charts.chart_horizontal_bars.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-ordered.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_ordered_bars';
    if (! $("#" + wrapper).length) return;

    charts.chart_ordered_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            bars: {
                show: true,
                barWidth: 0.2,
                fill: 1
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false}
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#" + wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            //some data
            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 30) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 30) ]);

            var ds = [];

            ds.push({
                label: "Data One",
                data: d1,
                bars: {order: 1}
            });
            ds.push({
                label: "Data Two",
                data: d2,
                bars: {order: 2}
            });
            ds.push({
                label: "Data Three",
                data: d3,
                bars: {order: 3}
            });
            this.data = ds;

            this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };

    charts.chart_ordered_bars.init();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-stacked.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_stacked_bars';
    if (! $("#" + wrapper).length) return;

    charts.chart_stacked_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false},
                stack: 0,
                lines: {show: false, fill: true, steps: false},
                bars: {show: true, barWidth: 0.5, fill: 1}
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#" + wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 20) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 20) ]);

            this.data = [];

            this.data.push({
                label: "Data One",
                data: d1
            });
            this.data.push({
                label: "Data Two",
                data: d2
            });
            this.data.push({
                label: "Data Tree",
                data: d3
            });

            this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };

    charts.chart_stacked_bars.init();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_donut.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_donut';
    if (! $("#" + wrapper).length) return;

    charts.chart_donut =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.4,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 8
                    },
                    startAngle: 2,
                    combine: {
                        color: '#EEE',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#" + wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };

    charts.chart_donut.init();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js":[function(require,module,exports){
var skin = require('../lib/_skin')();

var charts =
{
    // utility class
    utility: {
        chartColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ], colors[ 'success-color' ], colors[ 'warning-color' ] ],
        chartBackgroundColors: [ "rgba(255,255,255,0)", "rgba(255,255,255,0)" ],

        applyStyle: function (that) {
            that.options.colors = charts.utility.chartColors;
            that.options.grid.backgroundColor = { colors: charts.utility.chartBackgroundColors };
            that.options.grid.borderColor = charts.utility.chartColors[ 0 ];
            that.options.grid.color = charts.utility.chartColors[ 0 ];
        },

        // generate random number for charts
        randNum: function () {
            return (Math.floor(Math.random() * (1 + 40 - 20)) ) + 20;
        }
    }

};

module.exports = charts;
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_horizontal.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_horizontal_bars';
    if (! $("#" + wrapper).length) return;

    charts.chart_horizontal_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                bars: {
                    show: true,
                    horizontal: true,
                    barWidth: 0.2,
                    fill: 1
                }
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickColor: 'transparent',
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0
            },
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // apply styling
            // charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 1; i <= 5; i += 1)
                d1.push([ parseInt(Math.random() * 30), i ]);

            this.data = [];
            this.data.push({
                label: "Sales Volume",
                data: d1,
                bars: {
                    horizontal: true,
                    show: true,
                    barWidth: 0.5
                }
            });

                this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };
    charts.chart_horizontal_bars.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'line-holder';
    if (! $("#" + wrapper).length) return;

    charts.chart_lines_fill_nopoints_2 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [  colors[ 'success-color' ]],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                this.placeholder,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options);
        }
    };

    charts.chart_lines_fill_nopoints_2.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_lines_fill_nopoints';
    if (! $("#" + wrapper).length) return;

    charts.chart_lines_fill_nopoints =
    {
        // chart data
        data: {
            d1: [],
            d2: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {
                    active: false
                },
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                },
                points: {
                    show: false
                }
            },
            legend: {
                position: "nw",
                noColumns: 2
            },
            yaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#" + wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 9 + charts.utility.randNum() ], [ 4, 12 + charts.utility.randNum() ], [ 5, 15 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 21 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 21 + charts.utility.randNum() ], [ 11, 24 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 27 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 45 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 38 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 60 + charts.utility.randNum() ] ];
            this.data.d2 = [ [ 1, charts.utility.randNum() - 5 ], [ 2, charts.utility.randNum() - 4 ], [ 3, charts.utility.randNum() - 4 ], [ 4, charts.utility.randNum() ], [ 5, 4 + charts.utility.randNum() ], [ 6, 4 + charts.utility.randNum() ], [ 7, 5 + charts.utility.randNum() ], [ 8, 5 + charts.utility.randNum() ], [ 9, 6 + charts.utility.randNum() ], [ 10, 6 + charts.utility.randNum() ], [ 11, 6 + charts.utility.randNum() ], [ 12, 2 + charts.utility.randNum() ], [ 13, 3 + charts.utility.randNum() ], [ 14, 4 + charts.utility.randNum() ], [ 15, 4 + charts.utility.randNum() ], [ 16, 4 + charts.utility.randNum() ], [ 17, 5 + charts.utility.randNum() ], [ 18, 5 + charts.utility.randNum() ], [ 19, 2 + charts.utility.randNum() ], [ 20, 2 + charts.utility.randNum() ], [ 21, 3 + charts.utility.randNum() ], [ 22, 3 + charts.utility.randNum() ], [ 23, 3 + charts.utility.randNum() ], [ 24, 2 + charts.utility.randNum() ], [ 25, 4 + charts.utility.randNum() ], [ 26, 4 + charts.utility.randNum() ], [ 27, 5 + charts.utility.randNum() ], [ 28, 2 + charts.utility.randNum() ], [ 29, 2 + charts.utility.randNum() ], [ 30, 3 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                this.placeholder,
                [ {
                    label: "Visits",
                    data: this.data.d1
                },
                {
                    label: "Unique Visits",
                    data: this.data.d2
                } ],
                this.options);
        }
    };

    charts.chart_lines_fill_nopoints.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints_2.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_lines_fill_nopoints_2';
    if (! $("#" + wrapper).length) return;

    charts.chart_lines_fill_nopoints_2 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 5,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                this.placeholder,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options);
        }
    };

    charts.chart_lines_fill_nopoints_2.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_mixed.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_mixed_1';
    if (! $("#" + wrapper).length) return;

    charts.chart_mixed_1 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ "#dedede", config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color:  config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                this.placeholder,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1,
                    bars: {show: true, fill: 1, barWidth: 0.75, align: "center"}
                },
                    {
                        data: this.data.d1,
                        lines: {show: true, fill: false},
                        points: {
                            show: true,
                            radius: 5,
                            symbol: "circle",
                            fill: true,
                            fillColor: config.skins[ skin ][ 'primary-color' ],
                            borderColor: "#fff"
                        }
                    } ],
                this.options);
        }
    };

    charts.chart_mixed_1.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_pie.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_pie';
    if (! $("#" + wrapper).length) return;

    charts.chart_pie =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2,
                    combine: {
                        color: '#353535',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            colors: [],
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot($(this.placeholder), this.data, this.options);
        }
    };

    charts.chart_pie.init();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_simple.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    var wrapper = 'chart_simple';
    if (! $("#" + wrapper).length) return;

    charts.chart_simple =
    {
        // data
        data: {
            sin: [],
            cos: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 4,
                    steps: false
                },
                points: {
                    show: true,
                    radius: 5,
                    symbol: "circle",
                    fill: true,
                    borderColor: "#fff"
                }
            },
            legend: {position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 2},
            shadowSize: 0,
            yaxis: {ticks: 3},
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            tooltip: true, //activate tooltip
            tooltipOpts: {
                content: "%s : %y.3",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        placeholder: "#"+wrapper,

        // initialize
        init: function () {
            if (this.plot === null) {
                for (var i = 0; i < 14; i += 0.5) {
                    this.data.sin.push([ i, Math.sin(i) ]);
                    this.data.cos.push([ i, Math.cos(i) ]);
                }
            }
            this.plot = $.plot(
                this.placeholder,
                [ {
                    label: "Sin",
                    data: this.data.sin,
                    lines: {fillColor: colors[ 'default-color' ]},
                    points: {fillColor: "#fff"}
                },
                    {
                        label: "Cos",
                        data: this.data.cos,
                        lines: {fillColor: "#444"},
                        points: {fillColor: "#fff"}
                    } ], this.options);
        }
    };

    charts.chart_simple.init();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}]},{},["./app/vendor/charts/js/flot/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L21haW4uanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19hdXRvdXBkYXRlLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fYmFycy1ob3Jpem9udGFsLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fYmFycy1vcmRlcmVkLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fYmFycy1zdGFja2VkLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fZG9udXQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19oZWxwZXIuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19ob3Jpem9udGFsLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbGluZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2xpbmVfZmlsbF9ub3BvaW50cy5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2xpbmVfZmlsbF9ub3BvaW50c18yLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbWl4ZWQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19waWUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19zaW1wbGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9saWIvX3NraW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL19zaW1wbGUnKTtcbnJlcXVpcmUoJy4vX21peGVkJyk7XG5yZXF1aXJlKCcuL19saW5lJyk7XG5yZXF1aXJlKCcuL19ob3Jpem9udGFsJyk7XG5yZXF1aXJlKCcuL19saW5lX2ZpbGxfbm9wb2ludHMnKTtcbnJlcXVpcmUoJy4vX2xpbmVfZmlsbF9ub3BvaW50c18yJyk7XG5yZXF1aXJlKCcuL19iYXJzLW9yZGVyZWQnKTtcbnJlcXVpcmUoJy4vX2RvbnV0Jyk7XG5yZXF1aXJlKCcuL19iYXJzLXN0YWNrZWQnKTtcbnJlcXVpcmUoJy4vX3BpZScpO1xucmVxdWlyZSgnLi9fYmFycy1ob3Jpem9udGFsJyk7XG5yZXF1aXJlKCcuL19hdXRvdXBkYXRlJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfbGl2ZSc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpdmUgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgdG90YWxQb2ludHM6IDMwMCxcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWw6IDIwMCxcblxuICAgICAgICAvLyB3ZSB1c2UgYW4gaW5saW5lIGRhdGEgc291cmNlIGluIHRoZSBleGFtcGxlLCB1c3VhbGx5IGRhdGEgd291bGRcbiAgICAgICAgLy8gYmUgZmV0Y2hlZCBmcm9tIGEgc2VydmVyXG4gICAgICAgIGdldFJhbmRvbURhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoMSk7XG5cbiAgICAgICAgICAgIC8vIGRvIGEgcmFuZG9tIHdhbGtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmRhdGEubGVuZ3RoIDwgdGhpcy50b3RhbFBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmRhdGFbIHRoaXMuZGF0YS5sZW5ndGggLSAxIF0gOiA1MDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHByZXYgKyBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICAgICAgICAgICAgICAgIGlmICh5IDwgMClcbiAgICAgICAgICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHkgPiAxMDApXG4gICAgICAgICAgICAgICAgICAgIHkgPSAxMDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHppcCB0aGUgZ2VuZXJhdGVkIHkgdmFsdWVzIHdpdGggdGhlIHggdmFsdWVzXG4gICAgICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7ICsrIGkpXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goWyBpLCB0aGlzLmRhdGFbIGkgXSBdKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFib3ZlRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbGFiZWxNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgYXhpc01hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5Cb3JkZXJNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvSGlnaGxpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb3VzZUFjdGl2ZVJhZGl1czogMjAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogW10sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlZhbHVlIGlzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VmZWZlZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiK3dyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoJCh0aGlzLnBsYWNlaG9sZGVyKSwgWyB0aGlzLmdldFJhbmRvbURhdGEoKSBdLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZSwgY2hhcnRzLmNoYXJ0X2xpdmUudXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHVwZGF0ZVxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYXJ0cy5jaGFydF9saXZlLnBsb3Quc2V0RGF0YShbIGNoYXJ0cy5jaGFydF9saXZlLmdldFJhbmRvbURhdGEoKSBdKTtcbiAgICAgICAgICAgIGNoYXJ0cy5jaGFydF9saXZlLnBsb3QuZHJhdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNoYXJ0cy5jaGFydF9saXZlLnVwZGF0ZSwgY2hhcnRzLmNoYXJ0X2xpdmUudXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9saXZlLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfaG9yaXpvbnRhbF9iYXJzJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfaG9yaXpvbnRhbF9iYXJzID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogbnVsbCxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHsgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgcG9zaXRpb246IFwibndcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBiYWNrZ3JvdW5kT3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHZhbCwgYXhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICsgXCJrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7IHRpY2tzOiA0LCB0aWNrRGVjaW1hbHM6IDAgfSxcbiAgICAgICAgICAgIGNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0gXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIgKyB3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgLy8gY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGQxID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA1OyBpICs9IDEpXG4gICAgICAgICAgICAgICAgZDEucHVzaChbIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCksIGkgXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNhbGVzIFZvbHVtZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQxLFxuICAgICAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDAuNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoJCh0aGlzLnBsYWNlaG9sZGVyKSwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9ob3Jpem9udGFsX2JhcnMuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X29yZGVyZWRfYmFycyc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X29yZGVyZWRfYmFycyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IG51bGwsXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjIsXG4gICAgICAgICAgICAgICAgZmlsbDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFib3ZlRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbGFiZWxNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgYXhpc01hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5Cb3JkZXJNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvSGlnaGxpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb3VzZUFjdGl2ZVJhZGl1czogMjAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIm5lXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIG5vQ29sdW1uczogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VmZWZlZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiA0LFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMCxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIiArIHdyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICAvL3NvbWUgZGF0YVxuICAgICAgICAgICAgdmFyIGQxID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAxMDsgaSArPSAxKVxuICAgICAgICAgICAgICAgIGQxLnB1c2goWyBpLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApIF0pO1xuXG4gICAgICAgICAgICB2YXIgZDIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IDEwOyBqICs9IDEpXG4gICAgICAgICAgICAgICAgZDIucHVzaChbIGosIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkMyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPD0gMTA7IGsgKz0gMSlcbiAgICAgICAgICAgICAgICBkMy5wdXNoKFsgaywgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDMwKSBdKTtcblxuICAgICAgICAgICAgdmFyIGRzID0gW107XG5cbiAgICAgICAgICAgIGRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgT25lXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDEsXG4gICAgICAgICAgICAgICAgYmFyczoge29yZGVyOiAxfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFR3b1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQyLFxuICAgICAgICAgICAgICAgIGJhcnM6IHtvcmRlcjogMn1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0YSBUaHJlZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQzLFxuICAgICAgICAgICAgICAgIGJhcnM6IHtvcmRlcjogM31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZHM7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCgkKHRoaXMucGxhY2Vob2xkZXIpLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X29yZGVyZWRfYmFycy5pbml0KCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfc3RhY2tlZF9iYXJzJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfc3RhY2tlZF9iYXJzID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogbnVsbCxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgYWJvdmVEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBsYWJlbE1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBheGlzTWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIG1pbkJvcmRlck1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGF1dG9IaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgc3RhY2s6IDAsXG4gICAgICAgICAgICAgICAgbGluZXM6IHtzaG93OiBmYWxzZSwgZmlsbDogdHJ1ZSwgc3RlcHM6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7c2hvdzogdHJ1ZSwgYmFyV2lkdGg6IDAuNSwgZmlsbDogMX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZmVmZWYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMTEsXG4gICAgICAgICAgICAgICAgdGlja0RlY2ltYWxzOiAwLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIm5lXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIG5vQ29sdW1uczogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogW10sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAxLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIiArIHdyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgZDEgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDEwOyBpICs9IDEpXG4gICAgICAgICAgICAgICAgZDEucHVzaChbIGksIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkMiA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gMTA7IGogKz0gMSlcbiAgICAgICAgICAgICAgICBkMi5wdXNoKFsgaiwgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIwKSBdKTtcblxuICAgICAgICAgICAgdmFyIGQzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8PSAxMDsgayArPSAxKVxuICAgICAgICAgICAgICAgIGQzLnB1c2goWyBrLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMjApIF0pO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgT25lXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgVHdvXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgVHJlZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KCQodGhpcy5wbGFjZWhvbGRlciksIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfc3RhY2tlZF9iYXJzLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9kb251dCc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2RvbnV0ID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAge2xhYmVsOiBcIlVTQVwiLCBkYXRhOiAzOH0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiQnJhemlsXCIsIGRhdGE6IDIzfSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJJbmRpYVwiLCBkYXRhOiAxNX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiVHVya2V5XCIsIGRhdGE6IDl9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkZyYW5jZVwiLCBkYXRhOiA3fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJDaGluYVwiLCBkYXRhOiA1fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJHZXJtYW55XCIsIGRhdGE6IDN9XG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIHBpZToge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbm5lclJhZGl1czogMC40LFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDEsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0QW5nbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0VFRScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDAuMDVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIChsYWJlbCwgc2VyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwibGFiZWwgbGFiZWwtZGVmYXVsdFwiPicgKyBsYWJlbCArICcmbmJzcDsnICsgTWF0aC5yb3VuZChzZXJpZXMucGVyY2VudCkgKyAnJTwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Nob3c6IGZhbHNlfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjFcIiArIFwiJVwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiICsgd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCgkKHRoaXMucGxhY2Vob2xkZXIpLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X2RvbnV0LmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG5cbnZhciBjaGFydHMgPVxue1xuICAgIC8vIHV0aWxpdHkgY2xhc3NcbiAgICB1dGlsaXR5OiB7XG4gICAgICAgIGNoYXJ0Q29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdLCBjb2xvcnNbICdzdWNjZXNzLWNvbG9yJyBdLCBjb2xvcnNbICd3YXJuaW5nLWNvbG9yJyBdIF0sXG4gICAgICAgIGNoYXJ0QmFja2dyb3VuZENvbG9yczogWyBcInJnYmEoMjU1LDI1NSwyNTUsMClcIiwgXCJyZ2JhKDI1NSwyNTUsMjU1LDApXCIgXSxcblxuICAgICAgICBhcHBseVN0eWxlOiBmdW5jdGlvbiAodGhhdCkge1xuICAgICAgICAgICAgdGhhdC5vcHRpb25zLmNvbG9ycyA9IGNoYXJ0cy51dGlsaXR5LmNoYXJ0Q29sb3JzO1xuICAgICAgICAgICAgdGhhdC5vcHRpb25zLmdyaWQuYmFja2dyb3VuZENvbG9yID0geyBjb2xvcnM6IGNoYXJ0cy51dGlsaXR5LmNoYXJ0QmFja2dyb3VuZENvbG9ycyB9O1xuICAgICAgICAgICAgdGhhdC5vcHRpb25zLmdyaWQuYm9yZGVyQ29sb3IgPSBjaGFydHMudXRpbGl0eS5jaGFydENvbG9yc1sgMCBdO1xuICAgICAgICAgICAgdGhhdC5vcHRpb25zLmdyaWQuY29sb3IgPSBjaGFydHMudXRpbGl0eS5jaGFydENvbG9yc1sgMCBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGdlbmVyYXRlIHJhbmRvbSBudW1iZXIgZm9yIGNoYXJ0c1xuICAgICAgICByYW5kTnVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgNDAgLSAyMCkpICkgKyAyMDtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFydHM7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X2hvcml6b250YWxfYmFycyc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2hvcml6b250YWxfYmFycyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IG51bGwsXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZGVkZWRlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJud1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiA0LFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0gXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIrd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIC8vIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBkMSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNTsgaSArPSAxKVxuICAgICAgICAgICAgICAgIGQxLnB1c2goWyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApLCBpIF0pO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBWb2x1bWVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkMSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCgkKHRoaXMucGxhY2Vob2xkZXIpLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNoYXJ0cy5jaGFydF9ob3Jpem9udGFsX2JhcnMuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdsaW5lLWhvbGRlcic7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpbmVzX2ZpbGxfbm9wb2ludHNfMiA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGQxOiBbXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcnM6IFsgIGNvbG9yc1sgJ3N1Y2Nlc3MtY29sb3InIF1dLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICAgICAgICBzdGVwczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge3Nob3c6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcIm53XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrU2l6ZTogNDAsXG4gICAgICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHZhbCwgYXhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICsgXCJrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7dGlja3M6IDQsIHRpY2tEZWNpbWFsczogMCwgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiK3dyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSBzb21lIGRhdGFcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMSA9IFsgWyAxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMiwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNCwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDUwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCA2MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCAxMTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNSwgMjQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNiwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOSwgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMiwgNzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMywgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNiwgNDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNywgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOCwgNTEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOSwgNTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzMCwgMTAwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcblxuICAgICAgICAgICAgLy8gbWFrZSBjaGFydFxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5ldCBSZXZlbnVlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMVxuICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9saW5lc19maWxsX25vcG9pbnRzJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50cyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGQxOiBbXSxcbiAgICAgICAgICAgIGQyOiBbXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhYm92ZURhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGxhYmVsTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGF4aXNNYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgbWluQm9yZGVyTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwibndcIixcbiAgICAgICAgICAgICAgICBub0NvbHVtbnM6IDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiA0LFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMCxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICcjZWZlZmVmJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDExLFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMCxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIgKyB3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc29tZSBkYXRhXG4gICAgICAgICAgICB0aGlzLmRhdGEuZDEgPSBbIFsgMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzLCA5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNCwgMTIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA1LCAxNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDYsIDE4ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNywgMjEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA4LCAxNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDksIDE4ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTAsIDIxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTEsIDI0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTQsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTUsIDI0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTYsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTcsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTgsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTksIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjAsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjEsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjIsIDQ1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjMsIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjQsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjUsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjYsIDQ1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjcsIDM4ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjgsIDUxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjksIDU1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMzAsIDYwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMiA9IFsgWyAxLCBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgLSA1IF0sIFsgMiwgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIC0gNCBdLCBbIDMsIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSAtIDQgXSwgWyA0LCBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA1LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA4LCA1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCA2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTEsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEzLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTQsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNSwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE2LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTcsIDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOCwgNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE5LCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjAsIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIyLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjMsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNCwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI1LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjYsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNywgNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI4LCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjksIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzMCwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG5cbiAgICAgICAgICAgIC8vIG1ha2UgY2hhcnRcbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdChcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIFsge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWaXNpdHNcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmQxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlVuaXF1ZSBWaXNpdHNcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmQyXG4gICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpbmVzX2ZpbGxfbm9wb2ludHMuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9saW5lc19maWxsX25vcG9pbnRzXzInO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiA1LFxuICAgICAgICAgICAgICAgICAgICBzdGVwczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge3Nob3c6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcIm53XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrU2l6ZTogNDAsXG4gICAgICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHZhbCwgYXhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICsgXCJrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDQsXG4gICAgICAgICAgICAgICAgdGlja0RlY2ltYWxzOiAwLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiK3dyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSBzb21lIGRhdGFcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMSA9IFsgWyAxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMiwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNCwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDUwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCA2MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCAxMTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNSwgMjQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNiwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOSwgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMiwgNzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMywgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNiwgNDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNywgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOCwgNTEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOSwgNTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzMCwgMTAwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcblxuICAgICAgICAgICAgLy8gbWFrZSBjaGFydFxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5ldCBSZXZlbnVlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMVxuICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9taXhlZF8xJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfbWl4ZWRfMSA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGQxOiBbXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcnM6IFsgXCIjZGVkZWRlXCIsIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNkZWRlZGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9pbnRzOiB7c2hvdzogZmFsc2V9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7cG9zaXRpb246IFwibndcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBiYWNrZ3JvdW5kT3BhY2l0eTogMH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tTaXplOiA0MCxcbiAgICAgICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsLCBheGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgKyBcImtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHt0aWNrczogNCwgdGlja0RlY2ltYWxzOiAwLCB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCd9LFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIrd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHNvbWUgZGF0YVxuICAgICAgICAgICAgdGhpcy5kYXRhLmQxID0gWyBbIDEsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyLCA2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA0LCAxMTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA1LCA4MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDYsIDE4ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNywgNTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA4LCAxNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDksIDE4ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTAsIDYwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTEsIDExMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEyLCAyNyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG5cbiAgICAgICAgICAgIC8vIG1ha2UgY2hhcnRcbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdChcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIFsge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXQgUmV2ZW51ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDEsXG4gICAgICAgICAgICAgICAgICAgIGJhcnM6IHtzaG93OiB0cnVlLCBmaWxsOiAxLCBiYXJXaWR0aDogMC43NSwgYWxpZ246IFwiY2VudGVyXCJ9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmQxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXM6IHtzaG93OiB0cnVlLCBmaWxsOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCIjZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X21peGVkXzEuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X3BpZSc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X3BpZSA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtsYWJlbDogXCJVU0FcIiwgZGF0YTogMzh9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkJyYXppbFwiLCBkYXRhOiAyM30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiSW5kaWFcIiwgZGF0YTogMTV9LFxuICAgICAgICAgICAge2xhYmVsOiBcIlR1cmtleVwiLCBkYXRhOiA5fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJGcmFuY2VcIiwgZGF0YTogN30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiQ2hpbmFcIiwgZGF0YTogNX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiR2VybWFueVwiLCBkYXRhOiAzfVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBwaWU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGFydEFuZ2xlOiAyLFxuICAgICAgICAgICAgICAgICAgICBjb21iaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMzNTM1MzUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiAwLjA1XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAobGFiZWwsIHNlcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIj4nICsgbGFiZWwgKyAnJm5ic3A7JyArIE1hdGgucm91bmQoc2VyaWVzLnBlcmNlbnQpICsgJyU8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgbGVnZW5kOiB7c2hvdzogZmFsc2V9LFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4xXCIgKyBcIiVcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIit3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KCQodGhpcy5wbGFjZWhvbGRlciksIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfcGllLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfc2ltcGxlJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfc2ltcGxlID1cbiAgICB7XG4gICAgICAgIC8vIGRhdGFcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2luOiBbXSxcbiAgICAgICAgICAgIGNvczogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICBzdGVwczogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDUsXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogXCJjaXJjbGVcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwiI2ZmZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcInNlXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDAsIG5vQ29sdW1uczogMn0sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgeWF4aXM6IHt0aWNrczogM30sXG4gICAgICAgICAgICB4YXhpczoge3RpY2tzOiA0LCB0aWNrRGVjaW1hbHM6IDAsIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J30sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLCAvL2FjdGl2YXRlIHRvb2x0aXBcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjNcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIit3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTQ7IGkgKz0gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zaW4ucHVzaChbIGksIE1hdGguc2luKGkpIF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuY29zLnB1c2goWyBpLCBNYXRoLmNvcyhpKSBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBbIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2luXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5zaW4sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7ZmlsbENvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdfSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7ZmlsbENvbG9yOiBcIiNmZmZcIn1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5jb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lczoge2ZpbGxDb2xvcjogXCIjNDQ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7ZmlsbENvbG9yOiBcIiNmZmZcIn1cbiAgICAgICAgICAgICAgICAgICAgfSBdLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9zaW1wbGUuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2tpbiA9ICQuY29va2llKCdza2luJyk7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2tpbiA9ICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIHNraW47XG59KTsiXX0=
