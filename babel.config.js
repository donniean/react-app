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
    plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components']
};

module.exports = config;
