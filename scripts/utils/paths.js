const path = require('path');

const rootDirectory = process.cwd();

const resolveWithRoot = (...relativePaths) =>
  path.resolve(rootDirectory, ...relativePaths);

module.exports = {
  resolveWithRoot,
  root: rootDirectory,
  nodeModules: resolveWithRoot('node_modules'),
  scripts: resolveWithRoot('scripts'),
  webpack: resolveWithRoot('webpack'),
  public: resolveWithRoot('public'),
  src: resolveWithRoot('src'),
  dist: resolveWithRoot('dist'),
  packageJson: resolveWithRoot('package.json'),
};
