import path from 'node:path';

const dirname = import.meta.dirname;

const rootPath = path.resolve(dirname, '..');

function resolveRoot(...args) {
  return path.resolve(rootPath, ...args);
}

export { resolveRoot, rootPath };
