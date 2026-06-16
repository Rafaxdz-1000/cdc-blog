<script id="cdc-theme-js">
(function(){try{
  /* ── Light theme palette overrides (dark stays default; accents preserved) ── */
  if(!document.getElementById('cdc-theme-css')){
    var s=document.createElement('style');
    s.id='cdc-theme-css';
    s.textContent=[
      'html.cdc-light body{background:#f4f6fb!important;color:#1e293b!important}',
      /* fixed header — ALWAYS-DARK navy bar so the white Logo.png keeps contrast (FIX 3) */
      'html.cdc-light header[role="banner"]{background:rgba(5,5,16,0.85)!important;border-bottom-color:rgba(255,255,255,0.1)!important}',
      'html.cdc-light header[role="banner"] .text-white{color:#ffffff!important}',
      'html.cdc-light header[role="banner"] .text-neutral-400{color:#cbd5e1!important}',
      'html.cdc-light #mobileMenuBtn{color:#ffffff!important}',
      /* mobile-menu top bar also stays dark navy (white logo lives here) */
      'html.cdc-light .bg-\\[\\#050510\\]\\/97{background-color:rgba(5,5,16,0.97)!important}',
      /* hardcoded dark surfaces -> light surfaces */
      'html.cdc-light [style*="#0d1225"],html.cdc-light [style*="#080b18"],html.cdc-light [style*="#0a0f1e"],html.cdc-light [style*="#0a1230"]{background:#ffffff!important;background-color:#ffffff!important}',
      'html.cdc-light .article-card,html.cdc-light .featured-hero,html.cdc-light .sidebar-widget{background:#ffffff!important;border-color:rgba(15,23,42,0.1)!important}',
      'html.cdc-light .bg-neutral-950,html.cdc-light .bg-neutral-900{background-color:#ffffff!important}',
      'html.cdc-light .bg-white\\/\\[0\\.02\\],html.cdc-light .bg-white\\/5{background-color:rgba(15,23,42,0.04)!important}',
      /* subtle dark dropdowns / panels using bg-[#...] arbitrary classes */
      'html.cdc-light .bg-\\[\\#0a0f1e\\]\\/95{background-color:rgba(255,255,255,0.97)!important}',
      /* text: white headings -> dark ink ONLY in neutral containers, excluding blue fills + webstory overlays (FIX 1+2) */
      'html.cdc-light main .text-white:not(.bg-\\[\\#2563EB\\]):not(.ws-card *),html.cdc-light article .text-white:not(.bg-\\[\\#2563EB\\]):not(.ws-card *),html.cdc-light section .text-white:not(.bg-\\[\\#2563EB\\]):not(.ws-card *),html.cdc-light footer .text-white:not(.bg-\\[\\#2563EB\\]):not(.ws-card *){color:#0f172a!important}',
      /* blue fills keep white labels (FIX 1) */
      'html.cdc-light .bg-\\[\\#2563EB\\],html.cdc-light .bg-\\[\\#2563EB\\] *,html.cdc-light .bg-\\[\\#2563EB\\] .text-white,html.cdc-light a.bg-\\[\\#2563EB\\],html.cdc-light button.bg-\\[\\#2563EB\\]{color:#ffffff!important}',
      'html.cdc-light .bg-\\[\\#2563EB\\]{background-color:#2563EB!important}',
      /* webstory titles over dark photo gradient keep white (FIX 2) */
      'html.cdc-light .ws-card .text-white,html.cdc-light .ws-card p,html.cdc-light .ws-card .card-title{color:#ffffff!important}',
      'html.cdc-light .text-neutral-300{color:#334155!important}',
      'html.cdc-light .text-neutral-400{color:#475569!important}',
      'html.cdc-light .text-neutral-500{color:#64748b!important}',
      'html.cdc-light .text-neutral-600{color:#64748b!important}',
      'html.cdc-light .text-neutral-700{color:#94a3b8!important}',
      /* borders */
      'html.cdc-light .border-white\\/10,html.cdc-light .border-white\\/\\[0\\.06\\],html.cdc-light .border-white\\/\\[0\\.07\\],html.cdc-light .border-white\\/\\[0\\.12\\],html.cdc-light .border-white\\/\\[0\\.1\\],html.cdc-light .border-white\\/\\[0\\.05\\]{border-color:rgba(15,23,42,0.12)!important}',
      /* "Iniciar Projeto" CTA is bg-white/text-black -> keep white pill but dark ink so it reads on light bg */
      'html.cdc-light a.bg-white.text-black{background-color:#ffffff!important;color:#0f172a!important}',
      'html.cdc-light a.bg-white.text-black:hover{background-color:#e2e8f0!important}',
      /* prose article body text */
      'html.cdc-light .prose-article p,html.cdc-light .prose-article ul li,html.cdc-light .prose-article ol li{color:#475569!important}',
      'html.cdc-light .prose-article h2{color:#0f172a!important;border-bottom-color:rgba(15,23,42,0.08)!important}',
      'html.cdc-light .prose-article h3,html.cdc-light .prose-article strong{color:#1e293b!important}',
      'html.cdc-light .prose-article blockquote{color:#334155!important}',
      /* search / select inputs */
      'html.cdc-light #cdc-search,html.cdc-light #catSelect{background:#ffffff!important;color:#1e293b!important;border-color:rgba(15,23,42,0.15)!important}',
      'html.cdc-light #catSelect{color-scheme:light}',
      'html.cdc-light #catSelect option{background:#ffffff!important;color:#1e293b!important}',
      'html.cdc-light #cdc-search::placeholder{color:#94a3b8!important}',
      /* toggle button on the dark header keeps light-on-dark treatment */
      'html.cdc-light header[role="banner"] #cdc-theme-toggle{border-color:rgba(255,255,255,0.12)!important;color:#cbd5e1!important}',
      'html.cdc-light header[role="banner"] #cdc-theme-toggle:hover{color:#ffffff!important}'
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ── Wire the toggle ── */
  var root=document.documentElement;
  var btn=document.getElementById('cdc-theme-toggle');

  function sync(){
    var light=root.classList.contains('cdc-light');
    if(btn){
      btn.setAttribute('aria-pressed',light?'true':'false');
      btn.title=light?'Mudar para tema escuro':'Mudar para tema claro';
    }
  }

  if(btn){
    btn.addEventListener('click',function(){
      var light=root.classList.toggle('cdc-light');
      try{localStorage.setItem('cdc-theme',light?'light':'dark');}catch(e){}
      sync();
    });
  }

  /* keep tabs in sync */
  window.addEventListener('storage',function(e){
    if(e.key==='cdc-theme'){
      if(e.newValue==='light')root.classList.add('cdc-light');
      else if(e.newValue==='dark')root.classList.remove('cdc-light');
      sync();
    }
  });

  sync();
}catch(e){}})();
</script>