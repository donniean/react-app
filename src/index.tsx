import '@/styles/globals/index.css';
import '@/styles/themes/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

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
