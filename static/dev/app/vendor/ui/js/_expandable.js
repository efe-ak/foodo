(function ($) {

    $('.expandable').each(function(){
       $(this).find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));