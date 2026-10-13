# Using this template

`gh repo create schemabotview/<slug> --public --template schemabotview/content-repo-template`

Then `npm install`, and make the swaps below. Every one of them is marked `SWAP:` in the file
itself, so `grep -rn 'SWAP' --exclude-dir=node_modules .` is the checklist in executable form.

`node scripts/init-template.mjs <slug> "<Subject>" <brand-hex>` does the mechanical ones for you.

## The swaps

| File | What changes |
| --- | --- |
| `package.json` | `name`, `description` |
| `vite.config.ts` | `base: '/<slug>/'` — must match the repo name, or Pages serves broken assets |
| `index.html` | `<title>` |
| `src/main.tsx` | `subject` (and `eyebrow`, if this repo wants one) |
| `src/theme.css` | `--brand`, `--brand-hover`, `--accent-2` — this repo's whole design surface |
| `public/favicon.svg` | `fill` (match `--brand`), the letter, the `aria-label` |
| `scripts/concept.json` | `concept`, `appPath`, `hashtags`, `panelBg` |
| `scripts/titles.json` | one entry per course |
| `README.md` / `CLAUDE.md` | the repo's own description, route contract and scene inventory |

`<slug>` is the GitHub repo name, the vite `base`, and the path under `graphl.in` — all three are
the same string, and they have to be.

## Then

1. **Delete the demo course**: `src/content/demo/`, `src/scenes/demo/`, `public/audio/demo/`, and
   their entries in `src/content/index.ts` and `src/scenes/index.ts`. It is there so a fresh clone
   builds and `npm run check` passes — not as content to keep.
2. **Enable Pages**: Settings → Pages → Source = **GitHub Actions**. The workflow deploys on every
   push to `main` but cannot create the Pages site itself, so until you do this the deploy job fails
   at `configure-pages` with `Get Pages site failed` — `npm ci` and `npm run build` having already
   passed. (That is also why the run on this template repo is red: a template is not a site, and
   nobody should enable Pages on it.)
3. **List the site** in `ui-graphl`'s `catalog.json` — one object is the whole listing.

## What is deliberately not here

- **No `file:../ui-flow`.** The packages are consumed by published version. A local path pin must
  never be committed — CI has no sibling checkout, and a pin is what stops one engine change from
  breaking fifteen sites at once.
- **No `src/App.tsx`, `SectionView`, `CourseIndex` or `SlidePanel`.** Those are withheld by
  `@graphlearning/shell` on purpose: the route contract (`#/<slug>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it only holds if every repo composes
  the pieces identically.
- **No `x` / `y` anywhere.** `computeLayout` is withheld by `@graphlearning/flow` for the same
  reason.
- **No `package-lock.json` edits by hand.** CI runs `npm ci`, which needs the lockfile committed and
  in agreement with `package.json`.
