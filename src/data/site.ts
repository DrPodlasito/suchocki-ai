/**
 * Single source of truth for identity, navigation and outbound links.
 * Placeholder URLs are marked TODO — everything else is confirmed.
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

/**
 * Outbound links. A value of '#' means the URL is not filled in yet — the link
 * still renders, it just goes nowhere. Replace them as they're confirmed.
 */
export const links = {
  linkedin: 'https://www.linkedin.com/in/michalsuchocki/',
  x: '#',
  scholar: '#',
  forbes: '#',
  cycommsec: 'https://cycommsec.com',
  fuseai: 'https://getfuseai.com',
  neurality: '#',
  ieee: 'https://doi.org/10.1016/j.bbe.2016.01.003',
};
