// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production domain shared by canonicals, the sitemap and the RSS feed.
export const SITE = 'https://michalsuchocki.com';

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
