/**
 * Downloads the two webfonts into public/fonts/ so the site never calls
 * Google at runtime. Run once: `npm run fonts`
 *
 * Both faces are SIL Open Font License 1.1 — self-hosting is permitted.
 * Re-run only if you want newer font versions.
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/fonts');

// Google's CSS API returns different formats per user-agent. This one gets
// us the variable woff2 files rather than the static per-weight fallbacks.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const targets = [
  {
    name: 'instrument-sans-variable.woff2',
    css: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=swap',
  },
  {
    name: 'instrument-sans-italic-variable.woff2',
    css: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@1,400..700&display=swap',
  },
  {
    name: 'jetbrains-mono-variable.woff2',
    css: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..500&display=swap',
  },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });

  for (const t of targets) {
    const dest = resolve(outDir, t.name);
    if (await exists(dest)) {
      console.log(`· ${t.name} already present, skipping`);
      continue;
    }

    const cssRes = await fetch(t.css, { headers: { 'User-Agent': UA } });
    if (!cssRes.ok) throw new Error(`CSS fetch failed for ${t.name}: ${cssRes.status}`);
    const css = await cssRes.text();

    // Take the latin subset — the last @font-face block Google emits.
    const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
    if (urls.length === 0) throw new Error(`No woff2 URL found for ${t.name}`);

    const fontRes = await fetch(urls.at(-1), { headers: { 'User-Agent': UA } });
    if (!fontRes.ok) throw new Error(`Font fetch failed for ${t.name}: ${fontRes.status}`);

    await writeFile(dest, Buffer.from(await fontRes.arrayBuffer()));
    console.log(`✓ ${t.name}`);
  }

  console.log('\nFonts are in public/fonts/. Commit them.');
}

main().catch((err) => {
  console.error('\nFont download failed:', err.message);
  console.error('The site still builds — it falls back to system-ui and a system mono.');
  process.exitCode = 1;
});
