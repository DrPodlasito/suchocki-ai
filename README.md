# michalsuchocki.com

Personal website built with Astro. This repository serves **michalsuchocki.com**;
**suchocki.ai** is a separate brand and domain.

## Development

Use Node.js 22 LTS or a newer supported LTS release.

```sh
npm ci
npm run dev
npm run check
npm run build
python3 scripts/check_site.py
npm run preview
```

Fonts are self-hosted in `public/fonts/`. The optional `npm run fonts` command
refreshes them; a regular build does not contact Google Fonts.

## Structure

- `src/data/site.ts`: identity, contact details, navigation and profile links.
- `src/data/person.ts`: the shared Person schema with a stable identity URL.
- `src/pages/index.astro`: English home page.
- `src/pages/pl/index.astro`: Polish personal profile, projects, publications,
  speaking and contact. Links to English detail pages are labelled accordingly.
- `src/pages/about.astro`, `ventures.astro`, `speaking.astro`, `training.astro`:
  English detail pages. Training describes teaching topics, without unconfirmed
  course durations, prices, or scheduled sessions.
- `src/content/essays/`: essays in MDX. `draft: true` entries are excluded from
  the production site, writing index and RSS. Draft source remains visible in
  the Git repository, so never use it for private material.
- `src/components/Contact.astro`: shared English and Polish contact section.
- `src/styles/tokens.css`: colours, typography and spacing.
- `public/social-card.svg`: source artwork for the 1200×630 PNG social card.

The English and Polish home pages are language alternatives. English essays
only claim an English version until a real translated route is published.

## Deployment

Cloudflare Pages project **michalsuchocki** is connected to
**DrPodlasito/suchocki-ai**, with production branch **main**.

- Build command: `npm run build`
- Output directory: `dist`
- Custom domains: `michalsuchocki.com` and `www.michalsuchocki.com`
- Branch builds can provide a preview before a production merge.

Cloudflare hosts the website. Email is managed separately; its provider is not
changed by a site build. See [GO-LIVE.md](GO-LIVE.md) for release and rollback.

## Publishing an essay

Create an MDX file in `src/content/essays/`:

```yaml
---
title: A specific title
summary: One or two sentences about the argument.
date: 2026-10-17
readingMinutes: 5
languages: [EN]
draft: true
---
```

Preview the draft locally, review its text and sources, then set `draft: false`.
Run the checks above and publish through a reviewed pull request. Set language
badges only for translations that actually exist.

## Verification

`npm run check` validates Astro templates and TypeScript. `npm run build`
generates the production output. `scripts/check_site.py` checks that all local
links, fragments and assets resolve, each page has a language and a single main
heading, and public pages contain no empty links or leftover placeholders.
The GitHub workflow runs these checks on pull requests and pushes.

Before publishing, inspect desktop and mobile layouts, keyboard navigation,
the English/Polish switch, contact links, and social metadata. External sites
may restrict automated access; their identity and link targets need a separate
review.
