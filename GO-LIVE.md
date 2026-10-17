# Release runbook — michalsuchocki.com

## Hosting and domains

The personal website is deployed to Cloudflare Pages project `michalsuchocki`,
from GitHub repository `DrPodlasito/suchocki-ai`, branch `main`.

The build command is `npm run build`; the output folder is `dist`. Both
`michalsuchocki.com` and `www.michalsuchocki.com` are configured as custom domains.
The canonical site URL is `https://michalsuchocki.com`.

`suchocki.ai` is a separate consulting and training brand. This repository does
not deploy or redirect that domain. The contact address `michal@suchocki.ai`
is intentional; changing the mail provider is a separate operation.

## Prepare a release

1. Fetch the current GitHub state and work on a branch. Review local changes
   before pulling or switching branches on either the Mac or the server.
2. Run `npm ci`, `npm run check`, `npm run build`, and
   `python3 scripts/check_site.py`.
3. Push the branch, open or update its pull request, and inspect the Cloudflare
   Pages preview. Review the content as well as the code.
4. On desktop and mobile, check the English home, Polish home, biography,
   writing, ventures, speaking, teaching, and a missing-page URL. Check email
   links, language navigation, keyboard focus, fonts and overflow.
5. Approve and merge the reviewed release into `main`.
6. Verify that the Cloudflare production deployment reports success for the
   merged commit. Record its deployment URL and commit.

A passing build proves that the output was generated. Confirm the deployment
and public domains separately before reporting that the release is live.

## Public checks after deployment

- HTTPS works on the apex and `www` domains.
- `/` and `/pl/` display their corresponding languages.
- The contact address opens a mail composer with the correct recipient.
- `/rss.xml`, `/sitemap-index.xml`, `/favicon.svg`, and `/social-card.png` load.
- Draft essays are absent from production output and the feed.
- Canonicals point to the production domain. Only actual language counterparts
  have alternate-language metadata.
- Metadata and structured data describe the visible page.

## Rollback

In Cloudflare Pages, select the previously verified production deployment and
use its rollback action. Confirm its commit and both public domains. Follow up
with a reviewed revert or fix in Git so that the next build does not restore
the faulty change. No force-push is needed.

## DNS and email

A normal website release does not require DNS changes. For a future DNS or
mail-provider migration, first export the current zone and inventory all mail
records and services. Verify the new provider and migrate existing mail before
switching delivery. Test sending and receiving, including SPF, DKIM and DMARC,
separately from the website check. Store zone backups and credentials outside
this public repository.

## Maintenance

Review dependency updates in pull requests, run the same checks, and inspect
changed behaviour before merging. A successful build alone is not proof that
a dependency update is safe. Periodically review external links and contact
information.
