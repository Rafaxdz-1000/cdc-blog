<script id="cdc-pgwin-js">
(function () {
  try {
    var SVG_PREV = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
    var SVG_NEXT = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

    function isMobile() {
      try {
        if (window.matchMedia) return window.matchMedia('(max-width: 479px)').matches;
      } catch (e) {}
      return (window.innerWidth || document.documentElement.clientWidth || 9999) <= 479;
    }

    function numBtn(p, cur) {
      var active = p === cur;
      return '<button onclick="goPage(' + p + ')"'
        + ' class="pagination-btn w-9 h-9 flex items-center justify-center text-xs font-bold font-mono rounded-sm border transition-colors cursor-pointer '
        + (active
            ? 'border-[#2563EB] bg-[#2563EB] text-white'
            : 'border-white/[0.1] text-neutral-500 hover:border-blue-500/40 hover:text-white')
        + '" aria-label="Pagina ' + p + '"' + (active ? ' aria-current="page"' : '') + '>'
        + p
        + '</button>';
    }

    function ellipsis() {
      return '<span class="px-1 text-neutral-600 select-none">…</span>';
    }

    function prevBtn(cur) {
      var disabled = cur === 1;
      return '<button onclick="goPage(' + (cur - 1) + ')"' + (disabled ? ' disabled' : '')
        + ' class="pagination-btn prev-btn flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-colors '
        + (disabled
            ? 'border-white/[0.06] text-neutral-700 cursor-not-allowed'
            : 'border-white/[0.12] text-neutral-400 hover:border-blue-500/50 hover:text-white cursor-pointer')
        + '" aria-label="Pagina anterior">'
        + SVG_PREV
        + '<span>Anterior</span>'
        + '</button>';
    }

    function nextBtn(cur, totalPages) {
      var disabled = cur === totalPages;
      return '<button onclick="goPage(' + (cur + 1) + ')"' + (disabled ? ' disabled' : '')
        + ' class="pagination-btn next-btn flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-colors '
        + (disabled
            ? 'border-white/[0.06] text-neutral-700 cursor-not-allowed'
            : 'border-white/[0.12] text-neutral-400 hover:border-blue-500/50 hover:text-white cursor-pointer')
        + '" aria-label="Proxima pagina">'
        + '<span>Proxima</span>'
        + SVG_NEXT
        + '</button>';
    }

    window.renderPaginationUI = function (total) {
      try {
        var el = document.getElementById('pagination');
        if (!el) return;
        var per = (typeof POSTS_PER_PAGE !== 'undefined' && POSTS_PER_PAGE) ? POSTS_PER_PAGE : 8;
        var totalPages = Math.ceil(total / per);
        var cur = (typeof currentPage !== 'undefined' && currentPage) ? currentPage : 1;
        if (cur < 1) cur = 1;
        if (cur > totalPages) cur = totalPages;

        if (totalPages <= 1) { el.style.cssText = 'display:none!important'; return; }
        el.style.cssText = 'display:flex!important;margin-top:2.5rem;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;';

        var html = '';

        if (isMobile()) {
          // Ultra-compact: Prev | first … [cur] … last | Next  (no 25 buttons)
          html += prevBtn(cur);

          // First page (and gap) when current is far from the start.
          // Collapse a single-page gap into a real number (never a 1-page ellipsis).
          if (cur > 2) {
            html += numBtn(1, cur);
            if (cur - 1 === 3) html += numBtn(2, cur);   // gap of exactly 1 (page 2) -> show it
            else if (cur - 1 > 3) html += ellipsis();    // gap of 2+ -> ellipsis
          } else if (cur === 2) {
            html += numBtn(1, cur);
          }

          // Current page indicator — keeps tap target >=40px (h-10 min-w-[40px])
          html += '<span class="pagination-btn flex items-center justify-center h-10 min-w-[40px] px-3 text-xs font-bold font-mono rounded-sm border border-[#2563EB] bg-[#2563EB] text-white select-none"'
            + ' aria-current="page" aria-label="Pagina ' + cur + ' de ' + totalPages + '">'
            + cur + '<span class="text-white/70">/' + totalPages + '</span>'
            + '</span>';

          // Last page (and gap) when current is far from the end.
          if (cur < totalPages - 1) {
            if (totalPages - 1 === cur + 1) html += numBtn(cur + 1, cur); // gap of exactly 1 -> show it
            else if (totalPages - 1 > cur + 1) html += ellipsis();        // gap of 2+ -> ellipsis
            html += numBtn(totalPages, cur);
          } else if (cur === totalPages - 1) {
            html += numBtn(totalPages, cur);
          }

          html += nextBtn(cur, totalPages);
          el.innerHTML = html;
          return;
        }

        // Desktop windowed: Prev | 1 … (cur-1) [cur] (cur+1) … N | Next
        html += prevBtn(cur);

        var WINDOW = 1; // pages on each side of current
        var pages = [];
        var addPage = function (p) {
          if (p >= 1 && p <= totalPages && pages.indexOf(p) === -1) pages.push(p);
        };

        addPage(1);
        addPage(totalPages);
        for (var d = -WINDOW; d <= WINDOW; d++) addPage(cur + d);

        pages.sort(function (a, b) { return a - b; });

        // Render: collapse single-page gaps into a real number so an ellipsis
        // NEVER stands in for exactly one hidden page (FIX 4).
        var prev = 0;
        for (var i = 0; i < pages.length; i++) {
          var p = pages[i];
          if (prev && p - prev === 2) html += numBtn(prev + 1, cur);  // exactly 1 hidden -> show it
          else if (prev && p - prev > 2) html += ellipsis();          // 2+ hidden -> ellipsis
          html += numBtn(p, cur);
          prev = p;
        }

        html += nextBtn(cur, totalPages);
        el.innerHTML = html;
      } catch (e) {}
    };

    // Repaint once with the new override, after DOM is ready
    var repaint = function () {
      try {
        if (typeof window.applyFilters === 'function') window.applyFilters();
        else if (typeof window.renderPage === 'function') window.renderPage();
      } catch (e) {}
    };
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', repaint);
    } else {
      setTimeout(repaint, 0);
    }

    // Re-render windowed control on breakpoint changes so desktop<->mobile swap is live.
    // Breakpoint pinned to 479px to match the site's @media (max-width:479px) CSS (FIX 5).
    try {
      if (window.matchMedia) {
        var mq = window.matchMedia('(max-width: 479px)');
        var onChange = function () {
          try {
            var n = (typeof _matchedCards !== 'undefined' && _matchedCards) ? _matchedCards.length : 0;
            window.renderPaginationUI(n);
          } catch (e) {}
        };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
      }
    } catch (e) {}
  } catch (e) {}
})();
</script>