// The committee roster. PLACEHOLDER names — the offices are real, the people
// are not. Replace `name` with the sitting officer before this goes live;
// leaving "Name TBD" in production is better than inventing someone.

export interface Officer {
  /** The office held. This is the stable half of the entry. */
  office: string;
  name: string;
  /** Optional one-line note — a precinct, a portfolio, a term. */
  note?: string;
}

export const officers: Officer[] = [
  { office: 'Chair', name: 'Name TBD' },
  { office: 'Vice Chair', name: 'Name TBD' },
  { office: 'Secretary', name: 'Name TBD' },
  { office: 'Treasurer', name: 'Name TBD' },
];
