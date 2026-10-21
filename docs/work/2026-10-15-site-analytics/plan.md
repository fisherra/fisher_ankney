# Site analytics - plan

Status: approved - 2026-10-20
Spec: ./spec.md

Two repos: the hub (`~/Documents/fisher_ankney`) and Fiddler's Fancy (`~/Documents/fiddlers-fancy`, "FF" below).
Each gets its own branch (`site-analytics`), its own commits and its own PR. FF ships first, because the hub's
referrals only matter once FF is counting.

## Prerequisite (Fisher, ~5 min)
0. Create an Umami Cloud account (free tier) and add one website. - **done 2026-10-20**: website ID
   `4186514c-8689-4e94-9a67-466f7af6fe01`, shared by both sites (the free tier allows one website).

## Files that change

### Fiddler's Fancy
- `public/stats/script.js` (new) - Umami's tracker, vendored from the matching tagged release on GitHub
  (`umami-software/umami`, the built tracker), with a header comment giving the version, source URL and MIT
  licence. Not edited otherwise.
- `public/stats/before-send.js` (new) - defines `globalThis.ffBeforeSend(type, payload)`, which returns `false`
  on `/private` paths and blanks any referrer containing `/private`. Written as a plain file with no imports, so
  Node can load it.
- `integrations/before-send.test.mjs` (new) - the scrub's unit test. It lives outside `public/` so it isn't
  deployed, and `npm test`'s `integrations/**/*.test.mjs` glob already picks it up. It loads the public file
  with `node:vm` and passes in a fake `location`.
- `src/lib/analytics.ts` (new) - `track(name: string, data?: Record<string, string | number>): void`, which calls
  `globalThis.umami?.track(name, data)` inside a try/catch. It has no UI imports.
- `src/lib/analytics.test.ts` (new) - checks that it no-ops with no `umami`, passes the name and data through,
  and survives a `track` that throws.
- `src/layouts/Base.astro` - in `<head>`, when `import.meta.env.PROD && !isPrivate`, add
  `<script is:inline src="/stats/before-send.js"></script>` followed by
  `<script is:inline defer src="/stats/script.js" data-website-id="4186514c-8689-4e94-9a67-466f7af6fe01" data-domains="fiddle.fisherankney.com" data-before-send="ffBeforeSend"></script>`.
  Here `isPrivate` is `path === '/private' || path.startsWith('/private/')`. `is:inline` with `src` keeps
  Astro from bundling them; both are external `'self'` files, so the CSP needs no hashes.
- `astro.config.mjs` - change `connect-src` to `"connect-src 'self' https://cloud.umami.is"` (flag 1, option A).
  If the vendored tracker posts to a different host (e.g. `api-gateway.umami.dev`), use that host instead and
  record it under Deviations.
- `src/components/tunes/TunePage.astro` - pass `trackAs={isPrivate ? undefined : data.slug}` to `TuneView`.
- `src/components/tunes/TuneView.tsx` - add an optional `trackAs?: string` prop. In `play()`, but not in
  `resume()`: `if (trackAs) track('tune-play', { tune: trackAs })`. This is a second layer on top of the
  script being absent from private pages.
- `src/components/tuner/Tuner.tsx` - make the Start button's `onClick` call `track('tuner-start')` when
  `pitch.state !== 'suspended'`, then `pitch.start()`. No data is attached.
- `src/components/metronome/Metronome.tsx` - in `toggle`'s start branch: `track('metronome-start', { bpm: settings.bpm })`.
- `src/components/learn/shared.ts` - in `completeStep`: `track('lesson-step', { lesson: lessonId, step })`, only
  when the step wasn't already done. See Deviations: there's no single "lesson complete" moment.
- `e2e/analytics.spec.ts` (new) - see Proof.
- `CLAUDE.md` - add an **Analytics** rule under Rules: Umami tracker vendored in `public/stats/` (the one allowed
  third-party code; update by re-vendoring a tagged release); only `track()` from `src/lib/analytics.ts`; never
  on `/private`; never any private tune identifier; never anything about audio. Add `src/lib/analytics.ts` and
  `public/stats/` to Layout.
- `docs/work/2026-10-15-site-analytics/README.md` (new) - a one-line pointer to the hub repo's
  intent, spec and plan (flag 7).

### Hub
- `src/layouts/Base.astro` - in `<head>`, `{import.meta.env.PROD && <script is:inline defer src="https://cloud.umami.is/script.js" data-website-id="4186514c-8689-4e94-9a67-466f7af6fe01" data-domains="fisherankney.com"></script>}`.
- `tests/analytics.spec.ts` (new) - checks that the home page has exactly one Umami script with the right
  `data-domains`.
- `AGENTS.md` - add a short **Analytics** note: Umami Cloud, one tag in `Base.astro`, the opt-out snippet,
  and a pointer to FF's CLAUDE.md for the strict-CSP version of the pattern (R8).

## Work order
1. **FF `track()` helper, test first.** Write `analytics.test.ts`, see it fail, then write `analytics.ts`.
   - done when `npm test` is green.
2. **FF referrer scrub, test first.** Write `integrations/before-send.test.mjs`, covering a public page (payload
   unchanged), a `/private` page (returns `false`), a `/private` referrer (blanked) and a referrer from another
   site (kept). Then write `public/stats/before-send.js`.
   - done when `npm test` is green.
