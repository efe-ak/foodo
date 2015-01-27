(function ($) {
    "use strict";

    if (typeof $.fn.select2 != 'undefined') {

        $('[data-toggle*="select2"]').each(function() {

            var t = $(this),
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        });

        $('[data-toggle="select2-enable"]').click(function () {
            $($(this).data('target')).select2("enable");
        });

        $('[data-toggle="select2-disable"]').click(function () {
            $($(this).data('target')).select2("disable");
        });

        // templating
        var format = function (state) {
            if (! state.id) return state.text;
            return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
        };

        $("#select2_7").select2({
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });

    }

})(jQuery);
