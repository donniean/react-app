import { createRoot } from 'react-dom/client';

import { App } from './App';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(<App />);
