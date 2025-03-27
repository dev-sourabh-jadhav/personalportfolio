$(document).ready(function () {
    function activateTab(fileName, fileText, fileIcon) {
        // Hide all file content sections
        $('.file-content').addClass('hidden');

        // Show the selected file content
        $('#file-' + fileName).removeClass('hidden');

        // Remove highlight from all tabs
        $('.tab, .file-tab').removeClass('bg-gray-700');

        // Highlight the active tab
        $('.tab[data-file="' + fileName + '"], .file-tab[data-file="' + fileName + '"]').addClass('bg-gray-700');

        // If tab doesn't exist, add it to tabsContainer
        if ($('.tab[data-file="' + fileName + '"]').length === 0) {
            $('#tabsContainer').append(`
                <div class="tab px-4 py-2 cursor-pointer hover:bg-gray-700 flex items-center space-x-2 bg-gray-700" data-file="${fileName}">
                    <img src="${fileIcon}" alt="File Icon" class="w-4 h-4" />
                    <span>${fileText}</span>
                </div>
            `);
        }

        // Update "Open Editors" list
        $('#openEditors').removeClass('hidden').html(` 
            <li data-file="${fileName}" class="flex items-center justify-between px-2 py-1 hover:bg-gray-700 rounded">
                <span class="flex items-center space-x-2">
                    <img src="${fileIcon}" alt="File Icon" class="w-4 h-4" />
                    <span>${fileText}</span>
                </span>
                <button class="close-editor text-gray-400 hover:text-white" data-file="${fileName}">✖</button>
            </li>
        `);
    }

    // Click event for file tabs
    $('.file-tab').click(function () {
        var fileName = $(this).data('file');
        var fileText = $(this).find('span').text();
        var fileIcon = $(this).find('img').attr('src');
        activateTab(fileName, fileText, fileIcon);
    });

    // Click event for opened tabs
    $(document).on('click', '.tab', function () {
        var fileName = $(this).data('file');
        var fileText = $(this).find('span').text();
        var fileIcon = $(this).find('img').attr('src');
        activateTab(fileName, fileText, fileIcon);
    });

    // Close Editor and switch back to 'home'
    $(document).on('click', '.close-editor', function () {
        $('#openEditors').addClass('hidden').html('');
        activateTab("home", "index.blade.php", "src/images/laravel.png"); // Switch to home
    });

    // Portfolio & Open Editors Dropdown
    function toggleDropdown(folderId) {
        $('#' + folderId).toggleClass('hidden');
        $('#dropdownIcon-' + folderId).toggleClass('rotate-180');
    }

    // Default active file on page load
    $('.file-tab[data-file="home"]').trigger('click');

    // LOAD MODEL ON CLICK

    $('#loadmore-btn').on('click', function () {
        $('#loadMoreModal').removeClass('hidden').addClass('flex');
    });

    // Close modal on close button click
    $('#closeModal').on('click', function () {
        $('#loadMoreModal').removeClass('flex').addClass('hidden');
    });


    let roles = ["Web Developer", "Web Designer", "PHP & Laravel Developer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        let currentText = roles[index].substring(0, charIndex);
        $("#animatedText").text(currentText);

        if (!isDeleting && charIndex < roles[index].length) {
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        }

        if (!isDeleting && charIndex === roles[index].length) {
            setTimeout(() => (isDeleting = true), 1500); // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % roles.length; // Move to next word
        }

        setTimeout(typeEffect, isDeleting ? 100 : 150);
    }

    typeEffect();
});




function toggleDropdown(folderId) {
    const list = document.getElementById(folderId);
    const icon = document.getElementById(`dropdownIcon-${folderId}`);

    list.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
}


$(document).on("click", "#searchBtn", function (e) {
    Swal.fire({
        icon: "info",
        title: "Partially Responsive Layout",
        text: "This layout adapts in some areas but maintains a fixed structure like VS Code.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    });
});

$(document).on("click", "#gitBtn", function (e) {
    $("#terminal").toggleClass("hidden");
});
