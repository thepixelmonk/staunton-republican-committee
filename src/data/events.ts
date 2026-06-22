// Placeholder upcoming events. Replace with real dates/details.
// `date` is an ISO date (YYYY-MM-DD); formatting happens in the Events section.

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
    title: 'Independence Day Picnic',
    date: '2026-07-04',
    time: '11:00 AM – 2:00 PM',
    location: 'Gypsy Hill Park · Staunton',
    description:
      'Join neighbors for a family-friendly cookout, music, and a celebration of community and country.',
  },
  {
    title: 'Monthly Committee Meeting',
    date: '2026-07-14',
    time: '6:30 PM',
    location: 'Location announced before each meeting',
    description:
      'Hear what’s ahead, meet the committee, and get involved. Newcomers always welcome.',
  },
  {
    title: 'Candidate Meet & Greet',
    date: '2026-08-20',
    time: '5:30 PM – 7:30 PM',
    location: 'Downtown Staunton',
    description:
      'An informal evening to meet local candidates, ask questions, and connect over the issues that matter most.',
  },
];
