// cSpell: ignore unstub
import { expect, test, vi } from 'vitest';

test('normalizes the preferred browser language before matching supported languages', async () => {
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
    language: 'zh-CN',
    languages: ['zh-CN', 'zh'],
  });
  vi.stubGlobal('document', {
    cookie: '',
    documentElement: {
      getAttribute: () => 'en',
    },
  });

  try {
    const { i18n, i18nInit } = await import('./index');
    await i18nInit;

    expect(i18n.language).toBe('zh-Hans');
    expect(i18n.resolvedLanguage).toBe('zh-Hans');
    expect(storage.get('i18nextLng')).toBe('zh-Hans');
  } finally {
    vi.unstubAllGlobals();
  }
});
