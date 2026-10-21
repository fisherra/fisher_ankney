import { test, expect } from '@playwright/test';

// Umami analytics: one tag in Base.astro, production builds only. data-domains keeps this preview server (and any
// other non-live host) from being counted. The website ID is shared with fiddle.fisherankney.com.
test('the shared layout carries one Umami tag, limited to the live domains (apex and www)', async ({ page }) => {
  await page.goto('/');
  const tag = page.locator('script[src="https://cloud.umami.is/script.js"]');
  await expect(tag).toHaveCount(1);
  await expect(tag).toHaveAttribute('data-website-id', '4186514c-8689-4e94-9a67-466f7af6fe01');
  await expect(tag).toHaveAttribute('data-domains', 'fisherankney.com,www.fisherankney.com');
  await expect(tag).toHaveAttribute('defer', '');
});
