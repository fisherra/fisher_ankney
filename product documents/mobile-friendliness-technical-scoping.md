# Technical Scoping: Mobile-Friendliness Test Suite

**Status:** Draft for review
**Relates to:** `personal-website-prd.md` (§6, "Mobile-friendly by default")
**Last updated:** 2026-10-03

## 1. Problem

The site has no test suite of any kind. Several pages already carry mobile-specific CSS
(a stacking breakpoint on the homepage hero and recent-posts list at 800px, a card-to-column
breakpoint on post list cards at 560px, a form-row breakpoint at 600px, a photo-pair gap
adjustment at 480px), which means someone already cared about this — but nothing stops a
future change from silently breaking it. The ask is to make that guarantee automatic and
durable.

## 2. Approach

Add an end-to-end test suite using **Playwright**, run against the real built site in
real browser engines, at real phone viewport sizes, asserting the specific failure modes
that make a page "not mobile-friendly":

1. No horizontal overflow — `document.documentElement.scrollWidth` must not exceed the
   viewport width (small tolerance for scrollbars/rounding).
2. A `viewport` meta tag is present (prerequisite for correct mobile rendering at all).
3. Primary interactive elements (nav links, the contact/CTA button, sort/filter controls,
   the "show more" button, the contact form's submit button) meet a minimum tap-target
   size — using the WCAG 2.5.8 / Apple HIG floor of 24×24 CSS px as the bar (the stricter
   44×44 AAA guidance is a stretch goal, not a hard gate, since several controls are
   icon-only today).
4. Images do not visually overflow their container at mobile widths.
5. Body text renders at a legible size (≥ 14px effective) without relying on pinch-zoom.

### Why Playwright over alternatives
- **Built-in device emulation** (`devices['iPhone 13']`, `devices['Pixel 7']`, etc.) with
  correct viewport, user-agent, and touch emulation out of the box — no manual viewport
  math.
- **Real engines**, including WebKit, which is the actual engine mobile Safari uses — this
  catches WebKit-specific layout bugs that a Chromium-only tool (e.g. plain Lighthouse CI)
  would miss.
- Single dependency (`@playwright/test`) with no separate runner, no conflict with the
  Astro toolchain, and first-class TypeScript support matching the rest of the repo.
- No existing test tooling in the repo to be consistent with, so there's no switching cost.

### Device matrix
| Project | Device | Why |
|---|---|---|
| `mobile-safari` | iPhone 13 (WebKit) | Most common phone engine for this audience |
| `mobile-chrome` | Pixel 7 (Chromium) | Covers Android/Chrome rendering differences |
| `tablet` | iPad Mini (WebKit) | Catches the mid-size breakpoint gap, lower priority |

### Pages covered
Every static route plus one representative entry per dynamic collection, so the list stays
short and maintainable as content grows:

`/`, `/projects/`, `/journal/`, `/journal/[newest entry]/`, `/bookshelf/`,
`/bookshelf/[newest entry]/`, `/about/`, `/contact/`, `/404/`

New *routes* (not content entries) need a one-line addition to the `PAGES` list in the spec
file; new journal/bookshelf posts are covered automatically since the tests resolve "newest
entry" at run time rather than hardcoding a slug.

## 3. Test execution

- Tests run against `astro build` + `astro preview` (production-equivalent output), not
  `astro dev`, so the suite reflects what actually ships.
- `playwright.config.ts` manages the preview server lifecycle (`webServer` option) so
  `npm run test:mobile` is a single command locally.
- Added as `npm run test:mobile` in `package.json`; no changes to `dev`/`build`/`preview`.

## 4. CI follow-up (flagged, not done in this change)

A GitHub Actions workflow (`.github/workflows/mobile-tests.yml`) running this suite on every
PR is included in this change so the check runs in CI going forward. Wiring that check as a
**required** status (blocking merge) is a GitHub repo-settings change under Branch
Protection, which needs repo-admin action in the GitHub UI — flagged here, not performed by
this change, since it's a permissions change to shared infrastructure rather than a code
change.

## 5. Out of scope for this pass

- Visual regression / pixel-diff screenshot testing (higher maintenance, flakier across
  font-rendering differences between CI and local; revisit if layout bugs recur that these
  assertions don't catch).
- Performance budgets (Lighthouse scores, Core Web Vitals) — a separate concern from layout
  correctness; would be its own intent if wanted.
- Cross-browser desktop testing — out of scope for this mobile-specific pass.

## 6. Rollout

1. Add `@playwright/test`, config, and the test spec on this branch.
2. Run the suite against the current site; fix any real mobile issues the tests surface
   before calling the suite "passing" (fixing pre-existing bugs is part of making the
   guarantee true, not scope creep).
3. Leave the branch unmerged and unpushed for review, per the request — nothing here
   touches `master` or production until it's verified.
