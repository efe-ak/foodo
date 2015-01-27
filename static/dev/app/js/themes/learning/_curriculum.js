(function ($) {
    "use strict";

    if (!$('.curriculum').length) return;

    $('.curriculum .list-group-item').on('click', function(){
        location.href = $(this).data('target');
    });

    $('.curriculum .collapse').on('show.bs.collapse', function(){
        $(this).closest('.curriculum').addClass('open');
    });

    $('.curriculum .collapse').on('hide.bs.collapse', function(){
        $(this).closest('.curriculum').removeClass('open');
    });

})(jQuery);