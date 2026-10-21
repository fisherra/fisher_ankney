# Site analytics

Status: accepted - 2026-10-15

## Problem
Neither fisherankney.com nor fiddle.fisherankney.com measures anything. I can't tell how many people visit,
where they come from (LinkedIn, applications, search, each other), or whether anyone uses the sub-site
features I built. Without that, I'm guessing about what's working, and my portfolio case studies have no real
usage numbers to cite.

## Proposed outcome
- One dashboard shows traffic for both sites: visitors, pageviews, top pages, referrers, countries, devices.
- On Fiddler's Fancy, the key interactions (e.g. tune plays, ABC/sheet downloads, tuner use) are counted as
  named events, so I can see which features get used.
- Visits from the hub to Fiddler's Fancy show up as referrals, so I can see the hub feeding the spokes.
- The setup is a simple, documented pattern that future spokes (Build Buddy, Page Quest) can copy when they ship.
- Visitors see no cookie banner, and no third-party tracking cookies are set.

## Who & what it touches
- `fisher_ankney` (Astro, Cloudflare Pages): base layout gets the tracking script.
- `fiddlers-fancy` (Astro, Cloudflare Workers): base layout gets the script; interactive elements get event
  tags; `public/_headers` may need CSP changes.
- An external analytics account (Umami Cloud) with one website entry per site.

## Constraints
- Free: Umami Cloud's free tier, unless the spec finds a blocker.
- Cookieless and privacy-friendly; no consent banner needed.
- Must not track the Cloudflare Access `/private/*` pages on Fiddler's Fancy at all, so private tune names
  and visits never leave the site.
- Must not break existing security headers, page performance, or the Playwright suites in either repo.
- Must not count local dev or preview traffic as real visits.

## Out of scope
- Build Buddy and Page Quest (they adopt the pattern later).
- Funnels, session replay, A/B tests, heatmaps.
- Custom events on the hub (traffic and referrers only for now).
- A public stats page or showing numbers on the sites.

## Open questions
- Which Fiddler's Fancy interactions count as "key"? *Suggest: tune play, download, tuner open; confirm in spec.*
- Does the hub need any events (e.g. résumé download, outbound clicks)? *Suggest: none for now; revisit
  after a month of data.*
- Should I filter out my own visits? *Suggest: yes, via Umami's exclude option or a localStorage flag on my
  devices.*
