import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'journal' | 'bookshelf';
export type Post = CollectionEntry<Section>;

// Drafts show up in `npm run dev` but are left out of production builds.
export async function getPosts(section: Section): Promise<Post[]> {
  const posts: Post[] = await getCollection(section, ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const byline = (post: Post) => ('author' in post.data ? `by ${post.data.author}` : post.data.subtitle);

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// Publication years are plain integers so they sort; negative ones are BC.
export const formatYear = (year: number) => (year < 0 ? `${Math.abs(year)} BC` : String(year));

// Ignore a leading article so "The Iliad" files under I, not T.
export const sortKey = (title: string) => title.toLowerCase().replace(/^(the|a|an)\s+/, '');
