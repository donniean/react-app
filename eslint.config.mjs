// @ts-check

// import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/* const config = [
  {
    ignores: ['.history/', 'coverage/', 'dist/', '.next/'],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.es2025,
      },
    },
    rules: {
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['src/'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.devtools,
      },
    },
  },
]; */

export default tseslint.config(
  {},
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
