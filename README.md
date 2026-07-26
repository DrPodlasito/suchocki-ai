# suchocki.ai

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

The build output is plain static files. Nothing below is locked in — you can
switch hosts later by re-uploading `dist/`.

### Option A — Cloudflare Pages (recommended)

Free, automatic SSL, deploys on `git push`, preview URL per branch, and Pages
Functions if you ever want a server-side form handler.

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `site`
4. **Custom domains** → add `suchocki.ai`.

The one step with real blast radius: Cloudflare wants the domain's nameservers
pointed at them. That touches DNS for the whole domain, including mail. Before
you switch, export the existing zone file from your current registrar and check
that every MX and TXT record is reproduced on the Cloudflare side.

### Option B — CyberFolks (no DNS change)

You already pay for it, and nothing has to move.

1. `npm run build`
2. Upload the **contents** of `dist/` to `public_html/` over SFTP.
3. Enable SSL in the panel. Note that free Let's Encrypt there renews manually
   every 90 days unless you buy the auto-renew add-on.

Trade-off: no `git push` deploys and no preview URLs. Fine for a site that
changes monthly; irritating when you are fixing a typo at 11pm.

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
