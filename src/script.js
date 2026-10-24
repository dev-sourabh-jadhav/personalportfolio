const FILES = [
  { id: "home", name: "index.blade.php", icon: "src/images/laravel.png" },
  { id: "about", name: "about.js", icon: "src/images/javascript-original.png" },
  { id: "contact", name: "contact.css", icon: "src/images/css3-original.png" },
  { id: "project", name: "project.php", icon: "src/images/php.png" },
  { id: "repository", name: "repository.git", icon: "src/images/git.png" },
];

const LOGOS = ["laravel", "django", "python", "javascript-original", "bootstrap-original", "css3-original", "tailwindcss-original", "jquery"];

const TECH = [
  ["html5-original", "HTML"], ["css3-original", "CSS"], ["javascript-original", "JavaScript"],
  ["bootstrap-original", "Bootstrap"], ["tailwindcss-original", "Tailwindcss"], ["jquery", "jQuery"],
  ["sql", "SQL"], ["python", "Python"], ["django", "Django"], ["laravel", "Laravel"],
  ["php", "PHP"], ["wordpress", "WordPress"], ["github-icon", "git"], ["upwork", "Upwork"], ["bitbucket", "Bitbucket"],
];

function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("hidden");
  document.getElementById("dropdownIcon-" + id).classList.toggle("rotate-180");
}

