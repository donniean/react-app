import { defineFlatConfig } from 'html-validate';
import html5 from 'html-validate/elements/html5';
import { prettier, recommended } from 'html-validate/presets';

export default defineFlatConfig([
  {
    ignores: ['**/coverage/**', '**/dist/**', '**/.next/**', '**/*.min.*'],
  },
  {
    files: ['*.html'],
    elements: [html5],
  },
  recommended,
  prettier,
]);
