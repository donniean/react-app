module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    development: {
      plugins: ['babel-plugin-styled-components', 'react-refresh/babel'],
    },
    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: false,
            fileName: false,
          },
        ],
        'lodash',
      ],
    },
  },
};
