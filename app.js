// Small progressive enhancement
const byId = (id) => document.getElementById(id);

window.addEventListener('DOMContentLoaded', () => {
  const yearEl = byId('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = byId('cta');
  const msg = byId('message');
  if (btn && msg) {
    btn.addEventListener('click', () => {
      msg.textContent = '✨ Nice! This is a static site with a tiny bit of JS.';
    });
  }
});
