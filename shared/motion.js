// Gemeinsame Bewegung für alle drei Entwürfe.
// Im <head>: <script>document.documentElement.classList.add('js')</script>
// Ohne Script bleibt alles sichtbar.

// Einblenden beim Hineinscrollen, einmalig. Kinder mit [data-reveal] bekommen eine Staffelung.
(() => {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;
  targets.forEach((el) => {
    const group = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [el];
    el.style.setProperty('--d', `${Math.min(group.indexOf(el), 6) * 75}ms`);
  });
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  targets.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();
