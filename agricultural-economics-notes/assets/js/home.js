/**
 * Homepage Chapter Directory Renderer & Filter
 * Reads directly from window.STUDY_NOTES_CONFIG.chapters so adding a chapter
 * to config/chapters.js automatically updates the homepage cards and search.
 */
(function () {
  function initHomePage() {
    var config = window.STUDY_NOTES_CONFIG;
    if (!config) return;

    var grid = document.getElementById("homeChaptersGrid");
    var searchInput = document.getElementById("homeChapterSearch");
    var emptyMsg = document.getElementById("homeEmptyMsg");
    var countBadge = document.getElementById("homeChapterCount");

    if (countBadge) {
      countBadge.textContent = config.chapters.length + " Complete Chapters";
    }

    function renderCards(filterText) {
      if (!grid) return;
      var query = (filterText || "").trim().toLowerCase();

      var filtered = config.chapters.filter(function (ch) {
        if (!query) return true;
        var haystack = [
          ch.number,
          ch.title,
          ch.subtitle,
          ch.lectureSource,
          (ch.topics || []).join(" ")
        ].join(" ").toLowerCase();
        return haystack.indexOf(query) !== -1;
      });

      if (filtered.length === 0) {
        grid.innerHTML = "";
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
      }

      if (emptyMsg) emptyMsg.style.display = "none";

      grid.innerHTML = filtered.map(function (ch) {
        var topicsHtml = (ch.topics || []).map(function (topic) {
          return '<span class="chapter-topic-chip">' + topic + '</span>';
        }).join("");

        return (
          '<article class="chapter-card">' +
            '<div class="chapter-card-top">' +
              '<span class="chapter-card-num">CHAPTER ' + ch.number + '</span>' +
              '<span class="chapter-card-source">' + ch.lectureSource + '</span>' +
            '</div>' +
            '<h3 class="chapter-card-title">' +
              '<a href="' + ch.path + '">' + ch.title + '</a>' +
            '</h3>' +
            '<p class="chapter-card-sub">' + ch.subtitle + '</p>' +
            '<div class="chapter-card-topics">' + topicsHtml + '</div>' +
            '<div class="chapter-card-footer">' +
              '<span class="chapter-card-source">Full lecture notes, tables &amp; revision</span>' +
              '<a class="chapter-read-btn" href="' + ch.path + '">Open Chapter &rarr;</a>' +
            '</div>' +
          '</article>'
        );
      }).join("");
    }

    renderCards("");

    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        renderCards(e.target.value);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomePage);
  } else {
    initHomePage();
  }
})();
