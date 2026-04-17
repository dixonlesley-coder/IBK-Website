/* ============================================================
   project-page.js — renders a project detail page from JSON
   ------------------------------------------------------------
   A detail page sets <script>window.PROJECT_SLUG='<slug>';</script>
   before this script loads, and includes a <main data-project-page>
   root. This script fills in hero, stats, intro, and gallery, plus
   a click-to-open lightbox with keyboard nav.
   ============================================================ */

(function () {
  'use strict';

  var SLUG = window.PROJECT_SLUG;
  var root = document.querySelector('[data-project-page]');
  if (!SLUG || !root) return;

  var P = window.IBKProjects;   /* loader exposed by projects-grid.js */
  if (!P) {
    console.error('[project-page] projects-grid.js must load first');
    return;
  }

  var project = null;

  function render(lang) {
    if (!project) return;

    setText('[data-field="name"]',    project.name);
    setText('[data-field="eyebrow"]', P.pick(project.card_eyebrow, lang));
    setText('[data-field="intro"]',   P.pick(project.intro, lang));
    setText('[data-field="location"]', P.pick(project.location, lang));
    setText('[data-field="value"]',   P.pick(project.value_display, lang));
    setText('[data-field="scope"]',   P.pick(project.scope, lang));
    setText('[data-field="year"]',    project.year);
    setText('[data-field="owner"]',   project.owner || '—');
    setText('[data-field="brand"]',   project.brand || '—');
    setText('[data-field="standard"]', P.pick(project.standard, lang));

    /* Status pill copy */
    var statusEl = root.querySelector('[data-field="status"]');
    if (statusEl) {
      statusEl.textContent = project.status === 'completed'
        ? (lang === 'en' ? 'Completed' : 'Selesai')
        : (lang === 'en' ? 'In Progress' : 'Sedang Berjalan');
    }

    /* Labels (bilingual) */
    localiseLabels(lang);

    /* Hero image */
    var heroImg = root.querySelector('[data-field="hero-image"]');
    if (heroImg && project.hero_image) {
      heroImg.src = P.relPath(project.hero_image);
      heroImg.alt = project.name;
    }

    /* Page <title> */
    if (document.title && project.name) {
      document.title = project.name + ' — IBK';
    }

    renderGallery(lang);

    /* Hide fields with no value (e.g. owner/brand when absent) */
    hideEmpty();
  }

  function setText(selector, value) {
    root.querySelectorAll(selector).forEach(function (el) {
      if (value != null && value !== '') el.textContent = value;
    });
  }

  function localiseLabels(lang) {
    var LABELS = {
      id: {
        'value':    'Nilai Kontrak',
        'scope':    'Ruang Lingkup',
        'year':     'Periode',
        'location': 'Lokasi',
        'owner':    'Pemilik',
        'brand':    'Merek',
        'standard': 'Standar',
        'gallery':  'Galeri',
        'back':     'Kembali',
        'cta':      'Diskusi Proyek'
      },
      en: {
        'value':    'Contract Value',
        'scope':    'Scope',
        'year':     'Period',
        'location': 'Location',
        'owner':    'Owner',
        'brand':    'Brand',
        'standard': 'Standard',
        'gallery':  'Gallery',
        'back':     'Back',
        'cta':      'Discuss a Project'
      }
    };
    var L = LABELS[lang] || LABELS.id;
    root.querySelectorAll('[data-label]').forEach(function (el) {
      var key = el.getAttribute('data-label');
      if (L[key]) el.textContent = L[key];
    });
  }

  function hideEmpty() {
    root.querySelectorAll('[data-hide-if-empty]').forEach(function (el) {
      var target = el.querySelector('[data-field]');
      if (!target) return;
      var txt = (target.textContent || '').trim();
      if (!txt || txt === '—') el.style.display = 'none';
      else el.style.display = '';
    });
  }

  /* ── Gallery + lightbox ────────────────────────────────── */
  function renderGallery(lang) {
    var wrap = root.querySelector('[data-field="gallery"]');
    if (!wrap) return;

    var imgs = (project.gallery || []).map(P.relPath);
    if (!imgs.length) {
      wrap.style.display = 'none';
      return;
    }
    wrap.style.display = '';

    wrap.innerHTML = imgs.map(function (src, i) {
      return ''
        + '<button type="button" class="gallery__item" data-gallery-index="' + i + '" aria-label="Open photo ' + (i + 1) + '">'
        +   '<img src="' + src + '" alt="' + project.name + ' — ' + (i + 1) + '" loading="lazy">'
        + '</button>';
    }).join('');

    wrap.querySelectorAll('[data-gallery-index]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLightbox(imgs, parseInt(btn.getAttribute('data-gallery-index'), 10));
      });
    });
  }

  /* ── Lightbox ──────────────────────────────────────────── */
  var lb = null;
  var lbImgs = [];
  var lbIndex = 0;

  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML = ''
      + '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>'
      + '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous">&#10094;</button>'
      + '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next">&#10095;</button>'
      + '<figure class="lightbox__figure"><img class="lightbox__img" alt=""></figure>'
      + '<div class="lightbox__counter" aria-hidden="true"></div>';
    document.body.appendChild(lb);

    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { step(1); });

    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft')  step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    return lb;
  }

  function openLightbox(imgs, index) {
    ensureLightbox();
    lbImgs = imgs;
    lbIndex = index || 0;
    paintLightbox();
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lb) return;
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function step(delta) {
    if (!lbImgs.length) return;
    lbIndex = (lbIndex + delta + lbImgs.length) % lbImgs.length;
    paintLightbox();
  }

  function paintLightbox() {
    var img = lb.querySelector('.lightbox__img');
    var counter = lb.querySelector('.lightbox__counter');
    img.src = lbImgs[lbIndex];
    counter.textContent = (lbIndex + 1) + ' / ' + lbImgs.length;
    var navs = lb.querySelectorAll('.lightbox__nav');
    navs.forEach(function (n) { n.style.display = lbImgs.length > 1 ? '' : 'none'; });
  }

  /* ── Boot ──────────────────────────────────────────────── */
  P.load().then(function (manifest) {
    project = (manifest.projects || []).find(function (p) { return p.slug === SLUG; });
    if (!project) {
      root.innerHTML = '<p style="padding:4rem 1rem;text-align:center">Project not found: ' + SLUG + '</p>';
      return;
    }
    render(P.currentLang());
  }).catch(function (err) {
    console.error('[project-page] failed:', err);
  });

  document.addEventListener('langchange', function (e) {
    render((e.detail && e.detail.lang) || P.currentLang());
  });
})();
