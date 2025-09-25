import path from 'node:path';

const dirname = import.meta.dirname;

const rootPath = path.resolve(dirname, '..');

function resolveRoot(...paths) {
  return path.resolve(rootPath, ...paths);
}

export { resolveRoot, rootPath };