3. **Vendor the tracker.** Download it from the tagged release and diff it against what
   `cloud.umami.is/script.js` serves today. Then confirm three things in the source: (a) the
   `data-before-send` attribute name and call signature, (b) the `umami.disabled` localStorage opt-out key,
   (c) the endpoint host it posts to.
   - done when all three are confirmed, or the plan is updated under Deviations.
4. **FF layout and CSP.** Edit `Base.astro` and `astro.config.mjs`.
   - done when `npm run build` passes (the private guard included), and when the built HTML for `/tunes` has
     both tags while the built HTML for `/private/tunes/<slug>` has neither.
5. **FF events.** Wire up `TunePage`/`TuneView`, `Tuner`, `Metronome` and `shared.ts`.
   - done when `npm run check` passes.
6. **FF e2e** (`e2e/analytics.spec.ts`). Use `page.route('**/stats/script.js', …)` to swap the tracker for a stub
   that records calls to `window.__umami`. Assert:
   - `/tunes/the-kesh` → Play → one `['tune-play', { tune: 'the-kesh' }]`
   - `/tuner` → Start → `['tuner-start']` (with the fake mic the suite already uses)
   - `/metronome` → Start → `['metronome-start', { bpm: <n> }]`
   - a lesson's "done" button → `['lesson-step', {...}]`
   - `/private/tunes/girl-i-left-behind-me` has no `script[src^="/stats/"]` and the stub records nothing
     when Play is pressed
   - the CSP meta on a public page has no host other than `'self'` in `script-src`, and has `cloud.umami.is`
     only in `connect-src`
   - done when the full `npm run test:e2e` is green (`watchForProblems` already fails any test on a CSP
     violation).
7. **FF docs.** Write the CLAUDE.md rule and the pointer README.
8. **Hub tag and test.** Edit `Base.astro`, write `tests/analytics.spec.ts` and the AGENTS.md note.
   - done when `npm run build` and `npm run test:mobile` are green.
9. **Review and ship.** Run `/code-review` on each branch, then use `/commit-push-pr` for each repo. Fisher
   merges FF first, then the hub.
10. **Post-deploy check (Fisher plus me).** Load each live site in a private window, confirm the visits show
    up in Umami's realtime view, then play a tune and start the tuner and see the events. Open a private tune
    while logged in and confirm nothing shows up. Then run the opt-out snippet on Fisher's own browsers:
    `localStorage.setItem('umami.disabled', '1')` in each site's console.

## Proof
FF: `npm test`, `npm run check`, `npm run build` (private guard included), `npm run test:e2e`, and a
`grep -L 'stats/script.js' dist/private/**/*.html` showing every private page lacks the tag.
Hub: `npm run build`, `npm run test:mobile`. Live: step 10's realtime screenshot from Umami.

## Risks
- **The private referrer leaks some other way** (e.g. a payload field the tracker adds that isn't
  `referrer`). - mitigation: step 3 reads the tracker's payload builder; `before-send.js` scrubs any string
  field containing `/private`, not just `referrer`, and the unit test covers that.
- **The CSP blocks the beacon in production** (wrong host), so analytics fails silently. - mitigation: step 3
  confirms the host; the e2e CSP watcher catches violations from the script tag. The beacon only fires on the
  live domain, though, so step 10 is the real proof.
- **The service worker caches an old `stats/script.js`.** It's precached and versioned per build like every
  other file, so a new deploy refreshes it. That's acceptable.
- **The tracker throws and breaks a page.** - mitigation: it's a separate deferred script, and `track()`
  catches errors. A failed load just means `umami` is undefined.
- **Ad-blockers drop the hub's events and FF's beacon to `cloud.umami.is`.** Expect some under-counting.
  That's accepted (flag 1).
- **Rollback:** revert the PR in each repo. Nothing stores state, so there's nothing to migrate back.

Rejected alternative: a Worker proxy for FF (flag 1, option B). It means server code outside `/private` and
likely loses country data.

## Deviations
- One shared Umami website instead of two (2026-10-20): the free tier allows only one. Both repos use the same
  `data-website-id`; the sites are separated in the dashboard with the hostname filter.
- `lesson-complete` → `lesson-step` `{ lesson, step }`. The code only knows when a step finishes
  (`completeStep`), and a lesson's completion would need its step count passed in. You can see completed
  lessons in Umami as the count for each lesson's final step. If you want a true `lesson-complete`, we pass
  each lesson's step count into `LearnStep` and check it in `completeStep`.
- Tracker host is `gateway.umami.is`, not `cloud.umami.is` (found in step 3 by reading the tracker): FF's
  `connect-src` allows `https://gateway.umami.is`.
- Vendored from `https://cloud.umami.is/script.js` (Last-Modified 2026-10-19, sha256 recorded in the file header),
  not from a GitHub tagged release: Umami's releases ship source, and the cloud build is the one that talks to Umami
  Cloud. The header records how to update it. It also carries `// @ts-nocheck` so `astro check` skips minified code.
- FF tag adds `data-exclude-search="true"`: `/tunes` search text could otherwise include a private tune's title when
  Fisher searches while logged in.
- `before-send.js` drops any event whose fields mention `/private` (not only the referrer), as the Risks section
  proposed.
- `tune-play` is recorded in the Play button's handler, not inside `play()`, so loop restarts and passage replays
  don't count as new plays. `metronome-start` skips resuming after an interruption. `tuner-start` skips "Tap to
  resume".
- Hub Playwright: `npm run test:mobile` can't launch its own server under an agent (`astro preview` backgrounds
  itself), and with the dev server running it silently tests dev, not the build. Ran it against a manually started
  background preview of a fresh build instead; documented in the hub's AGENTS.md.
