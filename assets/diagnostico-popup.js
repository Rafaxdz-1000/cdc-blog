/**
 * CDC Diagnostico Popup
 * Supabase integration + email confirmation
 * Projeto: amywvimvggkaarshxpbi
 */

(function () {
  const SUPABASE_URL = 'https://amywvimvggkaarshxpbi.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXd2aW12Z2drYWFyc2h4cGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMDk2MTgsImV4cCI6MjA5MDc4NTYxOH0.Ib2pPEuIK_ll26ZXKz9Dty1mdEdhWWM-yU5hXWIf3Xw';

  const popupHTML = `
<div id="cdc-diag-overlay" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(5,5,16,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);overflow-y:auto;" role="dialog" aria-modal="true" aria-label="Diagnostico Digital Gratuito">
  <div style="min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 16px 48px;">
    <div id="cdc-diag-modal" style="width:100%;max-width:600px;background:linear-gradient(135deg,rgba(37,99,235,0.06),rgba(5,5,16,0.98));border:1px solid rgba(37,99,235,0.2);border-radius:12px;padding:40px 32px;position:relative;box-shadow:0 0 80px rgba(37,99,235,0.12);">
      <button id="cdc-diag-close" onclick="closeDiagnosticoModal()" aria-label="Fechar" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);width:36px;height:36px;border-radius:6px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;">✕</button>
      <div id="cdc-diag-form-state">
        <div style="margin-bottom:32px;">
          <span style="font-family:monospace;font-size:11px;color:#2563EB;letter-spacing:0.2em;text-transform:uppercase;">Diagnostico Gratuito</span>
          <h2 style="font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:700;color:#fff;margin-top:8px;line-height:1.2;">Descubra o Potencial Digital do Seu Negocio</h2>
          <p style="color:rgba(255,255,255,0.5);font-size:0.875rem;margin-top:8px;line-height:1.6;">Preencha o formulario abaixo. Nossa equipe entregara sua analise personalizada em ate <strong style="color:#38BDF8;">3 dias uteis</strong>.</p>
        </div>
        <form id="cdc-diag-form" novalidate>
          <div style="margin-bottom:20px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Nome Completo *</label>
            <input type="text" id="dp-nome" name="nome" required placeholder="Seu nome completo" autocomplete="name" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(37,99,235,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Celular (WhatsApp) *</label>
            <input type="tel" id="dp-celular" name="celular" required placeholder="(11) 99999-9999" autocomplete="tel" maxlength="15" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">E-mail *</label>
            <input type="email" id="dp-email" name="email" required placeholder="seu@email.com" autocomplete="email" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Instagram</label>
              <input type="text" id="dp-instagram" name="instagram" placeholder="@seuinstagram" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Facebook</label>
              <input type="text" id="dp-facebook" name="facebook" placeholder="link do perfil" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;">
            </div>
          </div>
          <div style="margin-bottom:16px;">
            <label id="dp-no-company-label" style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="toggleEmpresaField()">
              <div id="dp-checkbox-box" style="width:20px;height:20px;min-width:20px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;transition:all 0.2s;">
                <svg id="dp-checkbox-check" style="display:none;width:12px;height:12px;color:#fff;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <input type="checkbox" id="dp-nocompany" name="noCompany" style="display:none;">
              <span style="font-size:14px;color:rgba(255,255,255,0.5);">Nao tenho empresa</span>
            </label>
          </div>
          <div id="dp-empresa-field" style="margin-bottom:20px;">
            <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Nome da Empresa</label>
            <input type="text" id="dp-empresa" name="empresa" placeholder="Nome da sua empresa" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;">
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Porte *</label>
              <select id="dp-porte" name="porte" required style="width:100%;background:rgba(5,5,16,0.95);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;appearance:none;-webkit-appearance:none;cursor:pointer;">
                <option value="">Selecione...</option>
                <option value="MEI / Autonomo">MEI / Autonomo</option>
                <option value="Microempresa (ate 9 func.)">Microempresa</option>
                <option value="Pequena Empresa (10-49 func.)">Pequena Empresa</option>
                <option value="Media Empresa (50-99 func.)">Media Empresa</option>
                <option value="Grande Empresa (100+)">Grande Empresa</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;font-weight:600;">Segmento *</label>
              <select id="dp-nicho" name="nicho" required style="width:100%;background:rgba(5,5,16,0.95);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:12px 14px;border-radius:6px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box;appearance:none;-webkit-appearance:none;cursor:pointer;">
                <option value="">Selecione...</option>
                <option>E-commerce / Loja Virtual</option>
                <option>Varejo / Loja Fisica</option>
                <option>Servicos</option>
                <option>Alimentacao / Restaurante</option>
                <option>Beleza / Estetica</option>
                <option>Turismo / Hotelaria</option>
                <option>Saude / Bem-estar</option>
                <option>Educacao</option>
                <option>Tecnologia</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
          <div id="dp-error" style="display:none;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#FCA5A5;padding:12px 16px;border-radius:6px;font-size:13px;margin-bottom:20px;"></div>
          <button type="submit" id="dp-submit-btn" style="width:100%;background:#2563EB;color:#fff;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;padding:16px 24px;border:none;border-radius:6px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;">
            <span id="dp-btn-text">Quero Meu Diagnostico Gratis!</span>
            <svg id="dp-btn-arrow" style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg id="dp-btn-spinner" style="display:none;width:18px;height:18px;animation:dp-spin 0.8s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="3" stroke-opacity="0.3"/><path d="M12 2 a10 10 0 0 1 10 10" stroke-width="3" stroke-linecap="round"/></svg>
          </button>
          <p style="text-align:center;font-size:11px;color:rgba(255,255,255,0.25);margin-top:16px;">Seus dados estao seguros. Nao enviamos spam.</p>
        </form>
      </div>
      <div id="cdc-diag-success" style="display:none;text-align:center;padding:20px 0;">
        <div style="width:64px;height:64px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
          <svg style="width:32px;height:32px;color:#22C55E;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:700;color:#fff;margin-bottom:12px;">Diagnostico Enviado!</h3>
        <p style="color:rgba(255,255,255,0.5);font-size:0.9rem;line-height:1.7;max-width:440px;margin:0 auto 8px;">Voce recebera um <strong style="color:#38BDF8;">e-mail de confirmacao</strong> em instantes e sua analise em ate <strong style="color:#38BDF8;">3 dias uteis</strong>.</p>
        <p style="color:rgba(255,255,255,0.3);font-size:0.8rem;margin-bottom:32px;">Fique de olho tambem no WhatsApp!</p>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
          <button onclick="closeDiagnosticoModal()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);padding:10px 24px;border-radius:6px;cursor:pointer;font-size:13px;">Fechar</button>
          <a id="dp-wa-link" href="#" target="_blank" rel="noopener" style="background:#25D366;color:#fff;padding:10px 24px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">Falar com a Equipe</a>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
@keyframes dp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
#cdc-diag-modal { animation: dp-fadeIn 0.3s ease-out; }
@keyframes dp-fadeIn { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 480px) { #cdc-diag-modal { padding: 28px 20px !important; } }
</style>
`;

  function inject() {
    if (document.getElementById('cdc-diag-overlay')) return;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const celInput = document.getElementById('dp-celular');
    if (celInput) {
      celInput.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length <= 10) {
          v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
          v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
        e.target.value = v;
      });
    }

    const form = document.getElementById('cdc-diag-form');
    if (form) form.addEventListener('submit', handleSubmit);

    const overlay = document.getElementById('cdc-diag-overlay');
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeDiagnosticoModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDiagnosticoModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  window.toggleEmpresaField = function () {
    const cb = document.getElementById('dp-nocompany');
    const box = document.getElementById('dp-checkbox-box');
    const check = document.getElementById('dp-checkbox-check');
    const field = document.getElementById('dp-empresa-field');
    cb.checked = !cb.checked;
    if (cb.checked) {
      box.style.background = '#2563EB'; box.style.borderColor = '#2563EB';
      check.style.display = 'block'; field.style.display = 'none';
    } else {
      box.style.background = 'rgba(255,255,255,0.04)'; box.style.borderColor = 'rgba(255,255,255,0.2)';
      check.style.display = 'none'; field.style.display = 'block';
    }
  };

  window.openDiagnosticoModal = function () {
    if (!document.getElementById('cdc-diag-overlay')) inject();
    document.getElementById('cdc-diag-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  window.closeDiagnosticoModal = function () {
    const overlay = document.getElementById('cdc-diag-overlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('dp-submit-btn');
    const btnText = document.getElementById('dp-btn-text');
    const btnArrow = document.getElementById('dp-btn-arrow');
    const btnSpinner = document.getElementById('dp-btn-spinner');
    const errorEl = document.getElementById('dp-error');

    const nome = document.getElementById('dp-nome').value.trim();
    const celular = document.getElementById('dp-celular').value.trim();
    const email = document.getElementById('dp-email').value.trim();
    const instagram = document.getElementById('dp-instagram').value.trim();
    const facebook = document.getElementById('dp-facebook').value.trim();
    const temEmpresa = !document.getElementById('dp-nocompany').checked;
    const empresa = document.getElementById('dp-empresa').value.trim();
    const porte = document.getElementById('dp-porte').value;
    const nicho = document.getElementById('dp-nicho').value;

    errorEl.style.display = 'none';
    if (!nome) { showError('Por favor, informe seu nome completo.'); return; }
    if (!celular || celular.replace(/\D/g, '').length < 10) { showError('Por favor, informe um celular valido.'); return; }
    if (!email || !email.includes('@')) { showError('Por favor, informe um e-mail valido.'); return; }
    if (!porte) { showError('Por favor, selecione o porte da empresa.'); return; }
    if (!nicho) { showError('Por favor, selecione o segmento.'); return; }

    btn.disabled = true; btn.style.opacity = '0.7'; btn.style.cursor = 'not-allowed';
    btnText.textContent = 'Enviando...';
    btnArrow.style.display = 'none'; btnSpinner.style.display = 'block';

    const payload = { nome, celular, email, instagram, facebook,
      tem_empresa: temEmpresa, empresa: temEmpresa ? empresa : null, porte, nicho };

    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/submit-diagnostico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) await insertDirectly(payload);
      showSuccess(nome, email, celular);
    } catch (err) {
      try {
        await insertDirectly(payload);
        showSuccess(nome, email, celular);
      } catch (err2) {
        showError('Erro ao enviar. Tente novamente ou entre em contato via WhatsApp.');
        btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
        btnText.textContent = 'Quero Meu Diagnostico Gratis!';
        btnArrow.style.display = 'block'; btnSpinner.style.display = 'none';
      }
    }
  }

  async function insertDirectly(payload) {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/diagnosticos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Prefer': 'return=minimal' },
      body: JSON.stringify(payload)
    });
    if (!resp.ok && resp.status !== 201) throw new Error('Insert failed: ' + resp.status);
  }

  function showSuccess(nome, email, celular) {
    document.getElementById('cdc-diag-form-state').style.display = 'none';
    document.getElementById('cdc-diag-success').style.display = 'block';
    const waMsg = encodeURIComponent(`Ola! Sou ${nome} e acabei de enviar meu diagnostico. Email: ${email}`);
    document.getElementById('dp-wa-link').href = `https://api.whatsapp.com/send/?phone=5511953758059&text=${waMsg}`;
  }

  function showError(msg) {
    const el = document.getElementById('dp-error');
    el.textContent = msg; el.style.display = 'block';
  }

})();
