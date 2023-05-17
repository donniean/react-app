import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,scss}',
      },
    }),
  ],
});
