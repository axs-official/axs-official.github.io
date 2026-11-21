# A-XS — Independent Systems Studio

Source for **axs-official.github.io**.

A-XS is an early-career developer building automation, AI-assisted tools, and interfaces — learning in public from Algeria.

> The public archive is held privately. The site is the studio dossier.

## Stack

- [Next.js 16](https://nextjs.org/) · [React 19](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framermotion.com/) — page and card animations
- [Three.js + @react-three/fiber + @react-three/drei](https://threejs.org/) — animated 3D sphere, orbital rings
- [Tailwind CSS](https://tailwindcss.com/) + [Manrope](https://rsms.me/manrope/) (self-hosted)
- GitHub Pages with a zero-dependency GitHub Actions build

No analytics, no cookies, no third-party scripts, no runtime CDN requests.

## Local development

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # preview production build
```

## Pages

- **Home** — animated hero with a 3D sphere and orbital rings
- **About** — stats and details, card-driven
- **Work** — selected projects (private archive, shown as a dossier)
- **Stack** — tools across languages, frontend, infra, and AI
- **Contact** — reach out, open to build

## Deployment

A GitHub Actions workflow in `.github/workflows/pages.yml` builds on every push to `main` and deploys `_site` to GitHub Pages.

```sh
npm run build
```

## License

Site content, design, and brand assets © A-XS. All rights reserved.

Typefaces are used under their respective open-source licenses.
