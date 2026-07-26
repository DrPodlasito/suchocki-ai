# Fonts

This folder should contain three files:

- `instrument-sans-variable.woff2`
- `instrument-sans-italic-variable.woff2`
- `jetbrains-mono-variable.woff2`

They are not committed yet. Get them with:

```bash
npm run fonts
```

Both families are SIL Open Font License 1.1, so self-hosting is allowed — and
preferable. It removes a third-party request from every page load, avoids the
GDPR question that comes with Google Fonts serving from a US IP, and makes the
site render identically offline.

If the files are missing the site still builds and looks close to right; the
`@font-face` rules use `font-display: swap` and the CSS stacks fall back to
`system-ui` and the platform monospace.
