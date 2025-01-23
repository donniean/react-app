// eslint-disable-next-line import/no-unresolved
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
// eslint-disable-next-line import/no-unresolved
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    tailwindcss(),
    checker({
      overlay: { position: 'br' },
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.css',
      },
    }),
  ],
});
