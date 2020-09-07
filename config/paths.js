const path = require('path');

const rootDirectory = process.cwd();

const resolveApp = (relativePath) => path.resolve(rootDirectory, relativePath);

module.exports = {
  root: resolveApp('.'),
  config: resolveApp('config'),
  public: resolveApp('public'),
  src: resolveApp('src'),
  dist: resolveApp('dist'),
};
