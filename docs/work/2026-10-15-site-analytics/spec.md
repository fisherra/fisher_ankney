# Site analytics - spec

Status: signed off - 2026-10-15
Intent: ./intent.md

## Requirements
- R1 Both fisherankney.com and fiddle.fisherankney.com send pageviews, referrers, countries and devices to one
  Umami Cloud account, as one shared website split by hostname (the free tier allows one website; changed
  2026-10-20). (traces to: one dashboard for both sites)
- R2 Fiddler's Fancy records four named events: `tune-play`, `tuner-start`, `metronome-start` and
  `lesson-step` (renamed from `lesson-complete` during planning; see plan.md Deviations). (traces to: key
  interactions counted)
- R3 Clicks from the hub to Fiddler's Fancy show up in Fiddler's Fancy's referrers as `fisherankney.com`.
  (traces to: hub feeding spokes)
- R4 Nothing is sent from `/private/*`, and no private tune slug, title or path reaches Umami from any page,
  including through the referrer. (traces to: constraint, private pages untracked)
- R5 No cookies, no consent banner, and Umami's script is on the page only in the production build.
  (traces to: constraint, cookieless and no dev or preview traffic)
- R6 Fiddler's Fancy keeps its CSP rule of no third-party scripts, and the existing unit and e2e suites in both
  repos still pass. (traces to: constraint, don't break headers or tests)
- R7 Fisher's own browsers can opt out of being counted. (traces to: open question, filter own visits)
- R8 A short "Adding analytics to a spoke" note records the pattern, so Build Buddy and Page Quest can copy it.
  (traces to: reusable pattern)

## Design

### Umami account
- One Umami Cloud account (free tier) with **one** website, `4186514c-8689-4e94-9a67-466f7af6fe01`, shared by every site. Umami records the
  hostname on each pageview and event, so the dashboard's hostname filter separates the sites. Future spokes
  join the same website.
- The website ID isn't a secret because it's visible in every page's source. Each repo keeps it in the layout.
- Each site's tag lists only its own hostname in `data-domains`, so localhost and preview builds aren't counted.

### Hub (fisher_ankney)
- `src/layouts/Base.astro` adds the following tag to `<head>`, only when `import.meta.env.PROD`:
  `<script defer src="https://cloud.umami.is/script.js" data-website-id="4186514c-8689-4e94-9a67-466f7af6fe01" data-domains="fisherankney.com">`
- The hub has no CSP and already loads Google Fonts, so no header changes are needed.
- `data-domains` stops `astro preview` and the Playwright runs on localhost from being counted, even though
  they use the production build.
- There are no custom events (out of scope). Outbound clicks to fiddle.fisherankney.com arrive as referrals
  on Fiddler's Fancy's side. The hub sends no `Referrer-Policy` header, so browsers default to
  `strict-origin-when-cross-origin` and send the origin.

### Fiddler's Fancy
**Script, served first-party.** Umami's tracker (`script.js`, MIT-licensed) is copied into
`public/stats/script.js`, along with a header comment giving the source version and licence. Serving it from
`'self'` keeps the "no third-party scripts" rule. The service worker precaches it like any other public file,
and the tracker no-ops offline.

**Where data goes.** The tracker posts to `${data-host-url}/api/send`. There are two options, and Flag 1
explains the choice:
- (A, recommended) Set `data-host-url="https://cloud.umami.is"` and add `https://cloud.umami.is` to
  `connect-src` in `astro.config.mjs`. That is one new allowed host for `connect-src` only; `script-src`
  stays `'self'`.
- (B) The Worker proxies `/stats/api/send` to Umami (adding `run_worker_first: "/stats/*"`), which keeps
  `connect-src 'self'`.

**Loading.** `src/layouts/Base.astro` adds the script tag (an external file, so no CSP hash is needed) with
`data-website-id`, `data-domains="fiddle.fisherankney.com"` and `data-before-send="ffBeforeSend"`. It's added
only when `import.meta.env.PROD` is true and the path isn't `/private` or under `/private/`, so private pages
never load the tracker.

**Referrer scrub (R4).** `public/stats/before-send.js` defines `window.ffBeforeSend(type, payload)`. It
returns `false` (drop the event) if `location.pathname` is under `/private`. It also blanks
`payload.referrer` if that contains `/private`. This covers someone going from a private tune page back to
`/tunes`, where `document.referrer` would otherwise carry the private slug. It loads as a plain file before
the tracker.

**Events.** `src/lib/analytics.ts` exports `track(name, data?)`. It has no UI imports, so it follows the
shared-module rule and gets a `node:test` unit test. It calls `window.umami?.track` and no-ops when the
tracker is missing (dev builds, `/private`, ad-blocked). Event calls go into the existing handlers:

| Event | Where | Data |
|---|---|---|
| `tune-play` | `TuneView.tsx` play handler (not resume) | `{ tune: slug }`, **public tunes only**: skip if the tune is private |
| `tuner-start` | `Tuner.tsx`, the `pitch.start()` button | none, and never anything about audio |
| `metronome-start` | `Metronome.tsx` `toggle` when starting | `{ bpm }` |
| `lesson-complete` | `LearnStep.tsx` `finish` | `{ lesson: lessonId }` (lesson slugs are public) |

**Guard rails.** The private guard already scans everything in `dist/` outside `/private`, so it covers the
new files. An e2e check asserts that `/private/*` pages have no `stats/script.js` tag and that the CSP still
has no third-party `script-src`.

### Opting out (R7)
Umami's tracker skips sending when `localStorage.umami.disabled` is set to `1`. The pattern note documents a
one-line console snippet to run once on each of Fisher's browsers and devices, for each site.

### Pattern note (R8)
Add a "Analytics" section to fiddlers-fancy's `CLAUDE.md` with the rules: first-party script, private paths
excluded, `track()` only, no audio, no private identifiers. Add a short pointer in the hub repo's
`AGENTS.md`/`CLAUDE.md`. A new spoke copies the Fiddler's Fancy setup if it has a strict CSP, or the hub's
one tag if it doesn't.

## Flagged concerns
- **1. CSP: option A (allow `connect-src cloud.umami.is`) or option B (Worker proxy)?** A is a one-line CSP
  change with no new server code, and Umami sees the real visitor IP, so country data stays accurate. B keeps
  the CSP fully `'self'` and dodges ad-blockers, but it adds Worker code on a path outside `/private`. Umami
  would also see Cloudflare's IP unless we forward the client IP, and Umami Cloud may not honour that header,
  which would break country stats. - recommendation: **A**; the CLAUDE.md rule is about scripts, and the
  script stays first-party. - resolved: yes, recommendation accepted (2026-10-15)
- **2. Fiddler's Fancy's rules say "no third-party scripts."** Vendoring Umami's MIT-licensed tracker into
  `public/` keeps to the letter of that rule, but it is third-party *code*. It also needs manual updates, with
  no automatic patches from Umami. - recommendation: vendor it, pinned with a version comment, and add a
  CLAUDE.md line that explicitly allows it. - resolved: yes, recommendation accepted (2026-10-15)
- **3. Referrer leak from private pages.** This is real: `document.referrer` on `/tunes` can be
  `/private/tunes/<slug>`, and Umami stores referrer paths. `before-send.js` handles it, and it needs its own
  e2e assertion. - recommendation: keep the scrub and test it. - resolved: yes, recommendation accepted (2026-10-15)
- **4. Event choice.** These four events stand in for "tune plays, downloads, tuner use" from the intent.
  The public tune page has no download link today, so there's no `download` event, and I added
  `metronome-start` and `lesson-complete`. - recommendation: accept these four. - resolved: yes, recommendation accepted (2026-10-15)
- **5. `metronome-start` sends `bpm`.** This is harmless but optional. - recommendation: keep it, since
  it's useful for seeing what tempos people practise at. - resolved: yes, recommendation accepted (2026-10-15)
- **6. Hub Playwright tests and preview load `cloud.umami.is`.** That's a network call during tests, but
  `data-domains` stops it from being recorded. - recommendation: accept. - resolved: yes, recommendation accepted (2026-10-15)
- **7. Where the artifacts live.** The intent, spec and plan sit in the hub repo, but most of the code is in
  fiddlers-fancy, whose CLAUDE.md says its own build-loop artifacts go in its repo. - recommendation: keep
  them here and put a short pointer file in `fiddlers-fancy/docs/work/2026-10-15-site-analytics/`.
  - resolved: yes, recommendation accepted (2026-10-15)
- **8. Umami Cloud's free-tier limits and terms** may have changed since I last knew them (around 100k
  events a month, limited retention). - recommendation: confirm when signing up; the traffic is far below
  that. - resolved: yes, recommendation accepted (2026-10-15)
- **9. The hub loads `cloud.umami.is/script.js` without Subresource Integrity.** That script's URL isn't
  versioned, so an SRI hash would break silently the next time Umami updates it. - recommendation: accept for
  the hub, which has no CSP, already loads Google Fonts and holds nothing sensitive. Alternatively, vendor the
  same pinned copy as Fiddler's Fancy for consistency. - resolved: yes, recommendation accepted (2026-10-15)

## Out of scope
- Build Buddy and Page Quest (they copy the pattern later).
- Custom events on the hub, such as résumé downloads and outbound clicks (revisit after about a month of data).
- Funnels, session replay, A/B tests and heatmaps.
- A public stats page or showing numbers on the sites.
- Tracking anything on `/private/*`.
