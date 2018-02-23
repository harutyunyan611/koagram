$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id') // Extract info from data-* attributes
    var modal = $(this)
    var hreflink = $("#deleteLink");
    hreflink.attr("href", hreflink.data('href') + id);
})