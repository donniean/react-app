import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const cwd = process.cwd();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd);
  const apiUrl = env.VITE_API_BASE_URL;

  const proxy = {
    '/api': apiUrl,
  };

  return {
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    plugins: [
      tsconfigPaths(),
      react({
        babel: {
          plugins: [
            'babel-plugin-react-compiler',
            '@lingui/babel-plugin-lingui-macro',
          ],
        },
      }),
      lingui(),
      svgr(),
      tailwindcss(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          useFlatConfig: true,
        },
        overlay: { initialIsOpen: 'error' },
        stylelint: {
          lintCommand: 'stylelint ./src/**/*.css',
        },
        typescript: true,
      }),
    ],
    preview: {
      host: true,
      port: 3000,
      proxy,
    },
    server: {
      host: true,
      port: 3000,
      proxy,
    },
  };
});
