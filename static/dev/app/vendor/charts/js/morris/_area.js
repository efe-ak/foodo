var area = require('./lib/_area');

(function ($) {
    $(function () {
        area();
        $('[data-skin]').on('click', area);
    });
})(jQuery);