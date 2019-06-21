const path = require('path');
const { public: publicPath } = require('./paths');

module.exports = {
  logo: path.resolve(publicPath, 'favicon.ico'),
  prefix: 'assets/icons-[hash]/',
  title: 'React App',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: true
  }
};
