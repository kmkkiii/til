import { z, defineCollection } from "astro:content";

const tilCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.string().regex(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/),
    published: z.boolean(),
  }),
});

export const collections = {
  til: tilCollection,
};
