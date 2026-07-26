// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Change this once the domain is live. Everything canonical,
// the sitemap and the RSS feed derive from it.
export const SITE = 'https://suchocki.ai';

export default defineConfig({
  site: SITE,
  integrations: [mdx(), sitemap()],
  build: {
    // Emit /about/index.html rather than /about.html so the site
    // works identically on Cloudflare Pages and on plain Apache.
    format: 'directory',
  },
  compressHTML: true,
});
