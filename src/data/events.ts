// Placeholder upcoming events. Replace with real dates/details.
// `date` is an ISO date (YYYY-MM-DD); formatting happens in the Events section.
// `location` carries no separators — Events.astro sets the · between fields.
// Events.astro filters out anything in the past, so stale entries simply stop
// rendering rather than advertising a date that has already gone by.

export interface CommitteeEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  /** Optional external link (registration, details, map, etc.). */
  href?: string;
}

export const events: CommitteeEvent[] = [
  {
    title: 'Monthly Committee Meeting',
    date: '2026-09-08',
    time: '6:30 PM',
    location: 'Location announced before each meeting',
    description:
      'Hear what’s ahead, meet the committee, and get involved. Newcomers always welcome.',
  },
  {
    title: 'Candidate Meet & Greet',
    date: '2026-09-24',
    time: '5:30 PM – 7:30 PM',
    location: 'Downtown Staunton',
    description:
      'An informal evening to meet local candidates, ask questions, and connect over the issues that matter most.',
  },
  {
    title: 'Fall Volunteer Drive',
    date: '2026-10-10',
    time: '10:00 AM – 1:00 PM',
    location: 'Gypsy Hill Park, Staunton',
    description:
      'Sign up for door-knocking shifts, phone banking, and poll work ahead of election day. Coffee provided.',
  },
];
