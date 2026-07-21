# IBK Website

Static marketing website for **PT. Indobangun Berjaya Konstruksi (IBK)** — a fully
integrated design-build contractor based in Jakarta.

Plain HTML/CSS/JS, **no build step, no framework**. Every page is self-contained and
loads one shared stylesheet + one shared script. Live at **https://ibkonstruksi.com**.

---

## Project structure

```
IBK-Website/
├── index.html                 ← homepage
├── residential.html           ← Residential (luxury homes)
├── commercial.html            ← Commercial (industry / hospitality / data centres)
├── proyek-selesai.html        ← Completed Projects (filterable portfolio grid)
├── scope/                     ← 8 scope pages, drawing-sheet system S-01…F-08
│   ├── struktur.html   arsitektur.html   elektrikal.html   hvac.html
│   └── plumbing.html   furnitur.html     lighting-smart-home.html   interior-build.html
├── projects/
│   └── rumah-lotus.html       ← flagship project detail page (bespoke layout)
├── assets/
│   ├── presisi.css            ← shared PRESISI design system (tokens + components)
│   ├── presisi.js             ← shared behaviour (mobile menu + language toggle)
│   ├── favicon.svg
│   └── fonts/                 ← self-hosted Archivo Variable + IBM Plex Mono (.woff2)
├── images/                    ← optimised WebP imagery
├── 404.html                   ← branded not-found page
├── netlify.toml               ← publish dir + security headers + caching
├── robots.txt  ·  sitemap.xml
├── CONTENT.md                 ← copy & spec reference (source of truth for wording)
├── IBK_Company_Profile_2026.pdf
├── README.md  ·  MAINTAINING.md
```

There is **no bundler, package.json, or `js/`/`css/` folder** — styling lives in
`assets/presisi.css` plus a small `<style>` block per page, and behaviour lives in
`assets/presisi.js` plus a small inline `<script>` per page.

---

## Running locally

Any static file server works — no build:

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

(Or `npx serve .`, or just open `index.html`.)

---

## Design system — PRESISI

The look is driven by `assets/presisi.css`: a "drawing set becomes the interface"
system with sheet numbers (LBR / SHT codes), dimension lines, and title-block
metadata. Colour + type tokens live in its `:root`:

- `--beton` `#EAE8E2` (paper), `--ink` `#0D1B2E` (dark chapters)
- `--red` `#D5372D` (annotation), `--brass` / `--brass-bright` (actions)
- Type: **Archivo Variable** (display) + **IBM Plex Mono** (labels), both self-hosted

Everything is self-hosted — the site makes **no external requests at runtime**
(no Google Fonts, no CDNs). Keep it that way; the Content-Security-Policy in
`netlify.toml` blocks external scripts/styles/fonts.

---

## Bilingual toggle (ID / EN)

- Default language **Indonesian (ID)**; the nav pill flips to **English (EN)**.
- Each page carries its **own** `const I18N = { id:{…}, en:{…} }` in an inline
  `<script>`, plus a `setLang()` assigned to `window.setLang`. `assets/presisi.js`
  wires the pill buttons to it.
- Elements use `data-i18n="key"` (swaps text) or `data-i18n-html="key"` (swaps
  markup). Choice persists in `localStorage` under `ibk-lang`; `<html lang>` updates.

See **MAINTAINING.md** for how to add or edit strings.

---

## Contact details

Current values (used across every page and in each page's `I18N` dict):

- **WhatsApp / phone:** `+62 813-8979-8772` → all links use `wa.me/6281389798772`
- **Instagram:** `@indobangun.official` → `https://www.instagram.com/indobangun.official/`
- **Office:** Pluit Karang Karya 3 Blok B Selatan no 26

The contact form (on `residential.html`) does **not** POST anywhere — on submit it
opens a pre-filled `wa.me` link in a new tab. No backend, no keys. See MAINTAINING.md
to change any of these.

---

## Deployment

Hosted on **Netlify**, which **auto-deploys on every push** to the production
branch (currently `claude/build-construction-website-Yzy4u`) — live in ~30–60s.

- `netlify.toml` sets the publish directory (`.`) and the security headers
  (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) +
  long-cache headers for fonts/images.
- **Domain:** `ibkonstruksi.com` — DNS runs through **Cloudflare** (apex `A` → Netlify
  `75.2.60.5`, `www` `CNAME` → `rad-centaur-4bf880.netlify.app`); Netlify issues the
  Let's Encrypt certificate automatically.

Any static host can serve the files, but the security headers are Netlify-specific
(`netlify.toml`), so Netlify is the supported path.

---

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge — last 2 versions). Uses CSS
custom properties, `clamp()`, `aspect-ratio`, variable fonts, and view transitions.
No transpilation.

---

## License

Proprietary — all content and design © PT. Indobangun Berjaya Konstruksi.
