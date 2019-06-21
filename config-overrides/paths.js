const path = require('path');

const rootDirectory = process.cwd();

const resolveApp = relativePath => path.resolve(rootDirectory, relativePath);

const paths = {
  root: resolveApp('.'),
  public: resolveApp('public'),
  src: resolveApp('src'),
  dist: resolveApp('dist')
};

module.exports = paths;
