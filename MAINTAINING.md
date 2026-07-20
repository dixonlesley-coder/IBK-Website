# Maintaining the IBK Website

This site is a zero-build static site — plain HTML, CSS, and vanilla JS. Netlify auto-deploys on push. No framework, no tooling, no database. That's deliberate: content edits should take five minutes, not a deploy pipeline.

---

## Adding a New Project (5 min)

Every project on the site — the cards on `residential.html` and `commercial.html`, and its detail page with gallery — is powered by a **single entry** in `projects/projects.json`. Add the entry and the site picks it up.

### 1. Drop the images

Create a folder under `images/projects/`:

```
images/projects/<your-slug>/
├── hero.jpg        # large hero background (wide, ~2000px)
├── 01.jpg          # gallery image 1
├── 02.jpg          # gallery image 2
├── 03.jpg          # …add as many as you want
```

Use lowercase, hyphenated slug names (e.g. `villa-mega`, `office-tower-bsd`). No spaces. Photos should be compressed JPEGs (aim for ≤ 400 KB each).

### 2. Append an entry in `projects/projects.json`

Open `projects/projects.json` and add a new object inside the `"projects"` array. Copy any existing entry and edit the fields:

```json
{
  "slug": "villa-mega",
  "name": "Villa Mega",
  "tracks": ["residential"],
  "sector": "residential",
  "status": "completed",
  "year": "2024",
  "location":       { "id": "Cipete, Jakarta",    "en": "Cipete, Jakarta" },
  "value_display":  { "id": "IDR 18 Miliar",      "en": "IDR 18 Billion" },
  "value_short":    { "id": "IDR 18M",            "en": "IDR 18B" },
  "scope":          { "id": "Struktur + MEP",     "en": "Structure + MEP" },
  "card_eyebrow":   { "id": "Residensial · Cipete", "en": "Residential · Cipete" },
  "card_text":      { "id": "Satu paragraf pendek untuk kartu daftar.", "en": "A short paragraph for the list card." },
  "intro":          { "id": "Paragraf lebih panjang untuk halaman detail.", "en": "Longer paragraph for the detail page." },
  "hero_image": "images/projects/villa-mega/hero.jpg",
  "gallery": [
    "images/projects/villa-mega/01.jpg",
    "images/projects/villa-mega/02.jpg",
    "images/projects/villa-mega/03.jpg"
  ],
  "detail_page": "projects/villa-mega.html"
}
```

#### Required fields

| Field          | Example                                | Notes |
|----------------|----------------------------------------|-------|
| `slug`         | `"villa-mega"`                         | Unique, lowercase, hyphenated. |
| `name`         | `"Villa Mega"`                         | Display name on the card and hero. |
| `tracks`       | `["residential"]` / `["commercial"]`   | Which portfolio page(s) the card appears on. Use both for cross-listed flagships. |
| `sector`       | `residential`, `industrial`, `hospitality`, `commercial`, `healthcare`, `datacenter` | Internal label. |
| `status`       | `"in-progress"` or `"completed"`        | Sets the card badge. |
| `year`         | `"2024"` or `"2025–2026"`               | Free text. |
| `location`     | `{ id, en }`                           | Bilingual. |
| `value_display`| `{ id, en }`                           | Full value, shown on detail page. |
| `value_short`  | `{ id, en }`                           | Short form, shown on card. |
| `scope`        | `{ id, en }`                           | What IBK delivered. |
| `card_eyebrow` | `{ id, en }`                           | Small uppercase line above the card title. |
| `card_text`    | `{ id, en }`                           | 1–2 sentences on the card. |
| `intro`        | `{ id, en }`                           | Longer paragraph on the detail page. |
| `hero_image`   | `"images/projects/<slug>/hero.jpg"`    | Relative to site root. |
| `gallery`      | `[ "images/projects/<slug>/01.jpg", … ]` | Empty `[]` is OK — gallery section is hidden when empty. |
| `detail_page`  | `"projects/<slug>.html"`               | The URL the card links to. |

#### Optional fields

| Field      | Example                            | Notes |
|------------|------------------------------------|-------|
| `owner`    | `"PT. Layana Buana Hotelindo"`     | Client / building owner. Hidden on the detail page if omitted. |
| `brand`    | `"Hilton Hotels & Resorts"`        | Hotel brand, retailer, etc. Hidden if omitted. |
| `standard` | `{ id, en }`                       | Certification / reference standard. Hidden if omitted. |
| `featured` | `true`                             | Renders as the full-width hero card on residential. Only set true on **one** project per track. |

