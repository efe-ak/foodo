(function ($) {
    "use strict";


    $(function(){

        $('[data-toggle="isotope"]').each(function () {
            $(this).isotope({
                layoutMode: $(this).data('layoutMode') || "packery",
                itemSelector: '.item'
            });

            $(this).isotope('on', 'layoutComplete', function(){
                $(window).trigger('resize');
            });
        });

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);
