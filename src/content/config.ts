import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tilCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './til' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    published: z.boolean(),
  }),
});

export const collections = {
  til: tilCollection,
};
