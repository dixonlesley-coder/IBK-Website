/* ============================================================
   main.js — contact form → WhatsApp, smooth scroll, image fallback
   ============================================================ */

(function () {
  'use strict';

  /* ── Config: IBK WhatsApp number ─────────────────────────
     Replace the digits below with the real IBK WhatsApp
     Business number. Format: country code + number, digits only.
     Example: '6281234567890'  (i.e. +62 812-3456-7890)
     ────────────────────────────────────────────────────── */
  var WA_NUMBER = '6281234567890';

  /* ── Contact form → WhatsApp redirect ──────────────────── */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (document.getElementById('contact-name')    || {}).value || '';
      var phone   = (document.getElementById('contact-phone')   || {}).value || '';
      var project = (document.getElementById('contact-project') || {}).value || '';
      var message = (document.getElementById('contact-message') || {}).value || '';

      var lang = document.documentElement.lang === 'en' ? 'en' : 'id';

      if (!name.trim()) {
        alert(lang === 'en'
          ? 'Please enter your name.'
          : 'Mohon masukkan nama Anda.');
        return;
      }

      var lines;
      if (lang === 'en') {
        lines = [
          'Hello IBK,', '',
          'Name: ' + name,
          phone   ? 'Phone: '        + phone   : null,
          project ? 'Project type: ' + project : null,
          message ? 'Details: '      + message : null,
          '',
          'I found you through your website.'
        ];
      } else {
        lines = [
          'Halo IBK,', '',
          'Nama: ' + name,
          phone   ? 'Nomor: '        + phone   : null,
          project ? 'Jenis proyek: ' + project : null,
          message ? 'Detail: '       + message : null,
          '',
          'Saya menemukan IBK melalui website.'
        ];
      }
      var text = lines.filter(function (l) { return l !== null; }).join('\n');

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* ── Smooth scroll for in-page anchor links ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Image fallback: hide broken <img> gracefully ──────── */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.opacity = '0';
    });
  });
})();
