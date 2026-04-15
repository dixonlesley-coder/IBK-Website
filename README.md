# IBK Website

Static marketing website for **PT. Indobangun Berjaya Konstruksi (IBK)** — a fully integrated design-build contractor based in Jakarta.

Plain HTML/CSS/JS. No build step. No framework. Just open `index.html` in a browser.

---

## Project structure

```
ibk-website/
├── index.html              ← homepage
├── projects/
│   └── rumah-lotus.html    ← Rumah Lotus project page
├── css/
│   ├── base.css            ← variables, reset, typography, buttons
│   ├── components.css      ← nav, cards, form, footer
│   └── pages.css           ← hero + page-specific layouts
├── js/
│   ├── i18n.js             ← bilingual ID/EN toggle (localStorage persistence)
│   ├── nav.js              ← scroll state + mobile hamburger
│   └── main.js             ← contact form → WhatsApp, smooth scroll
├── images/
│   ├── hero/               ← homepage hero background
│   ├── projects/           ← project card thumbnails
│   └── lotus/              ← Rumah Lotus page assets
└── README.md
```

---

## Running locally

No build required. Any static file server works:

```bash
# Python 3
python3 -m http.server 8000

# Node (if you have npx)
npx serve .

# Or just double-click index.html
```

Then visit `http://localhost:8000`.

---

## Configuration

### 1. WhatsApp number

The contact form and all WhatsApp links currently point to a **placeholder** number (`6281234567890` / `+62 812-3456-7890`). Replace it in **four places**:

| File | What to change |
|---|---|
| `js/main.js` | `var WA_NUMBER = '6281234567890';` → real digits only, with country code |
| `index.html` | Two `wa.me/6281234567890` links (in Contact section + Footer) + the display text `+62 812-3456-7890` |
| `projects/rumah-lotus.html` | One `wa.me/6281234567890?text=...` link in the CTA + one in the Footer + display text |

Format: country code + number, digits only. Example: `+62 812 3456 7890` → `6281234567890`.

### 2. Email address

Replace `hello@ibk-konstruksi.com` in `index.html` (contact + footer) and `projects/rumah-lotus.html` (footer).

### 3. Copy / content

All copy lives in two places:
- **Initial (Indonesian) HTML content** in `index.html` and `projects/rumah-lotus.html`
- **English translations** in `js/i18n.js` under the `translations.en` object

Edit a key in `i18n.js` and it updates everywhere that uses that `data-i18n` attribute. Any element with `data-i18n="some.key"` gets its `innerHTML` swapped on language change; `data-i18n-placeholder="some.key"` swaps the `placeholder` attribute.

---

## Image conventions

Drop images into the folders below using **exactly these filenames**. All images should be optimised JPGs (80–85% quality, ≤ 300 KB each). Use 2× for HiDPI if you want retina-sharp results.

### Homepage hero

| File | Target dimensions | Aspect | Notes |
|---|---|---|---|
| `images/hero/hero-bg.jpg` | **1920 × 1080** (2560 × 1440 for 2×) | 16:9 | Dark / moody, architectural detail. Displayed at 18% opacity over gold-tinted gradient — so mid-tones read best. |

### Project cards (homepage Projects section)

All project thumbnails should be **800 × 500 px** (16:10), lazy-loaded.

| File | Project |
|---|---|
| `images/projects/lotus-featured.jpg` | Rumah Lotus (displayed larger — upload **1400 × 900** min) |
| `images/projects/villa-semarang.jpg` | Villa Semarang |
| `images/projects/ruko-bintaro.jpg`   | Ruko Bintaro |
| `images/projects/kantor-tangerang.jpg` | Kantor Tangerang |
| `images/projects/rumah-bekasi.jpg`   | Rumah Bekasi |

### Rumah Lotus page

| File | Target dimensions | Aspect | Notes |
|---|---|---|---|
| `images/lotus/lotus-hero.jpg` | **1920 × 1080** | 16:9 | Displayed at 15% opacity over gradient — prioritise strong composition over detail. |

### Missing images

Broken images are auto-hidden (`main.js` has an `onerror` handler that sets opacity to 0). The gradient backgrounds underneath look intentional, so the site won't break if an image fails.

---

## Bilingual toggle (i18n)

- Default language: **Indonesian (ID)**
- Toggle in the top nav flips to **English (EN)**
- Choice is persisted in `localStorage` under key `ibk-lang`
- `<html lang="">` attribute updates on change (for screen readers / SEO)

To add a new translatable string:

1. Add the key+value to `translations.id` and `translations.en` in `js/i18n.js`
2. Add `data-i18n="your.key"` to the HTML element (its `innerHTML` gets swapped)
3. For `<input>`/`<textarea>` placeholders, use `data-i18n-placeholder="your.key"` instead

---

## Contact form

The form **does not POST anywhere**. On submit, it:

1. Reads the form fields
2. Formats a message in the user's active language (ID or EN)
3. Opens `https://wa.me/<NUMBER>?text=<encoded message>` in a new tab

No backend required, no third-party service, no keys to manage. The conversation lands directly in IBK's WhatsApp inbox.

---

## Deployment

### Netlify (recommended)

1. Push this repo to GitHub
2. Log into [netlify.com](https://netlify.com) → **Add new site** → **Import existing project**
3. Pick the GitHub repo
4. **Build command**: leave empty (no build step)
5. **Publish directory**: `.` (the repo root)
6. Deploy

Custom domain → Site settings → Domain management → Add custom domain. Netlify provisions HTTPS automatically.

### GitHub Pages

1. Push to GitHub
2. Repo → **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` (or whichever), folder `/ (root)`
5. Save → site goes live at `https://<user>.github.io/<repo>/` within ~1 minute

For a custom domain, add a `CNAME` file at the root containing just the domain (e.g. `ibk-konstruksi.com`) and point your DNS A/ALIAS records to GitHub's Pages IPs.

### Cloudflare Pages / Vercel / any static host

Same deal — point at the repo root, no build command, publish directory `.`.

---

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge — last 2 versions). Uses `backdrop-filter`, CSS custom properties, `aspect-ratio`, and `clamp()`. No transpilation.

---

## License

Proprietary — all content and design © PT. Indobangun Berjaya Konstruksi.
