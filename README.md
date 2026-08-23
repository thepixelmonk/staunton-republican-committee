# Staunton Republican Committee

A single-page site for the Staunton Republican Committee, built with Astro and
deployed to GitHub Pages.

The design is **Letterpress Civic**: a job printer's sheet, set on the American
point system and pulled in three passes — navy for the forme, brick for the
second colour, gold for ornament. See [AGENTS.md](AGENTS.md) for the design
system and the rules that keep it coherent.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (use `astro dev --background` to detach) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Serve the built site locally |

## Content

All copy lives in three data files and is **placeholder** until the committee
replaces it:

- `src/data/site.ts` — name, nav, contact details, values, order of business,
  involvement cards, newsletter microcopy, imprint and disclaimer
- `src/data/events.ts` — upcoming events; past dates are filtered out at build
  time, so stale entries fall back to the empty state rather than advertising a
  day that has gone by
- `src/data/officers.ts` — the committee roster; ships `Name TBD`

Known placeholders to replace before launch: the phone number
(`(540) 555-0100`), the mailing address (`P.O. Box 0000`), both Facebook links
(they point at `facebook.com/`), and every officer name.

The newsletter form validates in the browser but **does not submit anywhere** —
GitHub Pages is static. To collect signups, POST to a hosted provider
(Mailchimp, Buttondown, Formspree) from `src/components/Newsletter.svelte`.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `master`. The deployment target is the two lines at the top of
`astro.config.mjs` (`site` and `base`) — see the comment there for custom
domains and user pages.
