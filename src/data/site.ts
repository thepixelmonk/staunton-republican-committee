// ─────────────────────────────────────────────────────────────────────────
// Central site configuration + content.
// Everything here is PLACEHOLDER copy for the committee to replace.
// ─────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export type SocialIcon = 'facebook' | 'x' | 'instagram' | 'youtube';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface ValueItem {
  title: string;
  body: string;
}

export interface BusinessItem {
  title: string;
  body: string;
}

export interface InvolvementItem {
  title: string;
  body: string;
  cta: NavItem;
}

/** Newsletter microcopy. The form itself lives in Newsletter.svelte. */
export interface NewsletterCopy {
  /** Small label at the head of the card — not a heading; the section owns that. */
  eyebrow: string;
  blurb: string;
  submitLabel: string;
  successStamp: string;
  successTitle: string;
  successBody: string;
}

/**
 * Join the configured base path with an internal path so links/assets resolve
 * correctly under ANY GitHub Pages target (project page, custom domain, root).
 * `import.meta.env.BASE_URL` already reflects `base` from astro.config.mjs.
 *
 *   url()             → site root (respecting base)
 *   url('favicon.svg')→ <base>/favicon.svg
 *   url('#events')    → '#events' (in-page anchors pass through untouched)
 *
 * NOTE: only use this for hand-written links and string paths into /public.
 * Imported assets (import x from '...') and <Image/> get the base automatically.
 */
export function url(path = ''): string {
  if (path.startsWith('#') || /^https?:\/\//.test(path) || path.startsWith('mailto:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path) return base || '/';
  return `${base}/${path.replace(/^\//, '')}`;
}

export const site = {
  name: 'Staunton Republican Committee',
  shortName: 'SRC',
  city: 'Staunton, Virginia',
  tagline: 'Conservative values, local roots, and a stronger Staunton.',
  description:
    'The Staunton Republican Committee champions conservative principles, supports local candidates, and brings neighbors together to build a stronger future for Staunton, Virginia.',

  // In-page anchor navigation (single-page site)
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Committee', href: '#committee' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  primaryCta: { label: 'Get Involved', href: '#get-involved' } as NavItem,

  // Add more channels here and they render automatically in the footer.
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  ] as SocialLink[],

  contact: {
    email: 'info@stauntonrepublicans.org',
    phone: '(540) 555-0100',
    mailing: 'P.O. Box 0000, Staunton, VA 24402',
  },

  meeting: {
    cadence: 'Monthly Committee Meeting',
    when: 'Second Tuesday of every month · 6:30 PM',
    where: 'Staunton, VA · location announced before each meeting',
  },

  // "Who We Are" principles grid
  values: [
    {
      title: 'Liberty',
      body: 'We defend individual freedom, constitutional rights, and limited, accountable government.',
    },
    {
      title: 'Community',
      body: 'We invest in our neighbors, our schools, and the local traditions that make Staunton home.',
    },
    {
      title: 'Opportunity',
      body: 'We support small business, lower taxes, and the conditions for hard work to be rewarded.',
    },
    {
      title: 'Integrity',
      body: 'We stand for honest, transparent leadership that answers to the people it serves.',
    },
  ] as ValueItem[],

  // "Order of Business" — the committee's standing duties. Not a sequence, so
  // the section renders as a ruled list rather than numbered steps.
  business: [
    {
      title: 'Candidates',
      body: 'We recruit and support Republican candidates for city and state office, and work to get them elected.',
    },
    {
      title: 'Voters',
      body: 'We help neighbors register to vote, answer questions about the ballot, and recruit poll volunteers each election.',
    },
    {
      title: 'Neighbors',
      body: 'We host forums, picnics, and meet-and-greets so Staunton can meet the people asking for its vote.',
    },
    {
      title: 'Representation',
      body: "We send Staunton's delegates to district and state party conventions and carry the city's voice there.",
    },
  ] as BusinessItem[],

  // "Get Involved" action cards
  getInvolved: [
    {
      title: 'Volunteer',
      body: 'Knock doors, make calls, staff events, or lend a skill. Every hour moves us forward.',
      cta: { label: 'Contact us', href: '#contact' },
    },
    {
      title: 'Attend a Meeting',
      body: 'Newcomers welcome. Meet the committee, hear what’s ahead, and find your place.',
      cta: { label: 'See the schedule', href: '#events' },
    },
    {
      title: 'Spread the Word',
      body: 'Follow us, share our posts, and bring a neighbor. Local momentum starts with you.',
      cta: { label: 'Follow us', href: 'https://www.facebook.com/' },
    },
  ] as InvolvementItem[],

  newsletter: {
    eyebrow: 'Sign & Return',
    blurb:
      'Add your name and we’ll send committee news, meeting notices, and ways to lend a hand.',
    submitLabel: 'Add me to the list',
    successStamp: 'Received',
    successTitle: 'You’re on the list.',
    successBody:
      'Committee news and meeting notices will arrive at the address you gave us.',
  } as NewsletterCopy,

  // The imprint at the foot of the sheet — a broadside names its own printer.
  imprint: 'Printed for the Staunton Republican Committee · Staunton, Virginia',

  // Required-style political disclaimer (placeholder text).
  disclaimer:
    'Paid for and authorized by the Staunton Republican Committee. Not authorized by any candidate or candidate’s committee.',
};

export type Site = typeof site;
