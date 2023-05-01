// eslint-disable-next-line import/no-extraneous-dependencies
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes'); // cspell: disable-line
// eslint-disable-next-line import/no-extraneous-dependencies
const postcssPresetEnv = require('postcss-preset-env');

module.exports = () => ({
  plugins: [
    /* cspell: disable-next-line */
    postcssFlexbugsFixes,
    postcssPresetEnv({ stage: 0, autoprefixer: {} }),
  ],
});
