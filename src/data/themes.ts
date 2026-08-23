// ─────────────────────────────────────────────────────────────────────────
// The three design directions.
//
// Each renders on its own route so the markup can differ where it must:
//   /                    → gothic  (the canonical, indexed site)
//   /preview/civic/      → civic   (noindex)
//   /preview/capitol/    → capitol (noindex)
//
// PREVIEW-ONLY entries are marked `preview: true`. When a direction is
// chosen, see AGENTS.md for the teardown recipe.
// ─────────────────────────────────────────────────────────────────────────
import { url } from './site';

export type ThemeId = 'gothic' | 'civic' | 'capitol';

/**
 * Newsletter microcopy + which ornament set the form ships.
 * The variant gates MARKUP (scissors, stamp, fold rule); everything else in
 * Newsletter.svelte is shared and restyled by CSS alone.
 */
export interface NewsletterCopy {
  variant: ThemeId;
  eyebrow: string;
  title: string;
  blurb: string;
  submitLabel: string;
  successStamp: string;
  successTitle: string;
  successBody: string;
}

export interface ThemeDef {
  id: ThemeId;
  label: string;
  /** One line for the preview bar. */
  blurb: string;
  /** base-aware and trailing-slashed, so GitHub Pages never has to redirect. */
  href: string;
  /** <meta name="theme-color"> — matches this theme's --color-navy. */
  themeColor: string;
  /** true → noindex, no canonical, no og:url. */
  preview: boolean;
  newsletter: NewsletterCopy;
}

export const DEFAULT_THEME: ThemeId = 'gothic';

// url() returns the base WITHOUT a trailing slash; normalise here rather than
// changing the shared helper (which would touch every page's markup).
const home = url();
const homeHref = home.endsWith('/') ? home : `${home}/`;

export const themes: Record<ThemeId, ThemeDef> = {
  gothic: {
    id: 'gothic',
    label: 'Heartland Gothic',
    blurb: 'WPA silkscreen poster',
    href: homeHref,
    themeColor: '#2c3e52',
    preview: false,
    newsletter: {
      variant: 'gothic',
      eyebrow: 'Sign & Send',
      title: 'Mail-In Membership Card',
      blurb:
        'Fill in your details below to get committee news, event invitations, and ways to help — straight to your inbox.',
      submitLabel: 'Mail It In',
      successStamp: 'Mailed',
      successTitle: "You're on the list!",
      successBody: 'Watch your inbox — committee news is on its way.',
    },
  },

  civic: {
    id: 'civic',
    label: 'Letterpress Civic',
    blurb: 'Pressed town broadside',
    href: url('preview/civic/'),
    themeColor: '#1f2a44',
    preview: true,
    newsletter: {
      variant: 'civic',
      eyebrow: 'Sign & Return',
      title: 'Committee Reply Card',
      blurb:
        'Add your name to the roll and we will send committee news, event notices, and ways to lend a hand.',
      submitLabel: 'Sign Me Up',
      successStamp: 'Received',
      successTitle: 'Thank you for joining.',
      successBody: 'Watch your inbox — committee news is on its way.',
    },
  },

  capitol: {
    id: 'capitol',
    label: 'Capitol Cream',
    blurb: 'Institutional document',
    href: url('preview/capitol/'),
    themeColor: '#1c2b4a',
    preview: true,
    newsletter: {
      variant: 'capitol',
      eyebrow: 'Correspondence',
      title: 'Subscribe to Committee Notices',
      blurb:
        'Committee news, meeting notices, and event announcements, sent as they are published.',
      submitLabel: 'Subscribe',
      successStamp: 'Recorded',
      successTitle: 'Your subscription is confirmed.',
      successBody: 'Notices will arrive at the address you provided.',
    },
  },
};

/** Display order in the preview bar — the canonical direction first. */
export const themeList: ThemeDef[] = [themes.gothic, themes.civic, themes.capitol];
