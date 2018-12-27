const autoprefixer = require('autoprefixer');

module.exports = ({ env, file, options }) => {
  return {
    plugins: [autoprefixer]
  };
};
