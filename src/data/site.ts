/**
 * Single source of truth for identity, navigation and outbound links.
 * Only publish links with a known destination.
 */

export const site = {
  name: 'Michał Suchocki',
  title: 'Michał Suchocki — offensive security & AI',
  description:
    'dr inż. Michał Suchocki — CEO and co-founder of CyCommSec, creator of FuseAI, ISO 42001 lead auditor. Offensive security, applied AI, and training. Warsaw.',
  url: 'https://michalsuchocki.com',
  locale: 'en',
  location: 'Warsaw',
  // Deliberately on suchocki.ai — that mailbox is on the active mail server.
  email: 'michal@suchocki.ai',
  roles: [
    'dr inż.',
    'CEO & co-founder, CyCommSec',
    'creator of FuseAI',
    'ISO 42001 lead auditor',
  ],
} as const;

export const nav = [
  { label: 'Writing', href: '/writing/', match: /^\/writing/ },
  { label: 'Training', href: '/training/', match: /^\/training/ },
  { label: 'Ventures', href: '/ventures/', match: /^\/ventures/ },
  { label: 'Speaking', href: '/speaking/', match: /^\/speaking/ },
  { label: 'About', href: '/about/', match: /^\/about/ },
];

/** Outbound profiles and sources from the project dossier. */
export const links = {
  linkedin: 'https://www.linkedin.com/in/michalsuchocki/',
  scholar: 'https://scholar.google.com/citations?user=_n21VVcAAAAJ&hl=en',
  forbes: 'https://www.forbes.pl/autorzy/michal-suchocki',
  cycommsec: 'https://cycommsec.com',
  fuseai: 'https://getfuseai.com',
  neurality: 'https://www.youtube.com/watch?v=dEYQ0lQxG2Q',
  ieee: 'https://doi.org/10.1016/j.bbe.2016.01.003',
};

export type Locale = 'en' | 'pl';

export const polishNav = [
  { label: 'O mnie', href: '/pl/#o-mnie' },
  { label: 'Projekty', href: '/pl/#projekty' },
  { label: 'Publikacje', href: '/pl/#publikacje' },
  { label: 'Wystąpienia', href: '/pl/#wystapienia' },
  { label: 'Kontakt', href: '/pl/#kontakt' },
];
