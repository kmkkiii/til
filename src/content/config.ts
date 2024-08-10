import { z, defineCollection } from "astro:content";

const tilCollection = defineCollection({
  type: "content",
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
