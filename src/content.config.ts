import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const til = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: './src/content/til' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    published: z.boolean(),
  }),
});

export const collections = { til };
