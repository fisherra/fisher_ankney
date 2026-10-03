# Product Requirements Document: fisherankney.com

**Status:** Draft for review
**Owner:** Fisher Ankney
**Last updated:** 2026-10-03

## 1. Purpose

fisherankney.com is Fisher's personal site and the hub for his transition from product
management into AI-enabled building. It exists to:

- Give hiring managers, recruiters, and PM peers a fast, credible read on how Fisher thinks
  about product — through real PRDs, roadmaps, and case studies tied to shipped side
  projects, not just a resume.
- Host the "spoke" projects he builds (currently [Build Buddy](https://build.fisherankney.com),
  with Fiddler's Fancy and Page Quest planned) and connect them back to his personal brand.
- Carry two long-running personal interests — a sportsman's journal and a book-review
  "bookshelf" — that predate the career pivot and give the site a human, non-resume texture.

## 2. Audience

| Audience | What they're looking for |
|---|---|
| Recruiters / hiring managers | Quick signal: who is this, what do they build, can they write and ship |
| PM peers / network | PRDs, roadmaps, and decision logs that show product thinking in practice |
| Personal contacts, family | Journal entries and book reviews — the non-work side of the site |
| Fisher (site owner) | A low-maintenance place to publish both tracks without switching tools |

A large and growing share of traffic is from a phone — a shared link opened from text,
LinkedIn, or email — so mobile is not a secondary surface; for many first visits it is the
only surface.

## 3. Current state (as of 2026-10-03)

Static site, built with Astro, deployed to Cloudflare Pages, no server-rendered or
authenticated routes. Pages:

- **Home (`/`)** — hero intro, a grid of project cards, a feed of recent journal/bookshelf posts.
- **Projects (`/projects/`)** — card grid linking out to each spoke project.
- **Journal (`/journal/`, `/journal/[id]/`)** — quarterly outdoor-life entries, sortable/filterable list.
- **Bookshelf (`/bookshelf/`, `/bookshelf/[id]/`)** — book reviews with cover art, star ratings,
  category and sort/filter controls.
- **About (`/about/`)** — bio, work history timeline, resume download.
- **Contact (`/contact/`)** — form posting to Web3Forms, plus a direct email link.
- **404** — fallback page.

Content is Markdown in Astro content collections; no CMS, no backend, no user accounts.
There is currently no automated test suite and no CI pipeline — every change ships on trust
that it still looks right on every device.

## 4. Goals

1. Make the PM-thinking artifacts (PRDs, specs, decisions behind shipped spokes) visible and
   easy to find from the site, reinforcing the "I can do this for real" signal.
2. Keep the journal/bookshelf tracks easy to maintain (write Markdown, push, done) without
   regressing their reading experience.
3. **Guarantee the site holds up on a phone**, since that's the most common and least
   forgiving entry point, and guard that guarantee with automated checks rather than
   manual spot-checks before each deploy.
4. Keep the site fast and simple to operate solo — no backend to run, no accounts to manage.

## 5. Non-goals

- No CMS or editorial workflow beyond Markdown + git.
- No analytics/tracking build-out in this pass (may be a later PRD).
- No redesign of the visual identity (serif/display type, warm palette) — that's considered
  settled; this PRD is about structure and robustness, not a new look.
- No native app or PWA installability.

## 6. Requirements

### Functional
- All existing pages and content collections continue to work exactly as they do today.
- Project cards link out to live spoke projects (or show "Planned" status when not yet built).
- Journal and Bookshelf keep their independent sort/filter/pagination behavior, including
  the "remember my last sort/filter" behavior via `localStorage`.
- Contact form keeps working without JavaScript (native form POST) and with it (inline
  success/error state).

### Non-functional
- **Mobile-friendly by default.** Every page renders without horizontal scrolling, with
  tap targets large enough to hit reliably, and with text legible without pinch-zoom, on
  common phone viewports (see the technical scoping doc for the specific device matrix and
  thresholds). This requirement is new as of this PRD and is the trigger for the work that
  follows it.
- Regressions to the above are caught automatically, before merge, not discovered by a
  recruiter on a cracked phone screen.
- Pages remain static-generatable (no requirement introduces a server runtime).
- Accessibility basics (focus states, aria-live regions, alt text) already present in the
  codebase are preserved, not regressed, by any future change.

## 7. Success metrics

- Zero known instances of horizontal overflow, unreachable controls, or illegibly small
  text on any shipped page at phone widths.
- A test suite exists that fails CI (or a local run) the moment a future change breaks
  mobile layout on any page, so the only way to ship a mobile regression is to ignore a
  red check.
- Time to add a new page/route to the mobile check is small (one line in a page list),
  so the guarantee doesn't rot as the site grows.

## 8. Open questions / risks

- **Hosting/CI:** the site deploys via Cloudflare Pages; whether a GitHub Actions check
  gates the Pages deploy itself, or just gates PR merges, depends on repo settings Fisher
  owns — flagged in the technical scoping doc as a follow-up outside this change.
- **Scope creep:** "mobile-friendly" could expand indefinitely (performance budgets, PWA,
  offline). This PRD scopes it to layout/overflow/tap-target correctness only; performance
  and offline support are explicitly out of scope here and would need their own intent.

## 9. Relationship to the build loop

This document plays the role of `intent.md` + `spec.md` for the "keep the site mobile-friendly"
slice of the broader personal-website project, compressed into one pass at the user's request.
The technical scoping document in this same folder plays the role of `plan.md`.
