// A build-time unique id.
//
// Astro re-runs a component's frontmatter on every render, so a `let` inside
// an .astro file is NOT a counter — it resets each time. Module state does
// persist for the life of the build, which is what makes this work.
//
// Used for SVG fragment ids (clipPath, mask, gradient): those live in a single
// global namespace per document, so two instances of the same component MUST
// NOT derive an id from their props.

let n = 0;

export function uid(prefix: string): string {
  n += 1;
  return `${prefix}-${n}`;
}
