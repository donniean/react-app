const path = require('path');

const rootPath = process.cwd();

const resolveRoot = (...relativePaths) =>
  path.resolve(rootPath, ...relativePaths);

module.exports = {
  resolveRoot,
  root: rootPath,
  nodeModules: resolveRoot('node_modules'),
  scripts: resolveRoot('scripts'),
  webpack: resolveRoot('webpack'),
  public: resolveRoot('public'),
  src: resolveRoot('src'),
  dist: resolveRoot('dist'),
  packageJson: resolveRoot('package.json'),
};
