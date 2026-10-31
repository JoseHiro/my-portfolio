# iOS project galleries

Edit `../projects.js` to add or reorder projects and screens.

- Put public-facing images in `public/img/apps/`.
- Add UI screenshots to the project's `screens` array: `[filename, Japanese caption, English caption]`.
- `art` holds in-app artwork, clearly labelled separately from UI screenshots.
- `icon` and `cover` are image filenames; use `null` when an actual image isn't available.
- For a new project, copy an existing app HTML file to `<slug>.html`.
- Run `node scripts/build-pages.mjs` from the repository root to prepare GitHub Pages.

Do not put private repository URLs, user records, receipts, keys or personal data in these public galleries. Use demo data for screenshots.
