import { test, expect } from '@playwright/test';
import { BASE_URL } from './config';

const url = (path = '') => `${BASE_URL}${path}`;

test.describe('locale detection', () => {
  test.describe('zz', () => {
    test.use({ locale: 'zz' });
    test('falls back to base locale from unknown', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test.describe('en', () => {
    test.use({ locale: 'en' });
    test('base locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test.describe('en-AU', () => {
    test.use({ locale: 'en-AU' });
    test('base locale', async ({ page }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });

  test.describe('de', () => {
    test.use({ locale: 'de' });
    test('unsupported locale falls back to base locale', async ({
      page,
    }) => {
      await page.goto(BASE_URL);

      expect(page.url()).toBe(url('en/'));
    });
  });
});
