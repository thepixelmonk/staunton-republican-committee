// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ── Deployment target (GitHub Pages) ──────────────────────────────────────
  // `site` is the full origin; `base` is the sub-path the site is served from.
  // All internal links/assets flow through import.meta.env.BASE_URL (see
  // src/data/site.ts → url()), so changing targets is just the two lines below.
  //
  //   • GitHub PROJECT page → https://<user>.github.io/<repo>/   ← current setup
  //       site: 'https://<user>.github.io',  base: '/<repo>'
  //   • Custom domain        → https://example.org/
  //       site: 'https://example.org'        (delete the `base` line)
  //       + add public/CNAME containing `example.org`
  //   • User/org root page   → https://<user>.github.io/  (repo named <user>.github.io)
  //       site: 'https://<user>.github.io'   (delete the `base` line)
  //
  // TODO: replace `example` with your GitHub username, and confirm the repo name.
  site: 'https://example.github.io',
  base: '/staunton-republican-committee',

  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});
