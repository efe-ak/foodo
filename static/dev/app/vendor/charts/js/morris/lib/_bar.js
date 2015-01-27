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