# Adding content

How to publish a new book review or journal entry. No tools beyond a text
editor and git - just a markdown file, some images, and a push.

## Quick version

1. Copy a template:
   - `templates/book-review.md` → `src/content/bookshelf/`
   - `templates/journal-entry.md` → `src/content/journal/`
2. Rename the copy to `YYYY-MM-DD-your-slug.md`.
3. Drop any images in the matching folder under `src/assets/images/`
   (see below) and point `thumbnail` at one of them.
4. Fill in the frontmatter and write the piece. Leave `draft: true` while
   you're working on it.
5. Preview locally (see "Previewing" below).
6. Set `draft: false`, then `git add`, `git commit`, `git push`. It goes
   live on the next deploy.

## Where files go

| | Book reviews | Journal entries |
|---|---|---|
| Markdown | `src/content/bookshelf/` | `src/content/journal/` |
| Images | `src/assets/images/book_reviews/` | `src/assets/images/<year>_journal/` (make the folder if it's a new year) |
| Template | `templates/book-review.md` | `templates/journal-entry.md` |

## Filenames

`YYYY-MM-DD-slug.md`. The date prefix is stripped when building the URL -
`2026-09-20-the-death-of-ivan-ilyich.md` becomes
`/bookshelf/the-death-of-ivan-ilyich`. Use the date you finished the book,
or roughly the end of the season/quarter for a journal entry.

## Images

Put image files in the folder for that content type, then reference them
with a relative path from the markdown file:

- As the card/index thumbnail, in frontmatter: `thumbnail: ../../assets/images/book_reviews/cover.jpg`
- Inline in the body, anywhere you want a photo: `![](../../assets/images/2026_journal/photo.jpg)`

Any common image format works (`.jpg`, `.png`, `.JPG`, etc. - matches what's
already in those folders).

## Frontmatter reference

**Both types share:**
- `title` - string
- `date` - `YYYY-MM-DD`
- `excerpt` - one sentence, shown on the index page
- `thumbnail` - relative path to an image (see above)
- `draft` - `true` while writing, `false` to publish. Drafts show up when
  previewing locally but are left out of the production build.

**Book reviews add:**
- `author` - string
- `category` - exactly one of `Outdoors`, `Literature`, `History`
- `published` - the year the book first came out, as a plain integer
  (negative for BC, e.g. `-750` for the Iliad)
- `rating` - optional, `0`-`5` in half-star steps (e.g. `3.5`). Leave the
  field out entirely while the book is unrated - unrated books sort to the
  bottom of the index instead of ranking as a 0.

**Journal entries add:**
- `subtitle` - short line shown next to the title on the index page
- `category` - exactly one of `Report` (seasonal field notes), `Essay`, `Review`

## Previewing

The dev server runs in the background (see the root `CLAUDE.md` for the
exact commands: `astro dev --background`, `astro dev status`,
`astro dev logs`, `astro dev stop`). With it running, open
`http://localhost:4321` and your draft will be listed - drafts render in
dev but never in the production build, so it's safe to leave `draft: true`
in place while you iterate.

## Going live

Once `draft: false` is set and the preview looks right:

```
git add src/content/... src/assets/images/...
git commit -m "Add review: <book title>"   # or "Add journal entry: <season>"
git push
```

Pushing to `master` is what ships the change - there's no separate publish
step.
