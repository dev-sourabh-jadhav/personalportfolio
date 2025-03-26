$(document).ready(function () {
    $.ajax({
        url: "https://api.github.com/users/dev-sourabh-jadhav/repos",
        type: "GET",
        success: function (data) {
            let repoList = $("#repo-list");
            $.each(data, function (index, repo) {
                repoList.append(`
                    <div class="repo-card" style="position: relative; padding: 16px; border-radius: 12px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); color: white; overflow: hidden; background: url('src/images/bgonecsst.jpg') center/cover;">
                        <div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(8px); border-radius: 12px;"></div>
                        <a href="${repo.html_url}" target="_blank" style="position: relative; z-index: 2; font-size: 1.25rem; font-weight: bold; text-decoration: none; color: white; display: block;">
                            ${repo.name}
                        </a>
                        <p style="position: relative; z-index: 2; margin-top: 8px; font-size: 0.875rem;">
                            ${repo.description || "No description available."}
                        </p>
                    </div>
                `);
            });
        },
        error: function () {
            $("#repo-list").html("<p style='color: red; text-align: center;'>Failed to load repositories.</p>");
        }
    });
});

function showContributionImage() {
    document.getElementById('contribution-skeleton').classList.add('hidden');
    document.getElementById('contribution-image').classList.remove('hidden');
}
