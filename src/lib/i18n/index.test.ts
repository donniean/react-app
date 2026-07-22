// cSpell: ignore Hani cimode unstub
import { afterEach, describe, expect, test, vi } from 'vitest';

import { resolveDetectedLanguage } from './resolve-language';

const SUPPORTED_LANGUAGES = ['en', 'zh-Hans'];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('resolveDetectedLanguage', () => {
  test.each([
    { language: 'en', expectedLanguage: 'en' },
    { language: 'en-US', expectedLanguage: 'en' },
    { language: 'EN-gb', expectedLanguage: 'en' },
    { language: 'zh', expectedLanguage: 'zh-Hans' },
    { language: 'zh-CN', expectedLanguage: 'zh-Hans' },
    { language: 'zh-SG', expectedLanguage: 'zh-Hans' },
    { language: 'zh-Hans-HK', expectedLanguage: 'zh-Hans' },
    { language: 'zh-Hans-TW', expectedLanguage: 'zh-Hans' },
    { language: 'zh-TW', expectedLanguage: 'und' },
    { language: 'zh-HK', expectedLanguage: 'und' },
    { language: 'zh-MO', expectedLanguage: 'und' },
    { language: 'zh-Hant', expectedLanguage: 'und' },
    { language: 'zh-Hant-CN', expectedLanguage: 'und' },
    { language: 'ZH-hANT', expectedLanguage: 'und' },
    { language: 'zh-Hani', expectedLanguage: 'und' },
    { language: 'fr-FR', expectedLanguage: 'und' },
    { language: '', expectedLanguage: 'und' },
    { language: 'cimode', expectedLanguage: 'cimode' },
  ])('resolves $language to $expectedLanguage', ({ language, expectedLanguage }) => {
    expect(resolveDetectedLanguage(language, SUPPORTED_LANGUAGES)).toBe(expectedLanguage);
  });

  test.each(['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh-Hant-CN'])(
    'resolves %s when Traditional Chinese resources are available',
    (language) => {
      expect(resolveDetectedLanguage(language, [...SUPPORTED_LANGUAGES, 'zh-Hant'])).toBe(
        'zh-Hant',
      );
    },
  );
});

test('falls back to the default language when Traditional Chinese is unavailable', async () => {
  const storage = new Map<string, string>();
  const storageApi = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  };

  vi.stubGlobal('window', {
    location: { hash: '', search: '' },
    localStorage: storageApi,
    sessionStorage: storageApi,
  });
  vi.stubGlobal('navigator', {
    language: 'zh-TW',
    languages: ['zh-TW'],
  });
  vi.stubGlobal('document', {
    cookie: '',
    documentElement: {
      getAttribute: () => 'en',
    },
  });

  const { i18n, i18nInit } = await import('./index');
  await i18nInit;

  expect(i18n.language).toBe('en');
  expect(i18n.resolvedLanguage).toBe('en');
  expect(storage.get('i18nextLng')).toBe('en');
});
