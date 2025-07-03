import resourcesToBackend from 'i18next-resources-to-backend';

import { modules } from './utils';

export const backend = resourcesToBackend(
  (language: string, namespace: string) => {
    const key = `../../locales/${language}/${namespace}.json`;
    const module = modules[key];
    if (!module) {
      return Promise.reject(new Error(`Missing i18n file: ${key}`));
    }
    return module();
  },
);
