## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Analytics

Umami Cloud (free tier, cookieless): one `<script>` in `src/layouts/Base.astro`, production builds only, with
`data-domains="fisherankney.com,www.fisherankney.com"` (www serves the site without redirecting) so previews aren't counted (`tests/analytics.spec.ts`). The website ID is shared
with every spoke; filter by hostname in the dashboard. Fisher opts his own browsers out once per site with
`localStorage.setItem('umami.disabled', '1')` in the console. A spoke with a strict CSP vendors the tracker instead:
see fiddlers-fancy's CLAUDE.md (Analytics rule). Spec: `docs/work/2026-10-15-site-analytics/`.

`npm run test:mobile` can't start its own server under an AI agent (`astro preview` backgrounds itself, so
Playwright sees it exit). Build, run `npx astro preview --background --port 4321`, run `npx playwright test`, then
`npx astro preview stop`. Stop the dev server first, or Playwright tests it instead of the build.
