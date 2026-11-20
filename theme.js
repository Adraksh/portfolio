/* Apply before styles load to avoid a flash when moving between pages. */
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (_) {}
  const apply = theme => {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    document.querySelectorAll('.theme-switch').forEach(button => {
      button.setAttribute('aria-checked', String(dark));
      button.title = `Switch to ${dark ? 'light' : 'dark'} mode`;
      button.querySelector('.theme-label').textContent = dark ? 'Dark' : 'Light';
    });
  };
  apply(saved === 'light' || saved === 'dark' ? saved : preference.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelectorAll('.theme-switch').forEach(button => button.addEventListener('click', () => {
      saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(saved);
      try { localStorage.setItem('portfolio-theme', saved); } catch (_) {}
    }));
  });
  preference.addEventListener('change', event => {
    if (saved !== 'light' && saved !== 'dark') apply(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== 'portfolio-theme') return;
    saved = event.newValue;
    apply(saved === 'light' || saved === 'dark' ? saved : preference.matches ? 'dark' : 'light');
  });
})();
