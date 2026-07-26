import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const essays = (await getCollection('essays', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.summary,
      pubDate: essay.data.date,
      link: `/writing/${essay.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
