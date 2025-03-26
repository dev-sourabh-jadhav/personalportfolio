$(document).ready(function () {
    $('.file-tab, .tab').click(function () {
        // Get the file name from data-file attribute
        var fileName = $(this).data('file');

        // Hide all content sections
        $('.file-content').addClass('hidden');

        // Show the selected file content
        $('#file-' + fileName).removeClass('hidden');

        // Remove highlight from all tabs
        $('.tab').removeClass('bg-gray-700');

        // Highlight the selected tab
        $('.tab[data-file="' + fileName + '"]').addClass('bg-gray-700');
    });

    // 👉 Trigger click on default tab (like "index") on page load
    $('.tab[data-file="index"]').trigger('click');


    // LOAD MODEL ON CLICK

    $('#loadmore-btn').on('click', function () {
        $('#loadMoreModal').removeClass('hidden').addClass('flex');
    });

    // Close modal on close button click
    $('#closeModal').on('click', function () {
        $('#loadMoreModal').removeClass('flex').addClass('hidden');
    });
});

// Portfolio DROPDOWN
function toggleDropdown() {
    const list = document.getElementById("dropdownList");
    const icon = document.getElementById("dropdownIcon");
    list.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
}




