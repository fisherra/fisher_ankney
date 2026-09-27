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
  schema: (ctx) => z.object({ ...postFields(ctx), subtitle: z.string() }),
});

const bookshelf = defineCollection({
  loader: loader('bookshelf'),
  schema: (ctx) => z.object({ ...postFields(ctx), author: z.string() }),
});

export const collections = { journal, bookshelf };
