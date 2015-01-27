(function ($) {

    $(".owl-mixed").owlCarousel({
        items: 2,
        pagination: false,
        navigation: true,
        navigationText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ],
        itemsDesktop: [ 1199, 2 ],
        itemsDesktopSmall: [ 979, 1 ],
        itemsTablet: [ 768, 1 ]
    });

})(jQuery);