// @ts-check
import { defineConfig } from 'astro/config';

const oldPosts = {
  journal: ['highlights-from-2024', 'january-2025', 'march-2025', 'april-2025', 'may-2025'],
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

export default defineConfig({
  site: 'https://fisherankney.com',
  redirects: { ...redirects, '/contact.html': '/contact' },
});
