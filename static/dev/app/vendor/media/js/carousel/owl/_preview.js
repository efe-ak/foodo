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