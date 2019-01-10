const config = api => {
  const prodMode = api.env('production');
  const commonPlugins = [
    'react-hot-loader/babel',
    'babel-plugin-styled-components'
  ];
  const plugins = prodMode
    ? [...commonPlugins, 'transform-react-remove-prop-types']
    : commonPlugins;
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage'
        }
      ],
      '@babel/preset-react'
    ],
    plugins
  };
  return config;
};

module.exports = config;
