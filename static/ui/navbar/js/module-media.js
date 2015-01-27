/*!
 * Modern UI Kits for Apps & Websites 3.6.1
 * Author: mosaicpro
 * Licence: http://themeforest.net/licenses
 * Copyright 2015
 */

(function ($) {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("panel");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(".gallery-grid .panel").resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

    // Kick off one resize to fix all videos on page load
    }).resize();

})(jQuery);
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
(function ($) {
    var preview = $(".owl-preview");
    var thumb = $(".owl-thumb");

    preview.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>']
    });

    thumb.owlCarousel({
        items: 5,
        itemsDesktop: [ 1199, 5 ],
        itemsDesktopSmall: [ 979, 4 ],
        itemsTablet: [ 768, 4 ],
        itemsMobile: [ 479, 3 ],
        pagination: false,
        navigation: true,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $(".owl-thumb")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($(".owl-thumb").data("owlCarousel") !== undefined) {
            center(current);
        }
    }

    $(".owl-thumb").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        preview.trigger("owl.goTo", number);
    });

    function center(number) {
        var thumbvisible = thumb.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in thumbvisible) {
            if (num === thumbvisible[ i ]) {
                found = true;
            }
        }

        if (found === false) {
            if (num > thumbvisible[ thumbvisible.length - 1 ]) {
                thumb.trigger("owl.goTo", num - thumbvisible.length + 2);
            } else {
                if (num - 1 === - 1) {
                    num = 0;
                }
                thumb.trigger("owl.goTo", num);
            }
        } else if (num === thumbvisible[ thumbvisible.length - 1 ]) {
            thumb.trigger("owl.goTo", thumbvisible[ 1 ]);
        } else if (num === thumbvisible[ 0 ]) {
            thumb.trigger("owl.goTo", num - 1);
        }
    }

})(jQuery);