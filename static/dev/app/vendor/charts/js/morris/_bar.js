var bar = require('./lib/_bar');

(function ($) {
    $(function () {
        bar();
        $('[data-skin]').on('click', bar);
    });
})(jQuery);