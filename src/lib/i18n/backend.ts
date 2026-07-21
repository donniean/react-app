import resourcesToBackend from 'i18next-resources-to-backend';

import { resourceModules } from './resources';

export const backend = resourcesToBackend((language: string, namespace: string) => {
  const key = `../../locales/${language}/${namespace}.json`;
  const resourceModule = resourceModules[key];
  if (!resourceModule) {
    return Promise.reject(new Error(`Missing i18n file: ${key}`));
  }
  return resourceModule();
});
