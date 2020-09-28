module.exports = {
  languages: {
    js: true,
    jsx: true,
    css: true,
    scss: true,
    html: true,
    json: true,
    md: true,
  },
  env: 'es6',
  modules: {
    editorconfig: true,
    prettier: true,
    eslint: [
      true,
      { 'eslint-plugin-simple-import-sort': [true, { files: ['./src/**/*'] }] },
    ],
    stylelint: [true, { 'styled-components': true }],
    htmlhint: true,
    cspell: true,
    commitlint: true,
    'lint-staged': true,
    gitignore: true,
    gitattributes: true,
    license: true,
  },
};
