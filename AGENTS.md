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

## The design — Letterpress Civic

One design, one route. `/` is the site; `/404` is the same press run at
smaller scale. `BaseLayout.astro` is the only layout: it imports the fonts and
all five stylesheets, and pages import it directly.

**The thesis, which every change should be checkable against:** the page is a
job printer's sheet, set on the American point system and pulled in three
passes.

### The three passes

| Pass | Ink | Carries |
| --- | --- | --- |
| 1 | `--color-navy` | the forme — heads, plates, rules of record, structure |
| 2 | `--color-brick(-strong)` | only what asks for attention — eyebrows, the slab capital, accent CTAs, the live element in a glyph |
| 3 | `--color-gold` | ornament only |

If a mark cannot be assigned a pass, it does not belong on the sheet.

**`--color-gold` is never text on paper.** It measures 2.06–2.41:1 on cream,
cream-deep and paper-hi. On paper it is rules, keylines, diamonds and star pins;
`--color-brass-ink` (5.30–5.63:1) is the gold-coloured ink that *can* carry
text there. On navy, gold is a legitimate ink at 5.48:1.

### One scale, one measure

Both live in `src/styles/themes/civic/system.css`, which is the source of truth
for every token.

- **Type** — `--t-6 … --t-60`, the traditional point sizes at 16px root = 12pt.
  Nothing is set at a size that is not one of these; fluid heads `clamp()`
  between two adjacent steps.
- **Space** — `--s-1 … --s-32`, multiples of the 6pt quad. Every margin,
  padding and gap resolves to one.
- **Tracking** — five steps, `--tr-text … --tr-eyebrow`, plus `--tr-deck` for
  the hero. **Ranged caps pair tracking with a matching `text-indent` only when
  the text is CENTRED** — the indent cancels the trailing letter-space so the
  line stays optically centred. On a *left-set* label it just shunts the text
  off the margin its own content aligns to; `.roster-office` and
  `.footer-col-head` are the reference cases.
- **Measure** — exactly two widths. `--lc-measure` (44rem) for documents and
  prose, `--lc-measure-wide` (68rem) for grids. Never a third. The hero frame
  and the reply card come out the same width on purpose; that is checkable
  (see below).
- **Greys** — `--color-ink-body` / `--color-ink-muted` on paper,
  `--color-cream-body` / `--color-cream-muted` on ink. Two each. Do not
  reintroduce ad-hoc `color-mix(… ink 79% …)` one-offs.

### The motif budget

Three motifs, and the budget is the point — a sheet with four competing
ornaments has none.

| Motif | What | Where |
| --- | --- | --- |
| 1 · pressed corner rule | ink hairline + gold hairline mitred short, four gold star pins, deboss | `.hero-frame` and `.nl-coupon` / `.nl-success` **only** — the two printed forms |
| 2 · deboss | the one inward shadow the sheet shares | anything raised off the stock |
| 3 · off-register pull | `--lc-offreg`, a gold ghost of the type slipped off the lay | the hero's main deck, the slab capital, the 404 number |

The **gold keyline** is the card device at every scale: 2.5px on top of the
value cards, involve cards and the navy plate, rotated to the leading edge on
the horizontal event cards, and standing alone on the roster plates.

The **ornamental rule** (hairlines tapering from the struck seal) appears once,
in the hero. Section heads use `.section-heading--plate` (centred, diamonds
flanking the eyebrow) or `--running` (ranged left, gold rule running to the
margin) instead. The **seal** appears twice: the hero, and its echo in the
colophon.

### Rules that keep it coherent

- **Components carry structural hooks and layout utilities only.** Colour,
  radius and typography belong in the theme CSS. Sections use `.section` +
  `.section-inner` / `.section-inner--measure`; they set no padding, no
  max-width and no gutter of their own.
- **No `<style>` blocks in components.** Everything is in the five stylesheets.
- Import `global.css` first (it carries `@import "tailwindcss"`), and never put
  `@import "tailwindcss"` in a partial. The theme partials are unlayered, which
  is how they beat Tailwind's `@layer utilities`.
- `global.css`'s `@theme` block and `system.css`'s `:root` declare the same
  palette. Keep them in sync; `system.css` wins and is the source of truth.
- **One icon language.** Glyphs are drawn as solid masses and converted to
  engraved contours by the `.g-fill` / `.g-line` / `.g-line-fill` / `.g-flame` /
  `.g-spark` ink roles. `modules.css` has the paper version, `engagement.css`
  the dark-plate version (the live element goes gold there — brick on navy is
  2.05:1).
- **SVG fragment ids come from `lib/uid.ts`, never from props.** Astro re-runs
  frontmatter per render, so a `let` inside an `.astro` file is not a counter.
  Two `<Seal size={30}>` used to emit the same `clipPath` id.
- **The impression** (`hero.css`) is the only animation. Every `opacity: 0`
  starting state lives *inside* `@media (prefers-reduced-motion: no-preference)`
  and every rule uses `animation-fill-mode: both`, so the default with no
  animation is the finished sheet. Declaring `opacity: 0` outside that guard
  would leave a reduced-motion reader with a blank hero.
- Placeholder content is marked as such: `officers.ts` ships `Name TBD`,
  `site.contact` ships `555-0100` and `P.O. Box 0000`. Leave obvious
  placeholders rather than inventing people or details.

### Verify

```sh
npm run build

# exactly one stylesheet per route
for f in dist/index.html dist/404.html; do
  echo "== $f"; grep -o 'rel="stylesheet" href="[^"]*"' "$f"
done

# no duplicate element ids (catches the Seal regression)
grep -o 'id="[^"]*"' dist/index.html | sort | uniq -d

# only Zilla Slab + Source Sans 3 ship
find dist -name '*.woff2' | sed 's#.*/##' | sort
```

Then run it — `astro dev --background` — and check the things a build cannot:
the hero frame and the reply card share a left edge, the impression fires once
and the second colour lands off register, `prefers-reduced-motion: reduce`
renders the hero complete and static, every control shows a focus ring (gold on
the navy plate and in the colophon, brick everywhere else), and the events list
filters to future dates with the empty state reachable.
