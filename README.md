# aidah.dev

Personal site of Hadi Ahmad, EE + CS at the University of Minnesota: projects, case studies and a one-page datasheet.

Next.js (static export), TypeScript and Tailwind CSS, hosted on Cloudflare Workers.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Edit content

Everything on the site is rendered from `src/data/`:

- `projects.ts`: projects, metrics, block diagrams and case studies
- `profile.ts`: hero, education, experience, skills, contact and search metadata
- `datasheet.ts`: the characteristics table on the datasheet

## Routes

| Path | Page |
| --- | --- |
| `/` | All projects |
| `/hardware`, `/software` | The same page sorted for one discipline (`/hw` and `/sw` redirect here) |
| `/projects/<slug>` | Case study |
| `/datasheet` | One-page summary that prints to a single sheet |

## Deploy

```bash
npx wrangler deploy
```

This builds the site into `out/` and uploads it to Cloudflare. Pushes to `main` are built and deployed by Cloudflare automatically.
