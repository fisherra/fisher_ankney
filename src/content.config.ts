import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Filenames keep Jekyll's date prefix; ids drop it so URLs match the old site.
const loader = (dir: string) =>
  glob({
    pattern: '*.md',
    base: `./src/content/${dir}`,
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  });

const postFields = ({ image }: SchemaContext) => ({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string(),
  thumbnail: image(),
  draft: z.boolean().default(false),
});

const journal = defineCollection({
  loader: loader('journal'),
  schema: (ctx) =>
    z.object({
      ...postFields(ctx),
      subtitle: z.string(),
      // Report: seasonal field notes. Essay: a standalone piece. Review: gear, places, guides.
      category: z.enum(['Report', 'Essay', 'Review']),
    }),
});

const bookshelf = defineCollection({
  loader: loader('bookshelf'),
  schema: (ctx) =>
    z.object({
      ...postFields(ctx),
      author: z.string(),
      category: z.enum(['Outdoors', 'Literature', 'History']),
      // Year the book was first published or composed. Negative years are BC,
      // so the Iliad sorts at -750 and Antigone at -441.
      published: z.number().int(),
      // 0-5 in half-star steps. Leave the field out while a book is unrated;
      // unrated books sort to the bottom of both rating orders.
      rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
    }),
});

export const collections = { journal, bookshelf };
