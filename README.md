# A-XS — axs-official.github.io

Source for the A-XS studio site: an independent systems studio working across
language design, native software, and interfaces. The public archive is held
privately; the site is the studio dossier.

## Stack

- [Eleventy 3](https://www.11ty.dev/) with Nunjucks templates
- Hand-written CSS; self-hosted WOFF2 typefaces (Bodoni Moda, Newsreader, IBM Plex Mono)
- Minimal vanilla JavaScript for theme, menu, clock, and scroll progress
- No analytics, cookies, third-party scripts, or runtime CDN requests
- Deployed to GitHub Pages with GitHub Actions

## Local development

```sh
npm install
npm run serve
```

The site is served at `http://localhost:8080`.

```sh
npm run build   # production build to _site/
npm run brand   # regenerate hero, OG, avatar, and favicon assets
npm run audit   # axe-core and responsive checks (requires `npx playwright install chromium`)
npm run links   # verify internal links against the built site or BASE_URL
```

## Structure

```
src/
  _data/site.js          brand, navigation, and contact data
  _includes/             base, header, footer
  assets/                CSS, JS, fonts, SVG plates
  *.njk                  page templates
  static/                passthrough files (manifest, .nojekyll)
.github/workflows/       Pages deployment
scripts/                 brand asset generation and QA
```

## Editorial rules

- **A-XS only.** No legal name, personal email, or personal social accounts.
- **No public project names, screenshots, or private repository links.** The archive
  is represented as a private dossier, not as a project gallery.
- **No claims without a method.** Keep measurements and limits explicit when a
  project is eventually published.
- **LinkedIn is optional.** Set `linkedin` and `linkedinHandle` in `src/_data/site.js`
  to enable the conditional links; nothing is displayed while the value is empty.

## Deployment

Live at [axs-official.github.io](https://axs-official.github.io).

The workflow in `.github/workflows/pages.yml` builds on every push to `main` and
deploys `_site` to GitHub Pages. In the repository settings, **Pages → Source** is
set to **GitHub Actions**.

## License

Site content, design, and brand assets © A-XS. All rights reserved. Typefaces are
used under their respective open-source licenses.
