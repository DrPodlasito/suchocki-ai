/**
 * Course catalogue.
 *
 * NOTE — these three courses are derived from the university lectureships and
 * the credentials in the dossier. They are structurally correct and ready to
 * publish, but the durations, formats and audience lines are proposals, not
 * facts you have confirmed. Edit before going live.
 */

export type Course = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  audience: string;
  format: string;
  duration: string;
  /** ISO 8601 duration, for schema.org. */
  durationISO: string;
  outcomes: string[];
  languages: string;
};

export const courses: Course[] = [
  {
    id: 'ai-governance',
    title: 'AI governance and ISO/IEC 42001',
    eyebrow: 'Leadership · compliance',
    summary: `What an AI management system actually requires, what auditors look for, and how to
      build governance that survives contact with a shipping engineering team. Taught by a
      certified ISO 42001 lead auditor who also builds the systems being governed.`,
    audience: 'CISOs, compliance leads, heads of data and AI, board-level sponsors',
    format: 'On-site or remote workshop',
    duration: '1–2 days',
    durationISO: 'P2D',
    outcomes: [
      'Read ISO/IEC 42001 as a set of decisions rather than a checklist',
      'Map existing ISO 27001 controls onto the AI management system',
      'Write an AI risk register your engineers will actually maintain',
      'Distinguish the EU AI Act obligations that bind you from the ones that do not',
    ],
    languages: 'Polish or English',
  },
  {
    id: 'offensive-security',
    title: 'Offensive security for defenders',
    eyebrow: 'Technical · hands-on',
    summary: `Penetration testing from the attacker's side of the table — reconnaissance,
      enumeration, exploitation, and the reporting that makes findings act on. The same material
      taught at AGH Kraków, compressed for practitioners.`,
    audience: 'Security engineers, SOC analysts, infrastructure and platform teams',
    format: 'Hands-on lab',
    duration: '2–3 days',
    durationISO: 'P3D',
    outcomes: [
      'Run a structured engagement instead of an unordered tool sweep',
      'Prioritise findings by exploitability rather than CVSS alone',
      'Recognise how OT and critical infrastructure change the rules',
      'Write a report a board will read and an engineer can action',
    ],
    languages: 'Polish or English',
  },
  {
    id: 'ai-in-security',
    title: 'AI in cybersecurity: what works',
    eyebrow: 'Strategy · applied',
    summary: `Where large language models genuinely change security operations and where they are
      being oversold. Built from shipping FuseAI — a multi-agent pentesting platform — rather than
      from vendor decks.`,
    audience: 'Security leadership, architects, and teams evaluating AI tooling',
    format: 'Seminar with worked examples',
    duration: '1 day',
    durationISO: 'P1D',
    outcomes: [
      'Judge an AI security claim in under ten minutes',
      'Understand where multi-agent systems help and where they hallucinate',
      'Weigh on-premise against hosted models for regulated data',
      'Plan a pilot that produces a real answer rather than a demo',
    ],
    languages: 'Polish or English',
  },
];
