# Going live, and keeping it alive

Two parts. Part one you do once, in about forty minutes. Part two is the
answer to "what does owning this actually cost me."

---

# Part one — getting it online

The repository is already initialised and committed locally. Everything below
is on your side, because it needs credentials I don't have.

## 1. Fetch the fonts and commit them (2 min)

Do this **before** the first push. The GitHub Actions build does not download
fonts — that would make every deploy depend on Google being up.

```bash
cd ~/Projects/suchy_group/michalsuchocki/site
npm install
npm run fonts
git add public/fonts
git commit -m "Add self-hosted webfonts"
```

## 2. Create the repository (5 min)

You chose **private**. Note the cost: GitHub Pages from a private repository
requires **GitHub Pro**, currently around $4/month. If you would rather not pay
it, make the repo public — there is nothing secret in it, and drafts are marked
`draft: true` so they never publish either way.

On github.com → **New repository**:

- Name: `suchocki-ai` (or anything)
- Visibility: **Private**
- Do **not** add a README, .gitignore or licence — the repo already has them
  and GitHub's versions would collide

Then, in the `site` folder:

```bash
git remote add origin git@github.com:YOUR-USERNAME/suchocki-ai.git
git push -u origin main
```

If you have never pushed from this machine, GitHub will need an SSH key or a
personal access token. The friendliest route is
[GitHub Desktop](https://desktop.github.com) — it handles authentication for
you and gives you a visual diff before every commit, which fits how you said
you want to work.

## 3. Turn on Pages (2 min)

Repository → **Settings** → **Pages** → **Source: GitHub Actions**.

That is the only setting. Do not pick "Deploy from a branch" — the workflow in
`.github/workflows/deploy.yml` handles it.

Push anything, then watch the **Actions** tab. First build takes about ninety
seconds. When it goes green you have a live site at
`https://YOUR-USERNAME.github.io/suchocki-ai/`.

**Check that URL before touching DNS.** If the site is broken, you want to know
now, not while the domain is half-migrated.

## 4. Point the domain (10 min, then wait)

This is the step that touches live infrastructure, so read it twice.

**What you are changing:** four A records and one CNAME. **What you are not
changing:** nameservers, MX records, SPF/DKIM/DMARC. Mail on `michalsuchocki.com` is
untouched. That is the entire reason we picked GitHub Pages over Cloudflare.

In your DNS provider's panel (CyberFolks, or wherever `michalsuchocki.com` is managed):

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR-USERNAME.github.io.` |

Before you save: **screenshot the existing DNS records.** If anything goes
wrong you want to be able to put it back exactly, not from memory.

If an A record already exists on `@` pointing somewhere else, note where it
points before you replace it. Something may be using it.

Then GitHub → **Settings** → **Pages** → **Custom domain** → `michalsuchocki.com` →
Save. GitHub verifies the DNS, which usually takes minutes but the propagation
window is up to 24 hours.

## 5. Enforce HTTPS (1 min, after DNS resolves)

Once the custom domain shows a green tick, the **Enforce HTTPS** checkbox
becomes available. Tick it.

The certificate is Let's Encrypt, issued and renewed by GitHub automatically.
You will never think about it again — which is the specific thing the CyberFolks
option could not offer without a paid add-on.

The checkbox stays greyed out until the certificate is issued. If it is still
grey after an hour, DNS has not propagated yet. Wait, don't fiddle.

## 6. Verify (5 min)

- [ ] `https://michalsuchocki.com` loads, and `http://` redirects to it
- [ ] `https://www.michalsuchocki.com` redirects to the apex
- [ ] The fonts render — text should be Instrument Sans, not the system font
- [ ] `https://michalsuchocki.com/rss.xml` returns XML
- [ ] `https://michalsuchocki.com/sitemap-index.xml` exists
- [ ] Paste `https://michalsuchocki.com/training/` into
      [Google's Rich Results Test](https://search.google.com/test/rich-results)
      — it should find three `Course` items
- [ ] Paste the home page in — it should find `Person`
- [ ] Submit the sitemap in
      [Google Search Console](https://search.google.com/search-console)

---

# Part two — maintenance, honestly

## What this actually costs you

| | |
|---|---|
| Hosting | £0 |
| SSL | £0, renews itself |
| Astro licence | £0, MIT |
| GitHub Pro (for the private repo) | ~$4/month — avoidable by going public |
| Domain | Whatever you already pay |
| Your time | See below |

## The routine: publishing an essay

This is the only thing you will do regularly.

**Your part:** send me the text. In this Cowork folder, say something like
"new essay, here's the draft" and paste it. I create the `.mdx` file with the
right frontmatter, run the build to make sure it compiles, and commit.

**Your part again:** open GitHub Desktop, review the diff, click Push. Ninety
seconds later it is live, and it is in the RSS feed and the sitemap.

You never touch YAML, you never touch the terminal, and if I get the frontmatter
wrong the build fails before it can publish something broken.

**Writing it yourself instead**, if you prefer: copy an existing file in
`src/content/essays/`, change the frontmatter, write below it, push. Set
`draft: true` while it is unfinished — drafts render at `npm run dev` but are
excluded from the built site, the index, and the feed.

## What genuinely needs attention, and when

**Every few months — dependency updates.** Astro ships roughly monthly.

```bash
npm outdated          # see what moved
npm update            # patch and minor, safe
npm run build         # confirm it still builds
```

Major versions (Astro 5 → 6) are the only ones that can break things. Read the
migration note, or ask me and I will do it and verify the build.

Turning on **Dependabot** (Settings → Code security) makes GitHub open a pull
request when a dependency updates, and the Actions workflow builds it. If the
build is green, the update is safe. That is about as low-effort as maintenance
gets.

**Once a year — check nothing rotted.** Links go stale, the Forbes author page
moves, a conference site disappears. Fifteen minutes with the site open.

**Never — the server.** There isn't one. Nothing to patch, no PHP version to
worry about, no database to back up, no WordPress plugin waiting to be your
incident. This is the argument for static hosting, and for someone in your
line of work it is the argument that matters: the attack surface is a CDN
serving files.

## What can break, and what to do

**A push doesn't appear on the site.** Check the Actions tab. A red build means
the site did not deploy — the previous version is still live and unharmed. That
is the design: a broken build cannot take the site down.

**The build fails on an essay.** Almost always a frontmatter mistake — a missing
`date`, or `readingMinutes` written as text. The error names the file and the
field. This is the schema doing its job.

**The site is up but unstyled.** Fonts missing from `public/fonts/`. Run
`npm run fonts` and commit the result.

**The domain stops resolving.** Check the four A records first. GitHub's Pages
IPs have been stable for years, but they are the only external thing here that
could ever change.

## Your one lock-in risk, and it is small

The site is plain HTML in `dist/`. If GitHub Pages ever stops suiting you,
`npm run build` and upload that folder anywhere — CyberFolks, Netlify,
Cloudflare, a VPS. Nothing in the codebase is GitHub-specific except the
workflow file and the `CNAME`.

That was the point of choosing Astro over Lovable or a hosted builder. Your
content is `.mdx` files in a folder you own.

---

## Later, when you want it

- **HubSpot form on `/training/`** — replace the `mailto:` in
  `src/pages/training.astro`. Needs your HubSpot connector authorised in
  claude.ai settings, or just paste me the embed code.
- **Polish version** — `/pl/` is a placeholder. Astro has native i18n routing;
  it's a day of work once you decide whether to translate everything or only
  the essays.
- **Analytics** — if you want numbers, use something cookieless
  (Plausible, Fathom). It suits the site, and it avoids a consent banner.
- **Real portrait** — `/about/` has a placeholder block waiting for it.
