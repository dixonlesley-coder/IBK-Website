/* PRESISI shared behaviors: mobile menu + language pill wiring.
   Each page defines its own setLang(lang) for i18n; the pill just calls it. */
(function () {
  var burger = document.querySelector('.p-burger');
  var menu = document.querySelector('.p-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? 'TUTUP' : 'MENU';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.textContent = 'MENU'; }
    });
  }
  document.querySelectorAll('.p-lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (typeof window.setLang === 'function') window.setLang(b.dataset.lang);
      document.querySelectorAll('.p-lang button').forEach(function (x) {
        x.classList.toggle('on', x === b);
      });
    });
  });
  // reflect stored language on load
  try {
    var saved = localStorage.getItem('ibk-lang') || 'id';
    document.querySelectorAll('.p-lang button').forEach(function (x) {
      x.classList.toggle('on', x.dataset.lang === saved);
    });
  } catch (e) {}
})();
