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