### 3. Create the detail page

Copy the template:

```bash
cp projects/_template.html projects/villa-mega.html
```

Open `projects/villa-mega.html` and change **line 2** only:

```html
<script>window.PROJECT_SLUG = 'villa-mega';</script>
```

That's it. Everything else — hero image, stats, gallery, intro, CTA — renders automatically from `projects.json`. Open it in a browser and it should work immediately.

### 4. Test locally

```bash
cd IBK-Website
python3 -m http.server 8000
```

Visit:

- `http://localhost:8000/residential.html` — new card should appear (if `tracks` includes `residential`)
- `http://localhost:8000/commercial.html` — new card should appear (if `tracks` includes `commercial`)
- `http://localhost:8000/projects/villa-mega.html` — detail page with gallery; click any photo to open the lightbox
- Toggle ID/EN in the nav and re-check everything

### 5. Commit and push

```bash
git add projects/projects.json projects/villa-mega.html images/projects/villa-mega/
git commit -m "feat: add Villa Mega project"
git push
```

Netlify deploys in ~30 seconds.

---

## Editing an Existing Project

Just edit its entry in `projects/projects.json` and commit. No need to touch the HTML — the detail page reads from the JSON on every load.

## Removing a Project

1. Delete the entry from `projects/projects.json`
2. Delete `projects/<slug>.html`
3. Optional: delete `images/projects/<slug>/`

Commit, push, done.

## Reordering Cards

The grid currently orders by `featured` first, then year descending. Change the `year` value if you need to bump a project up. For a manual order, edit `js/projects-grid.js` → `list.sort(...)`.

---

## Other Common Edits

| Want to change…                                         | Edit this file              |
|---------------------------------------------------------|-----------------------------|
| Hero copy, homepage sections, section titles            | `js/i18n.js` (find the key via `data-i18n="..."` in the HTML) |
| Residential page layout or sections                     | `residential.html`          |
| Commercial page layout or sections                      | `commercial.html`           |
| Homepage                                                | `index.html`                |
| Rumah Lotus flagship detail page (custom layout)        | `projects/rumah-lotus.html` |
| Card colors, typography, spacing tokens                 | `css/base.css`              |
| Card, hero, phil-table, button styles                   | `css/components.css`        |
| Commercial/residential/project page styles, lightbox    | `css/pages.css`             |
| WhatsApp number                                         | `js/main.js` → `WA_NUMBER`, plus every `wa.me/...` link in HTML |
| Contact Instagram, phone, or address in footer          | Each HTML file — search for `indobangun.official` / `6281389798772` |

## Bilingual Copy (i18n)

Every user-visible string lives in `js/i18n.js` as a key under both `id:` and `en:` blocks. HTML elements reference the key with `data-i18n="<key>"`.

**Rule**: if a key exists in `id`, the exact same key must exist in `en`. Run the parity check before committing:

```bash
python3 -c "
import re, pathlib
used = set()
for p in pathlib.Path('.').rglob('*.html'):
  used.update(re.findall(r'data-i18n(?:-placeholder)?=\"([^\"]+)\"', p.read_text()))
j = pathlib.Path('js/i18n.js').read_text()
id_keys = set(re.findall(r\"'([^']+)':\s*['\\\"]\", j[:j.index('en:')]))
en_keys = set(re.findall(r\"'([^']+)':\s*['\\\"]\", j[j.index('en:'):]))
print('used', len(used), 'id', len(id_keys), 'en', len(en_keys))
print('MISSING ID:', sorted(used - id_keys))
print('MISSING EN:', sorted(used - en_keys))
print('ORPHAN ID:', sorted(id_keys - used))
print('ORPHAN EN:', sorted(en_keys - used))
"
```

`proj.badge_progress` and `proj.badge_done` will show as "orphan" — that's expected. They're injected dynamically by `js/projects-grid.js` when rendering cards, so the static scanner doesn't see them.

## Canonical Specs (don't drift)

See `CONTENT.md` for the spec reference (K-400 concrete, TS-420 steel, triple-layer waterproofing, Zero Paint, etc.). These are the values in the 2026 company profile PDF — the site must match them exactly.

## Deployment

- **Development branch**: `claude/add-commercial-property-section-X4xTU`
- **Netlify watches**: `claude/build-construction-website-Yzy4u`
- **Production**: `main`

Each commit gets pushed to all three so Netlify can pick up the latest regardless of which branch it's watching.
