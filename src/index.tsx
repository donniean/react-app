import '@/styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { i18nInit } from '@/lib/i18n';

import { App } from './app';

await i18nInit;

const element = document.querySelector('#root');

if (!element) {
  throw new Error('Root element not found');
}

const root = createRoot(element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
