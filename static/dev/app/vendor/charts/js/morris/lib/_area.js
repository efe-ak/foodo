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