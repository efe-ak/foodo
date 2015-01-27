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
