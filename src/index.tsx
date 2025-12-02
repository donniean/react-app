import '@/styles';
import '@/lib/i18n';
import '@/lib/sentry';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

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
