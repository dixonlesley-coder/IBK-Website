# Maintaining the IBK Website

A zero-build static site — plain HTML, CSS, and vanilla JS. **Netlify auto-deploys on
every push** to the production branch (currently `claude/build-construction-website-Yzy4u`);
the live site updates in ~30–60s. No framework, no tooling, no database. Content edits
should take five minutes, not a deploy pipeline.

---

## Where things live

| Layer | Location |
|---|---|
| Design tokens, shared components, fonts | `assets/presisi.css` (see its `:root` for colours/type) |
| Shared behaviour (mobile menu, language pill) | `assets/presisi.js` |
| Per-page layout tweaks | a `<style>` block near the top of each page |
| Per-page behaviour + translations | an inline `<script>` near the bottom of each page |
| Homepage / Residential / Commercial | `index.html` · `residential.html` · `commercial.html` |
| Completed-projects grid + data | `proyek-selesai.html` (inline `PROJECTS` array) |
| Scope pages | `scope/*.html` (sheet system S-01…F-08) |
| Flagship project page | `projects/rumah-lotus.html` |
| Copy / spec reference | `CONTENT.md` |

There is **no `js/` or `css/` folder and no `projects.json`** — those belonged to an
earlier architecture and were removed. Styling is `assets/presisi.css` + per-page
`<style>`; each page owns its own translations inline.

---

## Editing copy

Text exists in two forms on each page:

1. **The Indonesian HTML** you can see directly in the markup.
2. **An inline translation dictionary** — `const I18N = { id:{…}, en:{…} }` in that
   page's `<script>`. On language switch, `setLang()` walks the page and swaps text.

An element pulls from the dictionary when it has a `data-i18n` attribute:

- `data-i18n="key"` → replaces the element's **text**
- `data-i18n-html="key"` → replaces the element's **innerHTML** (use for strings with markup)

**Rule:** every key under `id:` must also exist under `en:` (and vice-versa). After
editing, toggle **ID ⇄ EN** in the nav on that page and eyeball that nothing turns blank.
To change wording in both languages, edit the value under `id:` *and* `en:`; to change
the default Indonesian only, edit the visible HTML *and* the `id:` value (they should match).

---

## Changing contact details

All three appear on multiple pages (contact cards, footers, and inside each page's
`I18N` dict). Search-and-replace across the repo:

| What | Current value | How it appears |
|---|---|---|
| WhatsApp / phone | `+62 813-8979-8772` | every link is `wa.me/6281389798772`; search the digits **`6281389798772`** (links) and **`+62 813-8979-8772`** (display text) |
| Instagram | `@indobangun.official` | links to `https://www.instagram.com/indobangun.official/` — search **`indobangun.official`** |
| Office address | Pluit Karang Karya 3 Blok B Selatan no 26 | in contact cards, footers, and the i18n keys `footAlamat` / `pFootAlamat` / `ctChLocVal` / `ftAddr` |

When you change the phone number, update **both** the `wa.me/…` links **and** the
displayed `+62 …` text (they're separate). The residential contact form builds its
`wa.me` link in the page's inline script — the number is hard-coded there too.

---

## Adding / editing a completed project (portfolio grid)

The filterable grid on `proyek-selesai.html` is built from an inline array. Near the
top of its `<script>` find `const PROJECTS = [ … ]` and copy an existing entry:

```js
{
  title: "Rumah Lotus",
  sector: "RESIDENSIAL MEWAH · PIK 2, JAKARTA",   // uppercase eyebrow line
  prov: "DKI Jakarta",                            // province — MUST match a name in the PROVINCES list above (drives the filter)
  year: 2025, yearStart: 2025, yearEnd: 2026,     // year sorts the grid; start/end render the period
  value: 60, valueText: "IDR 60M",                // value (number, for sort) + display text; use value:null for undisclosed
  status: "proses",                               // "proses" = in progress, "selesai" = completed (sets the badge)
  img: "images/port-lotus.webp",                  // card thumbnail
  imgs: ["images/port-lotus.webp","images/lotus-card-2.webp","images/lotus-card-3.webp"], // lightbox gallery
  desc: "Design–build penuh – struktur, arsitektur dan MEP lengkap dalam satu kontrak."   // one-line card description
}
```

Add your images to `images/` first (see below). The counts shown on the page
(e.g. "19+ proyek") are copy in the `I18N` dict — bump them if needed.

---

## Adding a project detail page

Detail pages are **bespoke, self-contained** — there's no template generator. The
model is `projects/rumah-lotus.html`:

1. Copy it: `cp projects/rumah-lotus.html projects/<slug>.html`
2. Edit the copy — title, meta tags (incl. `canonical` + `og:url` for the new path),
   hero, stats, systems, gallery, and the inline `I18N` dict.
3. Link to it from wherever the project should appear (e.g. a card on
   `residential.html`/`commercial.html`, or the completed-projects grid).
4. Add it to `sitemap.xml` (copy a `<url>` block, set the new `loc`).

---

## Images

- Put files in `images/` and reference them relative to the site root.
- Use **optimised WebP** (photos ~q80, ≤ ~300 KB each). Hero images can be larger.
- Broken images fail gracefully — the dark gradients underneath read as intentional.
- If you add a share image, the Open Graph tag on each page points at
  `https://ibkonstruksi.com/images/og-cover.jpg`.

---

## Deployment & domain

- **Push to the production branch → Netlify builds & publishes** in ~30–60s.
- `netlify.toml` controls the publish directory and the HTTP **security headers**.
  ⚠️ The `Content-Security-Policy` there allows **same-origin + inline** only —
  if you ever add an external script, stylesheet, font, or embed, it will be
  **blocked** until you widen the CSP. Prefer self-hosting (drop the asset in
  `assets/` or `images/`).
- **Domain:** `ibkonstruksi.com` → **Cloudflare** DNS → Netlify origin
  (apex `A` → `75.2.60.5`, `www` `CNAME` → `rad-centaur-4bf880.netlify.app`).
  HTTPS is auto (Let's Encrypt via Netlify). If you ever proxy through Cloudflare
  (orange cloud), set Cloudflare SSL/TLS to **Full (strict)**, never "Flexible".

---

## Canonical specs (don't drift)

`CONTENT.md` holds the reference wording and technical specs (concrete grade, steel
reference, waterproofing, etc.) taken from the 2026 company profile
(`IBK_Company_Profile_2026.pdf`). Keep the site consistent with it.
