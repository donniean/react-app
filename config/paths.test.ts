import path from 'node:path';

import { describe, expect, test } from 'vitest';

import { resolveRoot, rootPath } from './paths';

describe('config/paths', () => {
  test('rootPath is parent of config dir', () => {
    const expected = path.resolve(import.meta.dirname, '..');
    expect(rootPath).toBe(expected);
  });

  test('resolveRoot without args returns rootPath', () => {
    expect(resolveRoot()).toBe(rootPath);
  });

  test('resolveRoot joins with provided segments', () => {
    expect(resolveRoot('src')).toBe(path.resolve(rootPath, 'src'));
    expect(resolveRoot('config', 'paths.ts')).toBe(
      path.resolve(rootPath, 'config', 'paths.ts'),
    );
  });
});
