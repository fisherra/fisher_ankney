// @ts-check
import { defineConfig } from 'astro/config';

const oldPosts = {
  journal: ['highlights-from-2024'],
  bookshelf: [
    'training-the-versatile-hunting-dog',
    'a-chinamans-chance',
    'idaho-loners',
    'idaho-ruffed-grouse-hunting',
  ],
};

// The Jekyll site served posts at /:title; keep those links working.
const redirects = Object.fromEntries(
  Object.entries(oldPosts).flatMap(([section, ids]) => ids.map((id) => [`/${id}`, `/${section}/${id}`])),
);

// The old monthly journal posts were merged into quarterly ones; point those links at their new home.
const mergedJournalPosts = {
  '/january-2025': '/journal/q1-2025',
  '/march-2025': '/journal/q1-2025',
  '/april-2025': '/journal/q2-2025',
  '/may-2025': '/journal/q2-2025',
};

export default defineConfig({
  site: 'https://fisherankney.com',
  redirects: { ...redirects, ...mergedJournalPosts, '/contact.html': '/contact' },
});
