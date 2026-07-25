# Pratyush Singh — Portfolio

Personal portfolio site built with React, Vite, TypeScript, GSAP, and Framer Motion.

**Live site:** _add your deployed URL here_

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- GSAP (ScrollTrigger) for most scroll animations
- Framer Motion for the Featured Work scroll-scrubbed card stack
- Live data: GitHub contributions API, LeetCode (via a CORS-enabled mirror, falling back to a committed snapshot), Codeforces API, CodeChef (via a CORS-enabled mirror)

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build   # type-checks with tsc, then builds to dist/
npm run preview # serve the production build locally
```

## Deployment

This is a static single-page app — `npm run build` outputs a self-contained `dist/` folder that can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.).

**Vercel / Netlify**: import the repo, framework preset "Vite", build command `npm run build`, output directory `dist`. No environment variables are required.

**GitHub Pages**: if deploying under a repo subpath (`username.github.io/repo-name`), set `base: '/repo-name/'` in `vite.config.ts` before building.

### Keeping LeetCode data fresh

`public/data/leetcode.json` is a fallback snapshot used if the live LeetCode API mirror is rate-limited. Refresh it manually with:

```bash
node scripts/leetcode.cjs
```

`.github/workflows/leetcode.yml` runs this automatically once a day and commits the update.
