import { site, links } from './site';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#michal`,
  name: site.name,
  honorificPrefix: 'dr inż.',
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: 'CEO & co-founder, CyCommSec',
  description: site.description,
  knowsLanguage: ['pl', 'en'],
  address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Military University of Technology (WAT)' },
  worksFor: { '@type': 'Organization', name: 'CyCommSec', url: links.cycommsec },
  knowsAbout: ['Offensive security', 'Artificial intelligence', 'ISO/IEC 42001', 'Biomedical signal processing'],
  sameAs: [links.linkedin, links.scholar, links.forbes],
};
