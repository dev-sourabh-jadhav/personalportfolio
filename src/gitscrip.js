$(document).ready(function () {
    let username = "dev-sourabh-jadhav";
    let repoList = $("#repo-list");

    $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        type: "GET",
        success: function (repos) {
            $.each(repos, function (index, repo) {
                let repoCard = $(`
                    <div class="repo-card" style="position: relative; padding: 16px; border-radius: 12px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); color: white; overflow: hidden; background: url('src/images/bgonecsst.jpg') center/cover;">
                        <div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(8px); border-radius: 12px;"></div>
                        <a href="${repo.html_url}" target="_blank" style="position: relative; z-index: 2; font-size: 1.25rem; font-weight: bold; text-decoration: none; color: white; display: block;">
                            ${repo.name}
                        </a>
                        <p style="position: relative; z-index: 2; margin-top: 8px; font-size: 0.875rem;">
                            ${repo.description || "No description available."}
                        </p>
                        <p class="live-link" style="position: relative; z-index: 2; margin-top: 8px; font-size: 0.875rem;">
                            <strong>Live Demo:</strong> <span id="live-link-${repo.name}" style="color: yellow;">Fetching...</span>
                        </p>
                    </div>
                `);

                repoList.append(repoCard);

                // Fetch README.md to extract live link
                fetchReadme(username, repo.name);
            });
        },
        error: function () {
            repoList.html("<p style='color: red; text-align: center;'>Out of Limite Try Again Some Time</p>");
        }
    });

    function fetchReadme(username, repoName) {
        $.ajax({
            url: `https://api.github.com/repos/${username}/${repoName}/readme`,
            type: "GET",
            headers: {
                "Accept": "application/vnd.github.v3.raw" // Fetch raw markdown content
            },
            success: function (readmeContent) {
                let liveLink = extractLiveLink(readmeContent);
                let linkText = liveLink ? `<a href="${liveLink}" target="_blank" style="color: lightgreen;">${liveLink}</a>` : "No live link found.";
                $(`#live-link-${repoName}`).html(linkText);
            },
            error: function () {
                $(`#live-link-${repoName}`).html("No README found.");
            }
        });
    }

    function extractLiveLink(readmeContent) {
        let urlRegex = /(https?:\/\/[^\s\)]+)/g; // Avoid capturing trailing )
        let matches = readmeContent.match(urlRegex);
        if (matches) {
            return matches.find(url => url.includes("vercel") || url.includes("netlify") || url.includes("github.io") || url.includes("live"));
        }
        return null;
    }

});


document.addEventListener("DOMContentLoaded", function () {
    let img = document.getElementById('contribution-image');

    // Check if image is already loaded (for caching issues)
    if (img.complete) {
        showContributionImage();
    } else {
        img.onload = showContributionImage;
    }
});

function showContributionImage() {
    console.log("Image Loaded, Hiding Skeleton");
    document.getElementById('contribution-skeleton').classList.add('hidden');
    document.getElementById('contribution-image').classList.remove('hidden');
}
