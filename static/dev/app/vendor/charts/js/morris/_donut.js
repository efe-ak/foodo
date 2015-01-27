var donut = require('./lib/_donut');

(function ($) {
    $(function () {
        donut();
        $('[data-skin]').on('click', donut);
    });
})(jQuery);