$(function () {
  // Explorer list + tabs
  FILES.forEach((f) => {
    $("#portfolio").append(`
      <li><button class="file-tab hover:bg-vs-hover w-full text-left px-2 py-1 rounded flex items-center space-x-2" data-file="${f.id}">
        <img src="${f.icon}" alt="" class="w-4 h-4" /><span>${f.name}</span></button></li>`);
    $("#tabsContainer").append(`
      <div class="tab px-4 py-2 cursor-pointer hover:bg-vs-hover flex items-center space-x-2" data-file="${f.id}">
        <img src="${f.icon}" alt="" class="w-4 h-4" /><span>${f.name}</span></div>`);
  });

  // Marquee: same set twice so the -50% loop is seamless
  const set = LOGOS.map((n) => `<div class="animation"><img src="src/images/${n}.png" alt="${n}" /></div>`).join("");
  $("#marquee").html(set + set);

  // Tech modal
  $("#techGrid").html(
    TECH.map(([img, label]) => `
      <div class="tech-card flex items-center space-x-2">
        <img src="src/images/${img}.png" alt="${label}" /><span>${label}</span>
      </div>`).join("")
  );

  function activateTab(id) {
    const f = FILES.find((x) => x.id === id);
    $(".file-content").addClass("hidden");
    $("#file-" + id).removeClass("hidden");
    $(".tab, .file-tab").removeClass("active-tab bg-vs-hover");
    $(`.tab[data-file="${id}"]`).addClass("active-tab");
    $(`.file-tab[data-file="${id}"]`).addClass("bg-vs-hover");
    $("#openEditors").removeClass("hidden").html(`
      <li class="flex items-center justify-between px-2 py-1 hover:bg-vs-hover rounded">
        <span class="flex items-center space-x-2"><img src="${f.icon}" alt="" class="w-4 h-4" /><span>${f.name}</span></span>
        <button class="close-editor text-vs-muted hover:text-vs-text">✖</button>
      </li>`);
  }

  $(document).on("click", ".tab, .file-tab", function () { activateTab($(this).data("file")); });
  $(document).on("click", ".close-editor", function () { $("#openEditors").addClass("hidden").html(""); activateTab("home"); });
  activateTab("home");

  // Modal
  $("#loadmore-btn").on("click", () => $("#loadMoreModal").removeClass("hidden").addClass("flex"));
  $("#closeModal").on("click", () => $("#loadMoreModal").removeClass("flex").addClass("hidden"));
  $("#loadMoreModal").on("click", function (e) { if (e.target === this) $("#closeModal").click(); });

  // Sidebar buttons
  $("#explorerBtn").on("click", () => $("#explorer").toggleClass("hidden"));
  $("#gitBtn").on("click", () => $("#terminal").toggleClass("hidden"));
  $("#searchBtn").on("click", () =>
    Swal.fire({
      icon: "info",
      title: "Partially Responsive Layout",
      text: "This layout adapts in some areas but keeps a fixed structure like VS Code.",
      confirmButtonColor: "#3085d6",
    })
  );

  // Typing effect
  const roles = ["Full Stack Developer", "Backend Developer", "Laravel Developer", "Django Developer"];
  let r = 0, c = 0, del = false;
  (function type() {
    const word = roles[r];
    c += del ? -1 : 1;
    $("#animatedText").text(word.substring(0, c));
    let delay = del ? 80 : 130;
    if (!del && c === word.length) { del = true; delay = 1500; }
    else if (del && c === 0) { del = false; r = (r + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  })();

  // Scroll project screenshots by their real height on hover
  $(document).on("mouseenter", ".project-card:not(.logo-card)", function () {
    const img = $(this).find("img")[0];
    const box = $(this).find(".image-container")[0];
    const dist = Math.min(0, box.clientHeight - img.offsetHeight);
    img.style.setProperty("--scroll", dist + "px");
    img.style.setProperty("--dur", Math.max(2, -dist / 150) + "s");
  });

  // ---------- Colour themes (like VS Code "Select Color Theme") ----------
  const THEMES = [
    { id: "dark-plus", name: "Dark+", type: "dark" },
    { id: "light-plus", name: "Light+", type: "light" },
    { id: "monokai", name: "Monokai", type: "dark" },
    { id: "dracula", name: "Dracula", type: "dark" },
    { id: "solarized-dark", name: "Solarized Dark", type: "dark" },
  ];
  const THEME_KEY = "portfolio-theme";
  let activeTheme = "dark-plus", hi = 0;

  function applyTheme(id) {
    const t = THEMES.find((x) => x.id === id) || THEMES[0];
    document.documentElement.setAttribute("data-theme", t.id);
    $("#themeName").text(t.name);
    return t.id;
  }
  function saveTheme(id) { try { localStorage.setItem(THEME_KEY, id); } catch (e) {} }
  function savedTheme() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }

  const pickerOpen = () => $("#themePicker").hasClass("flex");
  function renderThemes() {
    $("#themeList").html(THEMES.map((t, i) =>
      `<li class="theme-item ${i === hi ? "active" : ""}" data-i="${i}"><span>${t.name}</span><span class="text-xs text-vs-muted">${t.type}</span></li>`
    ).join(""));
    const el = $("#themeList .active")[0];
    if (el) el.scrollIntoView({ block: "nearest" });
  }
  function openPicker() {
    hi = Math.max(0, THEMES.findIndex((t) => t.id === activeTheme));
    renderThemes();
    $("#themePicker").removeClass("hidden").addClass("flex");
  }
  function closePicker(commit) {
    if (commit) { activeTheme = applyTheme(THEMES[hi].id); saveTheme(activeTheme); }
    else applyTheme(activeTheme);              // cancel: go back to the previous theme
    $("#themePicker").removeClass("flex").addClass("hidden");
  }
  function movePicker(d) {
    hi = (hi + d + THEMES.length) % THEMES.length;
    applyTheme(THEMES[hi].id);                 // live preview
    renderThemes();
  }

  activeTheme = applyTheme(savedTheme() || "dark-plus");

  $("#themeBtn, #statusTheme").on("click", openPicker);
  $("#themeList").on("mouseover", ".theme-item", function () {
    hi = +$(this).data("i"); applyTheme(THEMES[hi].id);
    $("#themeList .theme-item").removeClass("active"); $(this).addClass("active");
  });
  $("#themeList").on("click", ".theme-item", function () { hi = +$(this).data("i"); closePicker(true); });
  $("#themePicker").on("click", function (e) { if (e.target === this) closePicker(false); });

  let lastCtrlK = 0;
  $(document).on("keydown", function (e) {
    if (pickerOpen()) {
      if (e.key === "ArrowDown") { e.preventDefault(); movePicker(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); movePicker(-1); }
      else if (e.key === "Enter") { e.preventDefault(); closePicker(true); }
      else if (e.key === "Escape") { e.preventDefault(); closePicker(false); }
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "k") { e.preventDefault(); lastCtrlK = Date.now(); }
    else if (e.ctrlKey && e.key.toLowerCase() === "t" && Date.now() - lastCtrlK < 1500) { e.preventDefault(); openPicker(); }
  });
});