module.exports = function () {

    $('.sidebar[data-type="collapse"]').each(function(){

        var dd = $(this);

        dd.find('.sidebar-menu > li > a').off('mouseenter');
        dd.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        dd.find('.sidebar-menu > li > a').off('mouseenter');
        dd.find('.sidebar-menu > li > a').off('click');
        dd.off('mouseleave');
        dd.find('.dropdown').off('mouseover');
        dd.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        dd.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        dd.find('#dropdown-temp').remove();

        dd.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse');

        dd.find('.collapse').on('shown.bs.collapse', function () {
            dd.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        dd.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open [data-toggle="collapse"]');
            if (parents.length) {
                parents.trigger('click');
            }
            $(this).closest('.hasSubmenu').addClass("open");
        });

        dd.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass("open");
        });

        dd.find('.collapse').collapse({ 'toggle': false });

    });
};