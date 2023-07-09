import '@/styles/globals/index.css';
import '@/styles/themes/index.css';

import { createRoot } from 'react-dom/client';

import { App } from './App';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(<App />);
