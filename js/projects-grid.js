/* ============================================================
   projects-grid.js — renders project cards from projects.json
   ------------------------------------------------------------
   Usage on a page: add a container like
     <div class="projects-grid" data-projects-grid data-track="residential"></div>
   Optional attributes:
     data-track      "residential" | "commercial"   — filter by track (default: all)
     data-limit      number                         — cap cards (default: all)
     data-featured   "first"                        — render the featured card as full-width
   ============================================================ */

(function () {
  'use strict';

  var MANIFEST = null;      /* cached after first fetch */
  var MANIFEST_PROMISE = null;

  /* ── Locate manifest relative to the current page ──────── */
  function manifestURL() {
    /* residential.html / commercial.html / index.html sit at root;
       detail pages sit in /projects/. This resolves both cases. */
    var path = window.location.pathname;
    if (/\/projects\/[^/]*$/.test(path)) return 'projects.json';
    return 'projects/projects.json';
  }

  function loadManifest() {
    if (MANIFEST) return Promise.resolve(MANIFEST);
    if (MANIFEST_PROMISE) return MANIFEST_PROMISE;
    MANIFEST_PROMISE = fetch(manifestURL(), { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('projects.json ' + r.status);
        return r.json();
      })
      .then(function (json) {
        MANIFEST = json;
        return json;
      })
      .catch(function (err) {
        console.error('[projects-grid] failed to load manifest:', err);
        MANIFEST_PROMISE = null;
        throw err;
      });
    return MANIFEST_PROMISE;
  }

  /* ── Path resolution for links/images from any depth ───── */
  function relPath(p) {
    if (!p) return '';
    if (/^(https?:)?\/\//.test(p) || p.charAt(0) === '/') return p;
    var inSub = /\/projects\/[^/]*$/.test(window.location.pathname);
    return inSub ? '../' + p : p;
  }

  function currentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'id';
  }

  function pick(field, lang) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.id || field.en || '';
  }

  /* ── Render a single card ──────────────────────────────── */
  function cardHTML(p, lang, isFeatured) {
    var href    = relPath(p.detail_page);
    var img     = relPath(p.hero_image);
    var eyebrow = pick(p.card_eyebrow, lang);
    var text    = pick(p.card_text, lang);
    var value   = pick(p.value_short, lang);
    var badgeKey = p.status === 'completed' ? 'proj.badge_done' : 'proj.badge_progress';
    var badgeFallback = p.status === 'completed'
      ? (lang === 'en' ? 'Completed' : 'Selesai')
      : (lang === 'en' ? 'In Progress' : 'Dalam Proses');
    var badgeClass = p.status === 'completed'
      ? 'project-card__badge project-card__badge--done'
      : 'project-card__badge';

    var classes = 'project-card' + (isFeatured ? ' project-card--featured' : '');
    var valueMarkup = value
      ? '<span class="project-card__value">' + value + '</span>'
      : '';

    return ''
      + '<article class="' + classes + '">'
      +   '<a class="project-card__link" href="' + href + '" aria-label="' + escapeAttr(p.name) + '">'
      +     '<div class="project-card__img-wrap">'
      +       '<img src="' + img + '" alt="' + escapeAttr(p.name) + '" class="project-card__img" loading="lazy">'
      +       '<span class="' + badgeClass + '" data-i18n="' + badgeKey + '">' + badgeFallback + '</span>'
      +     '</div>'
      +     '<div class="project-card__body">'
      +       '<p class="project-card__type">' + eyebrow + '</p>'
      +       '<h3 class="project-card__title">' + escapeHTML(p.name) + '</h3>'
      +       '<p class="project-card__text">' + text + '</p>'
      +       valueMarkup
      +     '</div>'
      +   '</a>'
      + '</article>';
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escapeAttr(s) {
    return escapeHTML(s).replace(/"/g, '&quot;');
  }

  /* ── Render all [data-projects-grid] on the page ───────── */
  function renderGrid(container, manifest) {
    var track    = container.getAttribute('data-track') || '';
    var limit    = parseInt(container.getAttribute('data-limit'), 10) || 0;
    var feature  = container.getAttribute('data-featured') === 'first';
    var lang     = currentLang();

    var list = (manifest.projects || []).filter(function (p) {
      if (!track) return true;
      return Array.isArray(p.tracks) && p.tracks.indexOf(track) !== -1;
    });

    /* Put featured projects first, then reverse-chronological by year string */
    list.sort(function (a, b) {
      var af = a.featured ? 0 : 1;
      var bf = b.featured ? 0 : 1;
      if (af !== bf) return af - bf;
      return String(b.year || '').localeCompare(String(a.year || ''));
    });

    if (limit > 0) list = list.slice(0, limit);

    var html = list.map(function (p, i) {
      return cardHTML(p, lang, feature && i === 0 && p.featured);
    }).join('');

    container.innerHTML = html || '<p class="projects-grid__empty">—</p>';
  }

  function renderAll() {
    var grids = document.querySelectorAll('[data-projects-grid]');
    if (!grids.length) return;
    loadManifest().then(function (manifest) {
      grids.forEach(function (g) { renderGrid(g, manifest); });
      /* Let i18n.js translate any data-i18n badges we just inserted */
      if (typeof window.dispatchEvent === 'function') {
        document.dispatchEvent(new CustomEvent('projects-rendered'));
      }
      /* Apply current-language badges by re-running setLang indirectly: */
      var currentBtn = document.getElementById('lang-' + currentLang());
      if (currentBtn) {
        /* no-op: badges already carry data-i18n, i18n.js reapplies on langchange */
      }
    }).catch(function () {
      grids.forEach(function (g) {
        g.innerHTML = '<p class="projects-grid__empty">Unable to load projects.</p>';
      });
    });
  }

  /* ── Re-render badges when the user toggles language ───── */
  document.addEventListener('langchange', function () {
    if (!MANIFEST) return;
    document.querySelectorAll('[data-projects-grid]').forEach(function (g) {
      renderGrid(g, MANIFEST);
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }

  /* Expose for other scripts (project-page.js shares the loader) */
  window.IBKProjects = {
    load: loadManifest,
    relPath: relPath,
    currentLang: currentLang,
    pick: pick
  };
})();
