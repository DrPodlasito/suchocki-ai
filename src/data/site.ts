/**
 * Single source of truth for identity, navigation and outbound links.
 * Placeholder URLs are marked TODO — everything else is confirmed.
 */

export const site = {
  name: 'Michał Suchocki',
  title: 'Michał Suchocki — offensive security & AI',
  description:
    'dr inż. Michał Suchocki — CEO and co-founder of CyCommSec, creator of FuseAI, ISO 42001 lead auditor. Offensive security, applied AI, and training. Warsaw.',
  url: 'https://suchocki.ai',
  locale: 'en',
  location: 'Warsaw',
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

export const links = {
  linkedin: 'https://www.linkedin.com/in/michalsuchocki/', // TODO verify handle
  x: '#', // TODO
  scholar: '#', // TODO
  forbes: '#', // TODO Forbes Poland author page
  cycommsec: 'https://cycommsec.com',
  fuseai: 'https://getfuseai.com',
  neurality: '#', // TODO
  ieee: 'https://doi.org/10.1016/j.bbe.2016.01.003',
};
