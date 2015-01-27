var line = require('./lib/_line');

(function ($) {
    $(function () {
        line();
        $('[data-skin]').on('click', line);
    });
})(jQuery);