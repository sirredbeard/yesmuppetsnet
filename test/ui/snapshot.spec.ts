import { test, expect } from '@playwright/test';
import { BASE_URL } from './config';

test.describe('index snapshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // pause cursor blinking, otherwise snapshots can differ :(
    await page.$eval('.typed-cursor', (el) =>
      el.classList.remove('typed-cursor--blink')
    );
  });

  test('page looks the same', async ({ page }) => {
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchSnapshot('index.png', {
      threshold: 0.05,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('why', async ({ page }) => {
    await page.keyboard.type('muppet');

    // wait for the easter-egg background image to actually be applied
    // (and loaded) before taking the screenshot, otherwise this can be
    // flaky if the image hasn't finished loading yet.
    await page.waitForFunction(
      () => document.body.style.backgroundImage !== ''
    );
    await page.waitForTimeout(300);

    const screenshot = await page.screenshot();
    // the background here is an animated gif; the exact frame captured
    // varies run to run, so allow a larger pixel diff ratio than the
    // static index snapshot.
    expect(screenshot).toMatchSnapshot('why.png', {
      threshold: 0.05,
      maxDiffPixelRatio: 0.1,
    });
  });
});
