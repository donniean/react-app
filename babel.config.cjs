module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
    production: {
      plugins: [
        [
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
