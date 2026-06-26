/* Clube dos Cisnes — wiring da newsletter.
   Liga TODOS os formularios de newsletter do blog (sidebar, rodape, secao principal)
   ao endpoint real de inscricao (double opt-in) e injeta os campos Nome e WhatsApp.
   Injetado em todas as paginas pelo build (deploy.yml). */
(function () {
  'use strict';
  var ENDPOINT = 'https://amywvimvggkaarshxpbi.supabase.co/functions/v1/newsletter/subscribe';

  function makeInput(type, name, ph, cls) {
    var el = document.createElement('input');
    el.type = type; el.name = name; el.placeholder = ph;
    if (cls) el.className = cls;
    el.style.width = '100%';
    el.style.boxSizing = 'border-box';
    if (type === 'tel') el.setAttribute('inputmode', 'tel');
    if (type === 'text') el.autocomplete = 'name';
    return el;
  }

  function enhance(form, emailInput) {
    if (!form || form.getAttribute('data-cdc-wired')) return;
    form.setAttribute('data-cdc-wired', '1');
    var cls = emailInput.className || '';

    var nameI = makeInput('text', 'cdc_name', 'Seu nome', cls);
    var phoneI = makeInput('tel', 'cdc_phone', 'Seu WhatsApp (com DDD)', cls);

    var hp = document.createElement('input');
    hp.type = 'text'; hp.name = 'website'; hp.tabIndex = -1; hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';

    var parent = emailInput.parentNode;
    parent.insertBefore(nameI, emailInput);
    parent.insertBefore(phoneI, emailInput);
    parent.insertBefore(hp, emailInput);

    // empilha os campos para um layout consistente
    try {
      form.style.display = 'flex';
      form.style.flexDirection = 'column';
      if (!form.style.gap) form.style.gap = '10px';
      form.style.alignItems = 'stretch';
    } catch (e) {}

    var status = form.querySelector('[data-cdc-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-cdc-status', '1');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText = 'font-size:12px;margin:6px 0 0;min-height:16px';
      form.appendChild(status);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var email = (emailInput.value || '').trim();
      if (!email) { status.style.color = '#f87171'; status.textContent = 'Informe seu e-mail.'; return; }
      var btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      var orig = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
      status.style.color = '#94A3B8'; status.textContent = '';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, name: nameI.value, phone: phoneI.value, website: hp.value })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok) {
            status.style.color = '#34d399';
            status.textContent = d.message || 'Quase la! Confira seu e-mail e confirme a inscricao.';
            form.reset();
          } else {
            status.style.color = '#f87171';
            status.textContent = (d && d.error) || 'Nao foi possivel inscrever. Tente novamente.';
          }
        })
        .catch(function () { status.style.color = '#f87171'; status.textContent = 'Erro de conexao. Tente novamente.'; })
        .finally(function () { if (btn) { btn.disabled = false; btn.innerHTML = orig; } });
    }, true);
  }

  function wireAll() {
    ['sidebar-nl-email', 'footer-nl-email', 'newsletter-email'].forEach(function (id) {
      var inp = document.getElementById(id);
      if (inp && inp.form) enhance(inp.form, inp);
    });
    var forms = document.querySelectorAll('form[aria-label]');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      if ((f.getAttribute('aria-label') || '').toLowerCase().indexOf('newsletter') < 0) continue;
      var inp = f.querySelector('input[type="email"]');
      if (inp) enhance(f, inp);
    }
  }

  // neutraliza o handler antigo, que apenas abria o WhatsApp
  try { window.cdcNewsletterSubmit = function (e) { if (e) e.preventDefault(); }; } catch (e) {}

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireAll);
  else wireAll();
})();
