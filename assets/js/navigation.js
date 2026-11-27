/**
 * Shared Site Navigation & Layout Controller
 * ------------------------------------------
 * Renders the shared topbar, sidebar chapter list, breadcrumbs, and
 * previous/next chapter links using window.STUDY_NOTES_CONFIG.
 * Uses relative root prefix (`data-root`) so every page works cleanly on
 * GitHub Pages subpaths as well as local file:// previews.
 */
(function () {
  function initSiteShell() {
    var config = window.STUDY_NOTES_CONFIG;
    if (!config) return;

    var body = document.body;
    var rootPrefix = body.getAttribute("data-root") || "./";
    var currentChapterId = body.getAttribute("data-chapter-id") || "home";

    function resolvePath(relPath) {
      return rootPrefix + relPath;
    }

    // 1. Render Topbar if mount exists
    var topbarMount = document.getElementById("site-topbar-mount");
    if (topbarMount) {
      topbarMount.innerHTML =
        '<header class="site-topbar" role="banner">' +
          '<div class="site-topbar-left">' +
            '<button type="button" class="site-menu-btn" id="siteMenuToggle" aria-label="Toggle chapter menu" aria-expanded="false">&#9776;</button>' +
            '<a class="site-brand" href="' + resolvePath("index.html") + '">' +
              '<img src="' + resolvePath("assets/images/emblem.svg") + '" alt="Study Notes Emblem">' +
              '<span class="site-brand-text">' +
                '<span class="site-brand-title">' + config.siteTitle + '</span>' +
                '<span class="site-brand-sub">' + config.siteSubtitle + '</span>' +
              '</span>' +
            '</a>' +
          '</div>' +
          '<div class="site-topbar-actions">' +
            '<a class="site-top-link" href="' + resolvePath("index.html") + '">&#8962; All Chapters</a>' +
          '</div>' +
        '</header>';
    }

    // 2. Render Sidebar if mount exists
    var sidebarMount = document.getElementById("site-sidebar-mount");
    if (sidebarMount) {
      var chapterItemsHtml = config.chapters.map(function (ch) {
        var activeClass = ch.id === currentChapterId ? " is-active" : "";
        return (
          '<li>' +
            '<a class="site-nav-link' + activeClass + '" href="' + resolvePath(ch.path) + '">' +
              '<span class="site-nav-badge">' + ch.number + '</span>' +
              '<span>' + ch.title + '</span>' +
            '</a>' +
          '</li>'
        );
      }).join("");

      var homeActiveClass = currentChapterId === "home" ? " is-active" : "";
      var hasDetails = document.querySelectorAll("main details").length > 0;

      sidebarMount.innerHTML =
        '<div class="site-backdrop" id="siteBackdrop"></div>' +
        '<aside class="site-sidebar" id="siteSidebar" aria-label="Chapter Navigation">' +
          '<div>' +
            '<div class="site-nav-group">' +
              '<p class="site-nav-label">Overview</p>' +
              '<ul class="site-nav-list">' +
                '<li>' +
                  '<a class="site-nav-link' + homeActiveClass + '" href="' + resolvePath("index.html") + '">' +
                    '<span class="site-nav-badge">&#8962;</span>' +
                    '<span>Home · Chapter Index</span>' +
                  '</a>' +
                '</li>' +
              '</ul>' +
            '</div>' +
            '<div class="site-nav-group">' +
              '<p class="site-nav-label">Study Chapters (' + config.chapters.length + ')</p>' +
              '<ul class="site-nav-list">' + chapterItemsHtml + '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="site-sidebar-tools">' +
            (hasDetails
              ? '<button type="button" class="site-tool-btn" id="toggleAllDetailsBtn">' +
                  '<span id="toggleAllDetailsLabel">Expand All Collapsibles</span>' +
                  '<span>&#9662;</span>' +
                '</button>'
              : '') +
            '<button type="button" class="site-tool-btn" onclick="window.print()">' +
              '<span>Print / Save Notes</span>' +
              '<span>&#128438;</span>' +
            '</button>' +
            '<p class="site-sidebar-note">Original study notes preserved without content alteration.</p>' +
          '</div>' +
        '</aside>';
    }

    // 3. Render Breadcrumb & Bottom Pager on Chapter Pages
    var chapterIndex = -1;
    for (var i = 0; i < config.chapters.length; i++) {
      if (config.chapters[i].id === currentChapterId) {
        chapterIndex = i;
        break;
      }
    }

    if (chapterIndex !== -1) {
      var currentChapter = config.chapters[chapterIndex];
      var breadcrumbMount = document.getElementById("site-breadcrumb-mount");
      if (breadcrumbMount) {
        breadcrumbMount.innerHTML =
          '<div class="site-breadcrumb-bar">' +
            '<div class="site-breadcrumb-trail">' +
              '<a href="' + resolvePath("index.html") + '">Home</a>' +
              '<span>/</span>' +
              '<span>Chapter ' + currentChapter.number + '</span>' +
            '</div>' +
            '<span>' + currentChapter.lectureSource + '</span>' +
          '</div>';
      }

      var pagerMount = document.getElementById("site-pager-mount");
      if (pagerMount) {
        var prevCh = chapterIndex > 0 ? config.chapters[chapterIndex - 1] : null;
        var nextCh = chapterIndex < config.chapters.length - 1 ? config.chapters[chapterIndex + 1] : null;

        var prevHtml = prevCh
          ? '<a class="site-pager-card" href="' + resolvePath(prevCh.path) + '">' +
              '<span class="site-pager-dir">&larr; Previous Chapter (' + prevCh.number + ')</span>' +
              '<span class="site-pager-title">' + prevCh.title + '</span>' +
            '</a>'
          : '<a class="site-pager-card" href="' + resolvePath("index.html") + '">' +
              '<span class="site-pager-dir">&larr; Course Overview</span>' +
              '<span class="site-pager-title">Back to All Chapters</span>' +
            '</a>';

        var nextHtml = nextCh
          ? '<a class="site-pager-card is-next" href="' + resolvePath(nextCh.path) + '">' +
              '<span class="site-pager-dir">Next Chapter (' + nextCh.number + ') &rarr;</span>' +
              '<span class="site-pager-title">' + nextCh.title + '</span>' +
            '</a>'
          : '<a class="site-pager-card is-next" href="' + resolvePath("index.html") + '">' +
              '<span class="site-pager-dir">Completed All Chapters &rarr;</span>' +
              '<span class="site-pager-title">Return to Course Home</span>' +
            '</a>';

        pagerMount.innerHTML =
          '<nav class="site-chapter-pager" aria-label="Chapter navigation">' +
            prevHtml +
            nextHtml +
          '</nav>';
      }
    }

    // 4. Mobile Drawer Toggle Logic
    var menuBtn = document.getElementById("siteMenuToggle");
    var sidebar = document.getElementById("siteSidebar");
    var backdrop = document.getElementById("siteBackdrop");

    function closeMenu() {
      if (!sidebar || !backdrop || !menuBtn) return;
      sidebar.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      if (!sidebar || !backdrop || !menuBtn) return;
      var willOpen = !sidebar.classList.contains("is-open");
      sidebar.classList.toggle("is-open", willOpen);
      backdrop.classList.toggle("is-open", willOpen);
      menuBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    }

    if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // 5. Expand / Collapse All <details> helper for studying
    var toggleDetailsBtn = document.getElementById("toggleAllDetailsBtn");
    var toggleDetailsLabel = document.getElementById("toggleAllDetailsLabel");
    if (toggleDetailsBtn && toggleDetailsLabel) {
      var allExpanded = false;
      toggleDetailsBtn.addEventListener("click", function () {
        allExpanded = !allExpanded;
        var detailsList = document.querySelectorAll("main details");
        for (var j = 0; j < detailsList.length; j++) {
          detailsList[j].open = allExpanded;
        }
        toggleDetailsLabel.textContent = allExpanded
          ? "Collapse All Collapsibles"
          : "Expand All Collapsibles";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteShell);
  } else {
    initSiteShell();
  }
})();
