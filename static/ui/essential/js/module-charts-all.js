(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/charts/js/main.js":[function(require,module,exports){
require('./morris/main');
require('./sparkline/main');
require('./flot/main');
require('./easy-pie/main');

},{"./easy-pie/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/easy-pie/main.js","./flot/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/main.js","./morris/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/main.js","./sparkline/main":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/sparkline/main.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/easy-pie/_easy-pie.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();

    if ($('.easy-pie').length && $.fn.easyPieChart) {
        $.each($('.easy-pie'), function (k, v) {
            var color = config.skins[ skin ][ 'primary-color' ];
            if ($(this).is('.info')) color = colors[ 'info-color' ];
            if ($(this).is('.danger')) color = colors[ 'danger-color' ];
            if ($(this).is('.success')) color = colors[ 'success-color' ];
            if ($(this).is('.warning')) color = colors[ 'warning-color' ];
            if ($(this).is('.inverse')) color = colors[ 'inverse-color' ];

            $(v).easyPieChart({
                barColor: color,
                animate: ($('html').is('.ie') ? false : 3000),
                lineWidth: 4,
                size: 50
            });
        });
    }

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/easy-pie/main.js":[function(require,module,exports){
require('./_easy-pie');
},{"./_easy-pie":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/easy-pie/_easy-pie.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_autoupdate.js":[function(require,module,exports){
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
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/main.js":[function(require,module,exports){
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
},{"./_autoupdate":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_autoupdate.js","./_bars-horizontal":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-horizontal.js","./_bars-ordered":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-ordered.js","./_bars-stacked":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_bars-stacked.js","./_donut":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_donut.js","./_horizontal":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_horizontal.js","./_line":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line.js","./_line_fill_nopoints":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints.js","./_line_fill_nopoints_2":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_line_fill_nopoints_2.js","./_mixed":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_mixed.js","./_pie":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_pie.js","./_simple":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/flot/_simple.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js":[function(require,module,exports){
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
},{"../../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');

},{"./_area":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_area.js","./_bar":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_bar.js","./_donut":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_donut.js","./_line":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/morris/_line.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/sparkline/_sparkline.js":[function(require,module,exports){
(function ($) {
    var skin = require('../lib/_skin')();

    $(".sparkline-bar").each(function () {
        $(this).text($(this).find('span').text());

        var d = $(this).data('data') || "html";

        $(this).sparkline(
            d, {
                type: 'bar',
                height: '70',
                barWidth: 10,
                barSpacing: 8,
                zeroAxis: false,
                stackedBarColor: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-light-color' ] ],
                colorMap: $(this).data('colors') ? [ config.skins[ skin ][ 'primary-color' ], colors[ 'success-color' ], colors[ 'danger-color' ], colors[ 'default-light-color' ] ] : [],
                enableTagOptions: true
            }
        );
    });

    $(".sparkline-line").each(function () {

        var d = $(this).data('data') || "html";

        $(this).sparkline(
            d, {
                type: 'line',
                height: '24',
                width: '100%',
                spotRadius: '3.2',
                spotColor: config.skins[ skin ][ 'primary-color' ],
                minSpotColor: config.skins[ skin ][ 'primary-color' ],
                maxSpotColor: config.skins[ skin ][ 'primary-color' ],
                highlightSpotColor: colors[ 'danger-color' ],
                lineWidth: '2',
                lineColor: config.skins[ skin ][ 'primary-color' ],
                fillColor: colors[ 'body-bg' ]
            }
        );
    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/sparkline/main.js":[function(require,module,exports){
require('./_sparkline');

},{"./_sparkline":"/persistent/var/www/html/themekit-3.6.1/dev/app/vendor/charts/js/sparkline/_sparkline.js"}]},{},["./app/vendor/charts/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZWFzeS1waWUvX2Vhc3ktcGllLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZWFzeS1waWUvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2F1dG91cGRhdGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19iYXJzLWhvcml6b250YWwuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19iYXJzLW9yZGVyZWQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19iYXJzLXN0YWNrZWQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2hlbHBlci5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2hvcml6b250YWwuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19saW5lLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbGluZV9maWxsX25vcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbGluZV9maWxsX25vcG9pbnRzXzIuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19taXhlZC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX3BpZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX3NpbXBsZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2xpYi9fc2tpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYXJlYS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYmFyLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvbW9ycmlzL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fbGluZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9saWIvX2FyZWEuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbGliL19iYXIuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbGliL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9saWIvX2xpbmUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL3NwYXJrbGluZS9fc3BhcmtsaW5lLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvc3BhcmtsaW5lL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vbW9ycmlzL21haW4nKTtcbnJlcXVpcmUoJy4vc3BhcmtsaW5lL21haW4nKTtcbnJlcXVpcmUoJy4vZmxvdC9tYWluJyk7XG5yZXF1aXJlKCcuL2Vhc3ktcGllL21haW4nKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG4gICAgaWYgKCQoJy5lYXN5LXBpZScpLmxlbmd0aCAmJiAkLmZuLmVhc3lQaWVDaGFydCkge1xuICAgICAgICAkLmVhY2goJCgnLmVhc3ktcGllJyksIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF07XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnLmluZm8nKSkgY29sb3IgPSBjb2xvcnNbICdpbmZvLWNvbG9yJyBdO1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJy5kYW5nZXInKSkgY29sb3IgPSBjb2xvcnNbICdkYW5nZXItY29sb3InIF07XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnLnN1Y2Nlc3MnKSkgY29sb3IgPSBjb2xvcnNbICdzdWNjZXNzLWNvbG9yJyBdO1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJy53YXJuaW5nJykpIGNvbG9yID0gY29sb3JzWyAnd2FybmluZy1jb2xvcicgXTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCcuaW52ZXJzZScpKSBjb2xvciA9IGNvbG9yc1sgJ2ludmVyc2UtY29sb3InIF07XG5cbiAgICAgICAgICAgICQodikuZWFzeVBpZUNoYXJ0KHtcbiAgICAgICAgICAgICAgICBiYXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZTogKCQoJ2h0bWwnKS5pcygnLmllJykgPyBmYWxzZSA6IDMwMDApLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogNCxcbiAgICAgICAgICAgICAgICBzaXplOiA1MFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19lYXN5LXBpZScpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X2xpdmUnO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9saXZlID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHRvdGFsUG9pbnRzOiAzMDAsXG4gICAgICAgIHVwZGF0ZUludGVydmFsOiAyMDAsXG5cbiAgICAgICAgLy8gd2UgdXNlIGFuIGlubGluZSBkYXRhIHNvdXJjZSBpbiB0aGUgZXhhbXBsZSwgdXN1YWxseSBkYXRhIHdvdWxkXG4gICAgICAgIC8vIGJlIGZldGNoZWQgZnJvbSBhIHNlcnZlclxuICAgICAgICBnZXRSYW5kb21EYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAvLyBkbyBhIHJhbmRvbSB3YWxrXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5kYXRhLmxlbmd0aCA8IHRoaXMudG90YWxQb2ludHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5kYXRhWyB0aGlzLmRhdGEubGVuZ3RoIC0gMSBdIDogNTA7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwcmV2ICsgTWF0aC5yYW5kb20oKSAqIDEwIC0gNTtcbiAgICAgICAgICAgICAgICBpZiAoeSA8IDApXG4gICAgICAgICAgICAgICAgICAgIHkgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh5ID4gMTAwKVxuICAgICAgICAgICAgICAgICAgICB5ID0gMTAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB6aXAgdGhlIGdlbmVyYXRlZCB5IHZhbHVlcyB3aXRoIHRoZSB4IHZhbHVlc1xuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyArKyBpKVxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKFsgaSwgdGhpcy5kYXRhWyBpIF0gXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgc2hhZG93U2l6ZTogMCxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhYm92ZURhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGxhYmVsTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGF4aXNNYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgbWluQm9yZGVyTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXV0b0hpZ2hsaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCJWYWx1ZSBpcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZmVmZWYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIit3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KCQodGhpcy5wbGFjZWhvbGRlciksIFsgdGhpcy5nZXRSYW5kb21EYXRhKCkgXSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGUsIGNoYXJ0cy5jaGFydF9saXZlLnVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB1cGRhdGVcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFydHMuY2hhcnRfbGl2ZS5wbG90LnNldERhdGEoWyBjaGFydHMuY2hhcnRfbGl2ZS5nZXRSYW5kb21EYXRhKCkgXSk7XG4gICAgICAgICAgICBjaGFydHMuY2hhcnRfbGl2ZS5wbG90LmRyYXcoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChjaGFydHMuY2hhcnRfbGl2ZS51cGRhdGUsIGNoYXJ0cy5jaGFydF9saXZlLnVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfbGl2ZS5pbml0KCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X2hvcml6b250YWxfYmFycyc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2hvcml6b250YWxfYmFycyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IG51bGwsXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7IGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHBvc2l0aW9uOiBcIm53XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczogeyB0aWNrczogNCwgdGlja0RlY2ltYWxzOiAwIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdIF0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiICsgd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIC8vIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBkMSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNTsgaSArPSAxKVxuICAgICAgICAgICAgICAgIGQxLnB1c2goWyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApLCBpIF0pO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBWb2x1bWVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkMSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KCQodGhpcy5wbGFjZWhvbGRlciksIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfaG9yaXpvbnRhbF9iYXJzLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9vcmRlcmVkX2JhcnMnO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9vcmRlcmVkX2JhcnMgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBudWxsLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYXJXaWR0aDogMC4yLFxuICAgICAgICAgICAgICAgIGZpbGw6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhYm92ZURhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGxhYmVsTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGF4aXNNYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgbWluQm9yZGVyTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXV0b0hpZ2hsaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJuZVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICBub0NvbHVtbnM6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZmVmZWYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogNCxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIgKyB3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgLy9zb21lIGRhdGFcbiAgICAgICAgICAgIHZhciBkMSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMTA7IGkgKz0gMSlcbiAgICAgICAgICAgICAgICBkMS5wdXNoKFsgaSwgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDMwKSBdKTtcblxuICAgICAgICAgICAgdmFyIGQyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSAxMDsgaiArPSAxKVxuICAgICAgICAgICAgICAgIGQyLnB1c2goWyBqLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApIF0pO1xuXG4gICAgICAgICAgICB2YXIgZDMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDw9IDEwOyBrICs9IDEpXG4gICAgICAgICAgICAgICAgZDMucHVzaChbIGssIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkcyA9IFtdO1xuXG4gICAgICAgICAgICBkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIE9uZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQxLFxuICAgICAgICAgICAgICAgIGJhcnM6IHtvcmRlcjogMX1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0YSBUd29cIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkMixcbiAgICAgICAgICAgICAgICBiYXJzOiB7b3JkZXI6IDJ9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgVGhyZWVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkMyxcbiAgICAgICAgICAgICAgICBiYXJzOiB7b3JkZXI6IDN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRzO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoJCh0aGlzLnBsYWNlaG9sZGVyKSwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9vcmRlcmVkX2JhcnMuaW5pdCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X3N0YWNrZWRfYmFycyc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X3N0YWNrZWRfYmFycyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IG51bGwsXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFib3ZlRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbGFiZWxNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgYXhpc01hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5Cb3JkZXJNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvSGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlQWN0aXZlUmFkaXVzOiAyMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIHN0YWNrOiAwLFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7c2hvdzogZmFsc2UsIGZpbGw6IHRydWUsIHN0ZXBzOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgYmFyczoge3Nob3c6IHRydWUsIGJhcldpZHRoOiAwLjUsIGZpbGw6IDF9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICcjZWZlZmVmJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDExLFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMCxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJuZVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICBub0NvbHVtbnM6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFtdLFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIgKyB3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGQxID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAxMDsgaSArPSAxKVxuICAgICAgICAgICAgICAgIGQxLnB1c2goWyBpLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApIF0pO1xuXG4gICAgICAgICAgICB2YXIgZDIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IDEwOyBqICs9IDEpXG4gICAgICAgICAgICAgICAgZDIucHVzaChbIGosIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAyMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkMyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPD0gMTA7IGsgKz0gMSlcbiAgICAgICAgICAgICAgICBkMy5wdXNoKFsgaywgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIwKSBdKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIE9uZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFR3b1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFRyZWVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkM1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCgkKHRoaXMucGxhY2Vob2xkZXIpLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X3N0YWNrZWRfYmFycy5pbml0KCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfZG9udXQnO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9kb251dCA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtsYWJlbDogXCJVU0FcIiwgZGF0YTogMzh9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkJyYXppbFwiLCBkYXRhOiAyM30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiSW5kaWFcIiwgZGF0YTogMTV9LFxuICAgICAgICAgICAge2xhYmVsOiBcIlR1cmtleVwiLCBkYXRhOiA5fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJGcmFuY2VcIiwgZGF0YTogN30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiQ2hpbmFcIiwgZGF0YTogNX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiR2VybWFueVwiLCBkYXRhOiAzfVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBwaWU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSYWRpdXM6IDAuNCxcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogOFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGFydEFuZ2xlOiAyLFxuICAgICAgICAgICAgICAgICAgICBjb21iaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNFRUUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiAwLjA1XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAobGFiZWwsIHNlcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIj4nICsgbGFiZWwgKyAnJm5ic3A7JyArIE1hdGgucm91bmQoc2VyaWVzLnBlcmNlbnQpICsgJyU8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtzaG93OiBmYWxzZX0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4xXCIgKyBcIiVcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIiArIHdyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoJCh0aGlzLnBsYWNlaG9sZGVyKSwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9kb251dC5pbml0KCk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG52YXIgY2hhcnRzID1cbntcbiAgICAvLyB1dGlsaXR5IGNsYXNzXG4gICAgdXRpbGl0eToge1xuICAgICAgICBjaGFydENvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSwgY29sb3JzWyAnc3VjY2Vzcy1jb2xvcicgXSwgY29sb3JzWyAnd2FybmluZy1jb2xvcicgXSBdLFxuICAgICAgICBjaGFydEJhY2tncm91bmRDb2xvcnM6IFsgXCJyZ2JhKDI1NSwyNTUsMjU1LDApXCIsIFwicmdiYSgyNTUsMjU1LDI1NSwwKVwiIF0sXG5cbiAgICAgICAgYXBwbHlTdHlsZTogZnVuY3Rpb24gKHRoYXQpIHtcbiAgICAgICAgICAgIHRoYXQub3B0aW9ucy5jb2xvcnMgPSBjaGFydHMudXRpbGl0eS5jaGFydENvbG9ycztcbiAgICAgICAgICAgIHRoYXQub3B0aW9ucy5ncmlkLmJhY2tncm91bmRDb2xvciA9IHsgY29sb3JzOiBjaGFydHMudXRpbGl0eS5jaGFydEJhY2tncm91bmRDb2xvcnMgfTtcbiAgICAgICAgICAgIHRoYXQub3B0aW9ucy5ncmlkLmJvcmRlckNvbG9yID0gY2hhcnRzLnV0aWxpdHkuY2hhcnRDb2xvcnNbIDAgXTtcbiAgICAgICAgICAgIHRoYXQub3B0aW9ucy5ncmlkLmNvbG9yID0gY2hhcnRzLnV0aWxpdHkuY2hhcnRDb2xvcnNbIDAgXTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZW5lcmF0ZSByYW5kb20gbnVtYmVyIGZvciBjaGFydHNcbiAgICAgICAgcmFuZE51bTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDQwIC0gMjApKSApICsgMjA7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcnRzOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9ob3Jpem9udGFsX2JhcnMnO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9ob3Jpem9udGFsX2JhcnMgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBudWxsLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI2RlZGVkZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7cG9zaXRpb246IFwibndcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBiYWNrZ3JvdW5kT3BhY2l0eTogMH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsLCBheGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgKyBcImtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogNCxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdIF0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiK3dyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICAvLyBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgZDEgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDU7IGkgKz0gMSlcbiAgICAgICAgICAgICAgICBkMS5wdXNoKFsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDMwKSwgaSBdKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiU2FsZXMgVm9sdW1lXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDEsXG4gICAgICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiYXJXaWR0aDogMC41XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoJCh0aGlzLnBsYWNlaG9sZGVyKSwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjaGFydHMuY2hhcnRfaG9yaXpvbnRhbF9iYXJzLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnbGluZS1ob2xkZXInO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbICBjb2xvcnNbICdzdWNjZXNzLWNvbG9yJyBdXSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtzaG93OiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJud1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja1NpemU6IDQwLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge3RpY2tzOiA0LCB0aWNrRGVjaW1hbHM6IDAsIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J30sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIit3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc29tZSBkYXRhXG4gICAgICAgICAgICB0aGlzLmRhdGEuZDEgPSBbIFsgMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDQsIDExMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCA1MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTQsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTUsIDI0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTYsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTcsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTgsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTksIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjAsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjEsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjIsIDcwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjMsIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjQsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjUsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjYsIDQ1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjcsIDYwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjgsIDUxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjksIDU1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMzAsIDEwMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG5cbiAgICAgICAgICAgIC8vIG1ha2UgY2hhcnRcbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdChcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIFsge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXQgUmV2ZW51ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDFcbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18yLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50cyc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpbmVzX2ZpbGxfbm9wb2ludHMgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW10sXG4gICAgICAgICAgICBkMjogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgYWJvdmVEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBsYWJlbE1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBheGlzTWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIG1pbkJvcmRlck1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlQWN0aXZlUmFkaXVzOiAyMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIm53XCIsXG4gICAgICAgICAgICAgICAgbm9Db2x1bW5zOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogNCxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VmZWZlZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAxMSxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDEsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiICsgd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHNvbWUgZGF0YVxuICAgICAgICAgICAgdGhpcy5kYXRhLmQxID0gWyBbIDEsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyLCA2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMywgOSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDQsIDEyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDIxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCAyMSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCAyNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEyLCAyNyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE0LCAzMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE1LCAyNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE2LCAyNyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE3LCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE4LCAzMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE5LCAzNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIwLCAzOSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIxLCA0MiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIyLCA0NSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIzLCAzNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI0LCAzOSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI1LCA0MiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI2LCA0NSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI3LCAzOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI4LCA1MSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI5LCA1NSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMwLCA2MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG4gICAgICAgICAgICB0aGlzLmRhdGEuZDIgPSBbIFsgMSwgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIC0gNSBdLCBbIDIsIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSAtIDQgXSwgWyAzLCBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgLSA0IF0sIFsgNCwgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDYsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCA1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDksIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCA2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE0LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTUsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNiwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE3LCA1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTgsIDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOSwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIwLCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjEsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMiwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIzLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjQsIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNSwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI2LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjcsIDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOCwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI5LCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMzAsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSBdO1xuXG4gICAgICAgICAgICAvLyBtYWtlIGNoYXJ0XG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBbIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVmlzaXRzXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJVbmlxdWUgVmlzaXRzXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMlxuICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18yJztcbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18yID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZDE6IFtdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0gXSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogNSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtzaG93OiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJud1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja1NpemU6IDQwLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiA0LFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMCxcbiAgICAgICAgICAgICAgICB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIiNcIit3cmFwcGVyLFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc29tZSBkYXRhXG4gICAgICAgICAgICB0aGlzLmRhdGEuZDEgPSBbIFsgMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDQsIDExMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCA1MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTQsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTUsIDI0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTYsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTcsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTgsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTksIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjAsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjEsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjIsIDcwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjMsIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjQsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjUsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjYsIDQ1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjcsIDYwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjgsIDUxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjksIDU1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMzAsIDEwMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG5cbiAgICAgICAgICAgIC8vIG1ha2UgY2hhcnRcbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdChcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIFsge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXQgUmV2ZW51ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDFcbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18yLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHdyYXBwZXIgPSAnY2hhcnRfbWl4ZWRfMSc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X21peGVkXzEgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbIFwiI2RlZGVkZVwiLCBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0gXSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZGVkZWRlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge3Nob3c6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcIm53XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrU2l6ZTogNDAsXG4gICAgICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHZhbCwgYXhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICsgXCJrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7dGlja3M6IDQsIHRpY2tEZWNpbWFsczogMCwgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiI1wiK3dyYXBwZXIsXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSBzb21lIGRhdGFcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMSA9IFsgWyAxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMiwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNCwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDUwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCA2MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCAxMTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSBdO1xuXG4gICAgICAgICAgICAvLyBtYWtlIGNoYXJ0XG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBbIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmV0IFJldmVudWVcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmQxLFxuICAgICAgICAgICAgICAgICAgICBiYXJzOiB7c2hvdzogdHJ1ZSwgZmlsbDogMSwgYmFyV2lkdGg6IDAuNzUsIGFsaWduOiBcImNlbnRlclwifVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7c2hvdzogdHJ1ZSwgZmlsbDogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBcImNpcmNsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwiI2ZmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoYXJ0cy5jaGFydF9taXhlZF8xLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgd3JhcHBlciA9ICdjaGFydF9waWUnO1xuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9waWUgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICB7bGFiZWw6IFwiVVNBXCIsIGRhdGE6IDM4fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJCcmF6aWxcIiwgZGF0YTogMjN9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkluZGlhXCIsIGRhdGE6IDE1fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJUdXJrZXlcIiwgZGF0YTogOX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiRnJhbmNlXCIsIGRhdGE6IDd9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkNoaW5hXCIsIGRhdGE6IDV9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkdlcm1hbnlcIiwgZGF0YTogM31cbiAgICAgICAgXSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgcGllOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4xXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogMSxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmdsZTogMixcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMzUzNTM1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMC4wNVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKGxhYmVsLCBzZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJsYWJlbCBsYWJlbC1kZWZhdWx0XCI+JyArIGxhYmVsICsgJyZuYnNwOycgKyBNYXRoLnJvdW5kKHNlcmllcy5wZXJjZW50KSArICclPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Nob3c6IGZhbHNlfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMVwiICsgXCIlXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIrd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCgkKHRoaXMucGxhY2Vob2xkZXIpLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhcnRzLmNoYXJ0X3BpZS5pbml0KCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB3cmFwcGVyID0gJ2NoYXJ0X3NpbXBsZSc7XG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X3NpbXBsZSA9XG4gICAge1xuICAgICAgICAvLyBkYXRhXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHNpbjogW10sXG4gICAgICAgICAgICBjb3M6IFtdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0gXSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogNCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiA1LFxuICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcIiNmZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJzZVwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwLCBub0NvbHVtbnM6IDJ9LFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMCxcbiAgICAgICAgICAgIHlheGlzOiB7dGlja3M6IDN9LFxuICAgICAgICAgICAgeGF4aXM6IHt0aWNrczogNCwgdGlja0RlY2ltYWxzOiAwLCB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCd9LFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSwgLy9hY3RpdmF0ZSB0b29sdGlwXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4zXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwbGFjZWhvbGRlcjogXCIjXCIrd3JhcHBlcixcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE0OyBpICs9IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2luLnB1c2goWyBpLCBNYXRoLnNpbihpKSBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmNvcy5wdXNoKFsgaSwgTWF0aC5jb3MoaSkgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNpblwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuc2luLFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge2ZpbGxDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXX0sXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge2ZpbGxDb2xvcjogXCIjZmZmXCJ9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ29zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuY29zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXM6IHtmaWxsQ29sb3I6IFwiIzQ0NFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czoge2ZpbGxDb2xvcjogXCIjZmZmXCJ9XG4gICAgICAgICAgICAgICAgICAgIH0gXSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGFydHMuY2hhcnRfc2ltcGxlLmluaXQoKTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19zaW1wbGUnKTtcbnJlcXVpcmUoJy4vX21peGVkJyk7XG5yZXF1aXJlKCcuL19saW5lJyk7XG5yZXF1aXJlKCcuL19ob3Jpem9udGFsJyk7XG5yZXF1aXJlKCcuL19saW5lX2ZpbGxfbm9wb2ludHMnKTtcbnJlcXVpcmUoJy4vX2xpbmVfZmlsbF9ub3BvaW50c18yJyk7XG5yZXF1aXJlKCcuL19iYXJzLW9yZGVyZWQnKTtcbnJlcXVpcmUoJy4vX2RvbnV0Jyk7XG5yZXF1aXJlKCcuL19iYXJzLXN0YWNrZWQnKTtcbnJlcXVpcmUoJy4vX3BpZScpO1xucmVxdWlyZSgnLi9fYmFycy1ob3Jpem9udGFsJyk7XG5yZXF1aXJlKCcuL19hdXRvdXBkYXRlJyk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsInZhciBhcmVhID0gcmVxdWlyZSgnLi9saWIvX2FyZWEnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFyZWEoKTtcbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBhcmVhKTtcbiAgICB9KTtcbn0pKGpRdWVyeSk7IiwidmFyIGJhciA9IHJlcXVpcmUoJy4vbGliL19iYXInKTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJhcigpO1xuICAgICAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGJhcik7XG4gICAgfSk7XG59KShqUXVlcnkpOyIsInZhciBkb251dCA9IHJlcXVpcmUoJy4vbGliL19kb251dCcpO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9udXQoKTtcbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBkb251dCk7XG4gICAgfSk7XG59KShqUXVlcnkpOyIsInZhciBsaW5lID0gcmVxdWlyZSgnLi9saWIvX2xpbmUnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxpbmUoKTtcbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBsaW5lKTtcbiAgICB9KTtcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIHdyYXBwZXIgPSAnYXJlYS1jaGFydCc7XG5cbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICAkKFwiI1wiICsgd3JhcHBlcikuZW1wdHkoKTtcblxuICAgIG5ldyBNb3JyaXMuQXJlYSh7XG4gICAgICAgIGxpbmVDb2xvcnM6IFtjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXV0sXG4gICAgICAgIHBvaW50RmlsbENvbG9yczogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICBmaWxsT3BhY2l0eTogJzAuMycsXG4gICAgICAgIGVsZW1lbnQ6IHdyYXBwZXIsXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHt5OiAnMS4xLicsIGE6IDMwLCBiOiA5MH0sXG4gICAgICAgICAgICB7eTogJzIuMS4nLCBhOiAzNSwgYjogNjV9LFxuICAgICAgICAgICAge3k6ICczLjEuJywgYTogNTAsIGI6IDQwfSxcbiAgICAgICAgICAgIHt5OiAnNC4xLicsIGE6IDc1LCBiOiA2NX0sXG4gICAgICAgICAgICB7eTogJzUuMS4nLCBhOiA1MCwgYjogNDB9LFxuICAgICAgICAgICAge3k6ICc2LjEuJywgYTogNzUsIGI6IDY1fSxcbiAgICAgICAgICAgIHt5OiAnNy4xLicsIGE6IDYwLCBiOiA5MH1cbiAgICAgICAgXSxcbiAgICAgICAgeGtleTogJ3knLFxuICAgICAgICB5a2V5czogWydhJ10sXG4gICAgICAgIGxhYmVsczogWydTZXJpZXMgQSddLFxuICAgICAgICBncmlkVGV4dENvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLFxuICAgICAgICBncmlkVGV4dFdlaWdodDogJ2JvbGQnLFxuICAgICAgICByZXNpemU6IHRydWVcbiAgICB9KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIHdyYXBwZXIgPSAnYmFyLWNoYXJ0JztcblxuICAgIGlmICghICQoXCIjXCIgKyB3cmFwcGVyKS5sZW5ndGgpIHJldHVybjtcblxuICAgICQoXCIjXCIgKyB3cmFwcGVyKS5lbXB0eSgpO1xuXG4gICAgbmV3IE1vcnJpcy5CYXIoe1xuICAgICAgICBiYXJDb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0gXSxcbiAgICAgICAgZWxlbWVudDogd3JhcHBlcixcbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAge3k6ICcyMDA2JywgYTogMTAwLCBiOiA5MCwgYzogNDB9LFxuICAgICAgICAgICAge3k6ICcyMDA3JywgYTogNzUsIGI6IDY1LCBjOiAxMDB9LFxuICAgICAgICAgICAge3k6ICcyMDA4JywgYTogNTAsIGI6IDQwLCBjOiAzMH0sXG4gICAgICAgICAgICB7eTogJzIwMDknLCBhOiA3NSwgYjogNjUsIGM6IDg1fSxcbiAgICAgICAgICAgIHt5OiAnMjAxMCcsIGE6IDUwLCBiOiA0MCwgYzogNDV9LFxuICAgICAgICAgICAge3k6ICcyMDExJywgYTogNzUsIGI6IDY1LCBjOiA5MH0sXG4gICAgICAgICAgICB7eTogJzIwMTInLCBhOiAxMDAsIGI6IDkwLCBjOiA4MH1cbiAgICAgICAgXSxcbiAgICAgICAgZ3JpZFRleHRDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgZ3JpZFRleHRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgcmVzaXplOiB0cnVlLFxuICAgICAgICB4a2V5OiAneScsXG4gICAgICAgIHlrZXlzOiBbICdhJywgJ2InLCAnYycgXSxcbiAgICAgICAgbGFiZWxzOiBbICdTZXJpZXMgQScsICdTZXJpZXMgQicsICdTZXJpZXMgQycgXVxuICAgIH0pO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgd3JhcHBlciA9ICdkb251dC1jaGFydCc7XG5cbiAgICBpZiAoISAkKFwiI1wiICsgd3JhcHBlcikubGVuZ3RoKSByZXR1cm47XG5cbiAgICAkKFwiI1wiICsgd3JhcHBlcikuZW1wdHkoKTtcblxuICAgIG5ldyBNb3JyaXMuRG9udXQoe1xuICAgICAgICBlbGVtZW50OiB3cmFwcGVyLFxuICAgICAgICBjb2xvcnM6IFsgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdLCBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0gXSxcbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAge2xhYmVsOiBcIkRvd25sb2FkIFNhbGVzXCIsIHZhbHVlOiAxMn0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiSW4tU3RvcmUgU2FsZXNcIiwgdmFsdWU6IDMwfSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJNYWlsLU9yZGVyIFNhbGVzXCIsIHZhbHVlOiAyMH1cbiAgICAgICAgXVxuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi8uLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciB3cmFwcGVyID0gJ2xpbmUtY2hhcnQnO1xuXG4gICAgaWYgKCEgJChcIiNcIiArIHdyYXBwZXIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgJChcIiNcIiArIHdyYXBwZXIpLmVtcHR5KCk7XG5cbiAgICBuZXcgTW9ycmlzLkxpbmUoe1xuICAgICAgICBsaW5lQ29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdIF0sXG4gICAgICAgIHBvaW50RmlsbENvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSBdLFxuICAgICAgICBwb2ludFN0cm9rZUNvbG9yczogWyAnI2ZmZmZmZicsICcjZmZmZmZmJyBdLFxuICAgICAgICBncmlkVGV4dENvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLFxuICAgICAgICBncmlkVGV4dFdlaWdodDogJ2JvbGQnLFxuXG4gICAgICAgIC8vIElEIG9mIHRoZSBlbGVtZW50IGluIHdoaWNoIHRvIGRyYXcgdGhlIGNoYXJ0LlxuICAgICAgICBlbGVtZW50OiB3cmFwcGVyLFxuICAgICAgICAvLyBDaGFydCBkYXRhIHJlY29yZHMgLS0gZWFjaCBlbnRyeSBpbiB0aGlzIGFycmF5IGNvcnJlc3BvbmRzIHRvIGEgcG9pbnQgb25cbiAgICAgICAgLy8gdGhlIGNoYXJ0LlxuICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICB7ZGF0ZTogJzIwMTQtMDInLCBhOiAyMDAwLCBiOiAyNDAwfSxcbiAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wMycsIGE6IDEyMDAsIGI6IDI1MDB9LFxuICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA0JywgYTogMzIwMCwgYjogMjAwMH0sXG4gICAgICAgICAgICB7ZGF0ZTogJzIwMTQtMDUnLCBhOiAxNjAwLCBiOiAxNDQwfSxcbiAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNicsIGE6IDEyOTAsIGI6IDI4MzB9LFxuICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA3JywgYTogMTkzMCwgYjogMTIwMH0sXG4gICAgICAgICAgICB7ZGF0ZTogJzIwMTQtMDgnLCBhOiAyMTIwLCBiOiAzMDAwfVxuICAgICAgICBdLFxuICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZGF0YSByZWNvcmQgYXR0cmlidXRlIHRoYXQgY29udGFpbnMgeC12YWx1ZXMuXG4gICAgICAgIHhrZXk6ICdkYXRlJyxcbiAgICAgICAgLy8gQSBsaXN0IG9mIG5hbWVzIG9mIGRhdGEgcmVjb3JkIGF0dHJpYnV0ZXMgdGhhdCBjb250YWluIHktdmFsdWVzLlxuICAgICAgICB5a2V5czogWyAnYScsICdiJyBdLFxuICAgICAgICAvLyBMYWJlbHMgZm9yIHRoZSB5a2V5cyAtLSB3aWxsIGJlIGRpc3BsYXllZCB3aGVuIHlvdSBob3ZlciBvdmVyIHRoZVxuICAgICAgICAvLyBjaGFydC5cbiAgICAgICAgbGFiZWxzOiBbICdTZXJpZXMgQScsICdTZXJpZXMgQicgXSxcbiAgICAgICAgcmVzaXplOiB0cnVlXG4gICAgfSk7XG59OyIsInJlcXVpcmUoJy4vX2FyZWEnKTtcbnJlcXVpcmUoJy4vX2JhcicpO1xucmVxdWlyZSgnLi9fZG9udXQnKTtcbnJlcXVpcmUoJy4vX2xpbmUnKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcblxuICAgICQoXCIuc3BhcmtsaW5lLWJhclwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50ZXh0KCQodGhpcykuZmluZCgnc3BhbicpLnRleHQoKSk7XG5cbiAgICAgICAgdmFyIGQgPSAkKHRoaXMpLmRhdGEoJ2RhdGEnKSB8fCBcImh0bWxcIjtcblxuICAgICAgICAkKHRoaXMpLnNwYXJrbGluZShcbiAgICAgICAgICAgIGQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc3MCcsXG4gICAgICAgICAgICAgICAgYmFyV2lkdGg6IDEwLFxuICAgICAgICAgICAgICAgIGJhclNwYWNpbmc6IDgsXG4gICAgICAgICAgICAgICAgemVyb0F4aXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YWNrZWRCYXJDb2xvcjogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0gXSxcbiAgICAgICAgICAgICAgICBjb2xvck1hcDogJCh0aGlzKS5kYXRhKCdjb2xvcnMnKSA/IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdzdWNjZXNzLWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0sIGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0gXSA6IFtdLFxuICAgICAgICAgICAgICAgIGVuYWJsZVRhZ09wdGlvbnM6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgICQoXCIuc3BhcmtsaW5lLWxpbmVcIikuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGQgPSAkKHRoaXMpLmRhdGEoJ2RhdGEnKSB8fCBcImh0bWxcIjtcblxuICAgICAgICAkKHRoaXMpLnNwYXJrbGluZShcbiAgICAgICAgICAgIGQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjQnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgc3BvdFJhZGl1czogJzMuMicsXG4gICAgICAgICAgICAgICAgc3BvdENvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbWluU3BvdENvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbWF4U3BvdENvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0U3BvdENvbG9yOiBjb2xvcnNbICdkYW5nZXItY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAnMicsXG4gICAgICAgICAgICAgICAgbGluZUNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiBjb2xvcnNbICdib2R5LWJnJyBdXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fc3BhcmtsaW5lJyk7XG4iXX0=
