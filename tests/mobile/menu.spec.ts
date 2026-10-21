import { test, expect, type Page } from '@playwright/test';

// Phones get a one-row header (name + menu button); the menu holds every nav link, Contact last. Tablets and up
// keep the full nav. Breakpoint: 640px (see Base.astro).
const isPhone = (page: Page) => (page.viewportSize()?.width ?? 0) <= 640;
const LINKS = ['Projects', 'Journal', 'Bookshelf', 'About', 'Contact'];

test('phones: one-row header, nav tucked behind the menu button', async ({ page }) => {
  test.skip(!isPhone(page), 'phone layout only');
  await page.goto('/');
  const header = page.locator('.site-header');
  const box = (await header.boundingBox())!;
  expect(box.height, 'header should be a single slim row').toBeLessThanOrEqual(80);
  const button = page.getByRole('button', { name: 'Menu' });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  for (const name of LINKS) await expect(header.getByRole('link', { name, exact: true })).toBeHidden();
});

test('phones: the menu opens with every link, closes on Escape and returns focus', async ({ page }) => {
  test.skip(!isPhone(page), 'phone layout only');
  await page.goto('/');
  const header = page.locator('.site-header');
  const button = page.getByRole('button', { name: 'Menu' });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  for (const name of LINKS) {
    const link = header.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();
    const b = (await link.boundingBox())!;
    expect(b.height, `${name} is too short to tap`).toBeGreaterThanOrEqual(44);
  }
  // The open menu doesn't push the page sideways.
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(header.getByRole('link', { name: 'Projects', exact: true })).toBeHidden();
  await expect(button).toBeFocused();
});

test('phones: a menu link navigates', async ({ page }) => {
  test.skip(!isPhone(page), 'phone layout only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.locator('.site-header').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('phones without JavaScript still get the nav', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  for (const name of LINKS) await expect(page.locator('.site-header').getByRole('link', { name, exact: true })).toBeVisible();
  await context.close();
});

test('tablets and up: full nav, no menu button', async ({ page }) => {
  test.skip(isPhone(page), 'wide layout only');
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  for (const name of LINKS) await expect(page.locator('.site-header').getByRole('link', { name, exact: true })).toBeVisible();
});
