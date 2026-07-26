import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Essays. The schema is the point: forget a date or a summary and the build
 * fails rather than shipping a broken index page.
 */
const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    location: z.string().default('Warsaw'),
    readingMinutes: z.number().int().positive(),
    /** Which language versions exist — drives the "EN / PL" badge. */
    languages: z.array(z.enum(['EN', 'PL'])).default(['EN']),
    /** The contents rail is built from the rendered h2s, not declared here. */
    notes: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays };
