(function ($) {

    if (typeof $.fn.dataTable != 'undefined') {

        // Datatables
        $('#data-table').dataTable();

    }

    // Table Checkbox All
    $('#checkAll').on('click', function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });

})(jQuery);