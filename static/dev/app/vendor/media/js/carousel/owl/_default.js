(function ($) {

    $(".owl-basic").each(function () {
        var c = $(this);
        $(this).owlCarousel({
            items: c.data('items') || 4,
            itemsDesktop: [ 1199, c.data('itemsDesktop') || 3 ],
            itemsDesktopSmall: [ 979, c.data('itemsDesktopSmall') || 3 ],
            afterUpdate: function () {
                $(window).trigger('resize');
            }
        });
    });

})(jQuery);