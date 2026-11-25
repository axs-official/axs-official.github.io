# axs — personal site

Source for **[axs-official.github.io](https://axs-official.github.io)** and its
[links page](https://axs-official.github.io/links).

A portfolio: Next.js App Router, exported to static HTML, served by GitHub Pages. Nothing on
the page talks to a third party — no analytics, no cookies, no CDN, no remote fonts.

## Routes

| Route      | What it is                                                                         |
| ---------- | ---------------------------------------------------------------------------------- |
| `/`        | 3D hero, intro, toolchain, contribution map, selected work, contact                 |
| `/about`   | Who I am, what I work on, how I work                                                |
| `/work`    | Selected builds, plus the private archive                                           |
| `/stack`   | Tools grouped by what I use them for, with honest levels                            |
| `/contact` | Message box (opens the visitor's mail app), direct email, GitHub                    |
| `/links`   | Link-in-bio page: the handful of links worth clicking, plus a short FAQ             |

## Stack

- Next.js 16 (App Router, `output: 'export'`) · React 19 · TypeScript
- Tailwind CSS, with Space Grotesk and IBM Plex Mono self-hosted from `@fontsource`
- Three.js + `@react-three/fiber` + `drei` for the hero planet, rings and starfield
- Framer Motion for entrance and menu animation
- Deployed by the workflow in `.github/workflows/pages.yml`

## Layout

```
src/
  app/                 routes; layout.tsx owns metadata, Nav and Footer
    about/ work/ stack/ contact/ links/
    globals.css        design tokens and the few shared classes
  components/          Nav, Hero, page sections, cards, forms
  data/site.ts         every link, label and line of copy, in one file
  data/contributions.json
public/                fonts, video loops, poster image
scripts/               contribution fetch + internal link checker
```

Most copy lives in `src/data/site.ts`. Change it there rather than inside components — the nav,
the mobile menu and the footer all read `navLinks` from that file.

## Local development

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
npm run lint
```

Node 22 (see `.nvmrc`).

## Contribution data

`src/data/contributions.json` is pulled from the GitHub GraphQL API and committed, so builds stay
offline:

```sh
GH_TOKEN=... node scripts/fetch-contributions.mjs > src/data/contributions.json
```

Re-run it when the numbers should move. The home page and about page read the file directly; no
client-side requests.

## Checking links

```sh
npm run build
BASE_URL=https://axs-official.github.io node scripts/check-links.mjs
```

It walks `out/`, collects internal `href` and `src` values, and reports anything that does not
answer 200.

## Privacy

- No analytics, no cookies, no trackers, no third-party embeds.
- Fonts and video are self-hosted; the page fetches nothing from another origin.
- The contact form is a `mailto:` composer: it opens the visitor's own mail app and posts nothing.
- The email address is assembled in the browser instead of being written into the HTML.
- Location stays at country level, and no photo, phone number or full name is published.

## Deployment

Push to `main`. The workflow installs dependencies, runs `npm run build`, and publishes `out/` to
GitHub Pages; Pages must be set to **GitHub Actions** as its source. Build output is not tracked —
`out/` and `.next/` are ignored.

## Profile cards

The animated cards on [github.com/axs-official](https://github.com/axs-official) live in their own
repository, [axs-official/axs-official](https://github.com/axs-official/axs-official), next to the
Python script that generates them. They reuse the same contribution data and vocabulary as this
site.

## License

Site content and design © axs. Typefaces are used under their open-source licenses.
