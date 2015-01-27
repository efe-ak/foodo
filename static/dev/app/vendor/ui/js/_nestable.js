(function ($) {
    "use strict";

    if (typeof $.fn.nestable != 'undefined') {

        $('.nestable').nestable({
            rootClass: 'nestable',
            listNodeName: 'ul',
            listClass: 'nestable-list',
            itemClass: 'nestable-item',
            dragClass: 'nestable-drag',
            handleClass: 'nestable-handle',
            collapsedClass: 'nestable-collapsed',
            placeClass: 'nestable-placeholder',
            emptyClass: 'nestable-empty'
        });

    }

})(jQuery);
