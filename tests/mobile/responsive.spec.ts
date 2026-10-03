import { test, expect, type Page } from '@playwright/test';

// Every static route. New routes need a one-line addition here; new journal/bookshelf
// posts are picked up automatically by the two "latest post" tests below.
const STATIC_PAGES = ['/', '/projects/', '/journal/', '/bookshelf/', '/about/', '/contact/', '/404/'];

// Controls a visitor actually needs to tap: nav, the header CTA, sort/filter, pagination,
// and the two buttons that leave the page (contact submit, resume download). Plain prose
// links are intentionally excluded — WCAG's 24x24 target-size rule exempts inline text links.
const TAP_TARGET_SELECTOR = '.nav-link, a.contact, select, button, .chip, a.button';
const MIN_TAP_TARGET = 23; // 24px floor (WCAG 2.5.8 AA), with 1px of rounding slack

async function assertNoHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth, 'page scrolls horizontally at this viewport width').toBeLessThanOrEqual(clientWidth + 1);
}

async function assertViewportMeta(page: Page) {
  const content = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(content).toContain('width=device-width');
}

async function assertTapTargetsLargeEnough(page: Page) {
  const controls = await page.locator(TAP_TARGET_SELECTOR).all();
  for (const control of controls) {
    if (!(await control.isVisible())) continue;
    const box = await control.boundingBox();
    if (!box) continue;
    const label = (await control.getAttribute('aria-label')) ?? (await control.innerText().catch(() => '')) ?? '';
    expect(box.width, `"${label.trim()}" is too narrow to tap reliably`).toBeGreaterThanOrEqual(MIN_TAP_TARGET);
    expect(box.height, `"${label.trim()}" is too short to tap reliably`).toBeGreaterThanOrEqual(MIN_TAP_TARGET);
  }
}

async function assertImagesContained(page: Page) {
  const viewport = page.viewportSize();
  if (!viewport) return;
  const images = await page.locator('img').all();
  for (const image of images) {
    if (!(await image.isVisible())) continue;
    const box = await image.boundingBox();
    if (!box) continue;
    expect(box.x + box.width, 'image overflows the viewport width').toBeLessThanOrEqual(viewport.width + 1);
  }
}

async function assertBodyTextLegible(page: Page) {
  // Checked in priority order, not document order, so a small caption (e.g. a byline
  // dateline) ahead of the real copy can't stand in for it.
  const fontSize = await page.evaluate(() => {
    const el =
      document.querySelector('.prose p') ?? document.querySelector('.page-intro p') ?? document.querySelector('.excerpt');
    return el ? parseFloat(getComputedStyle(el).fontSize) : null;
  });
  if (fontSize !== null) {
    expect(fontSize, 'body copy renders smaller than 14px').toBeGreaterThanOrEqual(14);
  }
}

async function runMobileChecks(page: Page) {
  await test.step('no horizontal overflow', () => assertNoHorizontalOverflow(page));
  await test.step('viewport meta present', () => assertViewportMeta(page));
  await test.step('tap targets large enough', () => assertTapTargetsLargeEnough(page));
  await test.step('images contained in viewport', () => assertImagesContained(page));
  await test.step('body text legible', () => assertBodyTextLegible(page));
}

// Resolves to whatever the index page currently lists first (newest), so a new post
// becomes "latest" automatically without touching this file.
async function firstPostHref(page: Page, section: 'journal' | 'bookshelf') {
  await page.goto(`/${section}/`);
  const href = await page.locator('.post-list li a').first().getAttribute('href');
  if (!href) throw new Error(`No ${section} posts found to test — check the content collection`);
  return href;
}

for (const path of STATIC_PAGES) {
  test(`${path} is mobile-friendly`, async ({ page }) => {
    await page.goto(path);
    await runMobileChecks(page);
  });
}

test('latest journal post is mobile-friendly', async ({ page }) => {
  const href = await firstPostHref(page, 'journal');
  await page.goto(href);
  await runMobileChecks(page);
});

test('latest bookshelf post is mobile-friendly', async ({ page }) => {
  const href = await firstPostHref(page, 'bookshelf');
  await page.goto(href);
  await runMobileChecks(page);
});
