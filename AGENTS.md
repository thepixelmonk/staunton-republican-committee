## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Design directions

Three directions ship, one per route, so each can differ in markup as well as
CSS:

| Route | Theme | Layout | Notes |
| --- | --- | --- | --- |
| `/` | `gothic` — Heartland Gothic | `GothicLayout.astro` | the canonical, indexed site |
| `/preview/civic/` | `civic` — Letterpress Civic | `CivicLayout.astro` | noindex |
| `/preview/capitol/` | `capitol` — Capitol Cream | `CapitolLayout.astro` | noindex |

`src/data/themes.ts` is the registry (labels, hrefs, `theme-color`, newsletter
microcopy). `ThemePreviewBar.astro` renders the switcher as plain `<a>` links —
no JS, no localStorage, so there is no flash of the wrong theme.

**Rules to keep the split working:**

- Each theme owns `src/styles/themes/<id>/{system,hero,modules,engagement}.css`,
  every selector prefixed `[data-theme='<id>']`, and declares its own colour and
  font tokens in `system.css`. `global.css` holds only the Tailwind `@theme`
  slots and shared base rules; it imports no fonts.
- **Only the layout wrappers import CSS and fonts.** `BaseLayout.astro` imports
  none. That is what keeps one theme's stylesheet and its two font families per
  route — verify with the isolation check below.
- Import `global.css` first in every wrapper (it carries
  `@import "tailwindcss"`), and never put `@import "tailwindcss"` in a partial.
- **No `<style>` blocks in `Hero*.astro` or `Newsletter.svelte`.** `Hero.astro`
  statically imports all three heroes, so a scoped style would ship on `/` too.
- Components carry structural hooks and layout utilities only. Colour, radius
  and typography belong to the theme CSS — otherwise all three themes have to
  fight the same utility.
- Capitol drives Fraunces' `opsz`/`SOFT`/`WONK` axes, so it imports
  `@fontsource-variable/fraunces/full.css` (the default entry is weight-axis
  only), and **every** `font-variation-settings: 'opsz' N` must be paired with
  `font-optical-sizing: none` or the browser overrides it.
- `--color-gold` fails AA as text on cream in all three palettes. It is for
  rules, fills and ornaments; use `--color-brass-ink` (light grounds) or
  `--color-brass-lit` (dark grounds) for gold-coloured text.

**Verify one theme's assets per route:**

```sh
npm run build
for f in dist/index.html dist/preview/civic/index.html dist/preview/capitol/index.html; do
  echo "== $f"; grep -o 'rel="stylesheet" href="[^"]*"' "$f"
done
```

**Removing the previews** once a direction is chosen — every preview-only file
is tagged, so `grep -rl 'PREVIEW-ONLY' src` returns the exact removal set:

```sh
rm -rf src/pages/preview \
       src/layouts/{Civic,Capitol}Layout.astro \
       src/styles/themes/{civic,capitol} \
       src/components/Hero{Civic,Capitol}.astro \
       src/components/ThemePreviewBar.astro
```

Then drop `<ThemePreviewBar />` and its import from `BaseLayout.astro`, collapse
`Hero.astro` to re-export the winning hero, reduce `src/data/themes.ts` to the
chosen direction, and remove the unused `@fontsource` deps. Nothing else in
`src/components/` needs touching — that is the payoff of keeping the rest of the
markup shared.
