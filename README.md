# michalsuchocki.com

Personal site — built with [Astro](https://astro.build) (MIT, free), output as
static HTML with **zero JavaScript** on every page except the small inline
reveal-on-scroll script.

Translated from the Claude Design mockup (`Michal Suchocki Site.dc.html`),
achromatic as designed. The 311 inline styles in that export are normalised
into `src/styles/tokens.css` — that file is the single place to change colour,
type scale or spacing.

---

## Running it

```bash
cd site
npm install
npm run fonts     # downloads the two webfonts into public/fonts/ — do this once
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serve dist/ locally to check the real output
```

`npm run fonts` is optional. Without it the site still builds and renders; it
just falls back to `system-ui` and the platform monospace.

---

## Structure

```
src/
  content/essays/*.mdx     one file per essay — this is where you write
  content.config.ts        the essay schema; a missing date fails the build
  data/site.ts             identity, nav, outbound links
  data/courses.ts          the training catalogue
  layouts/Base.astro       <head>, JSON-LD, header/footer, reveal script
  components/              Header, Footer, Signal (the ABR waveform)
  pages/                   one file per route
  styles/tokens.css        ← every design value lives here
  styles/global.css        reset, fonts, shared primitives
```

### Routes

| URL | Source |
|---|---|
| `/` | `pages/index.astro` |
| `/writing/` | `pages/writing/index.astro` |
| `/writing/<slug>/` | `pages/writing/[...slug].astro` |
| `/training/` | `pages/training.astro` |
| `/ventures/` | `pages/ventures.astro` |
| `/speaking/` | `pages/speaking.astro` |
| `/about/` | `pages/about.astro` |
| `/pl/` | `pages/pl/index.astro` — placeholder |
| `/rss.xml`, `/sitemap-index.xml`, `/404` | generated |

---

## Writing an essay

Drop a `.mdx` file in `src/content/essays/`. The filename becomes the URL.

```yaml
---
title: Defence alone is a losing posture
summary: One or two sentences. Used on the index, in RSS, and as the meta description.
date: 2026-07-01
readingMinutes: 11
languages: [EN, PL]     # drives the "EN / PL" badge
notes:                  # optional numbered footnotes; <sup>1</sup> in the body
  - First note.
draft: false            # true → visible in dev, absent from production
---
```

The contents rail on the left builds itself from the `##` headings, so it can
never drift out of sync with the essay. Anchor IDs are slugified automatically
(`## The match analogy` → `#the-match-analogy`).

---

## Deploying

**GitHub Pages**, via `.github/workflows/deploy.yml`. Every push to `main`
builds and publishes; a failed build leaves the live site untouched.

Full click-by-click setup, DNS records, and the maintenance model are in
**[GO-LIVE.md](./GO-LIVE.md)**. The short version:

1. `npm run fonts` and commit `public/fonts/`
2. Push to a GitHub repo
3. Settings → Pages → Source: **GitHub Actions**
4. Add four A records for `michalsuchocki.com` at your existing DNS provider —
   nameservers and mail stay exactly where they are
5. Tick **Enforce HTTPS**

Nothing here is locked in. `npm run build` produces plain static files in
`dist/` that will serve from CyberFolks, Cloudflare, Netlify or a VPS. Only
`.github/workflows/deploy.yml` and `public/CNAME` are GitHub-specific.

---

## Wiring the enquiry form

`/training/` currently ends in a `mailto:` link. It works, but enquiries land
in your inbox rather than the CRM.

To route them into HubSpot instead:

1. HubSpot → Marketing → Forms → create a form → **Embed**.
2. Paste the embed snippet into `src/pages/training.astro`, replacing the block
   marked `TODO` in the `#enquire` section.

This works on either host — HubSpot handles the submission, so no backend is
needed and the hosting decision stays open.

---

## Before going live

See [GO-LIVE.md](./GO-LIVE.md) for the full runbook. Content decisions still
outstanding:

- [ ] `npm run fonts`, then commit `public/fonts/`
- [ ] Fill in the `TODO` URLs in `src/data/site.ts` (LinkedIn, X, Scholar, Forbes, Neurality)
- [ ] Review `src/data/courses.ts` — the durations, formats and audiences are
      proposals derived from your lectureships, not facts you confirmed
- [ ] Replace the portrait placeholder on `/about/`
- [ ] Finish or delete `signal-in-noise-twice.mdx` (currently `draft: true`)
- [ ] Decide whether `/pl/` stays a placeholder or gets real content
- [ ] Confirm `site` in `astro.config.mjs` matches the live domain — canonical
      URLs, the sitemap and RSS all derive from it

---

## Structured data

Three schema.org types are emitted, which is more than most consultant sites do:

- `Person` on `/` — the input Google uses for a Knowledge Panel
- `Course` × 3 on `/training/` — makes the training eligible for course-specific
  search results
- `BlogPosting` on each essay
- `Organization` × 3 on `/ventures/`

Validate after deploying at
[search.google.com/test/rich-results](https://search.google.com/test/rich-results).
