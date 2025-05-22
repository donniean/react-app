import { describe, expect, test } from 'vitest';

import { getSearchStr } from './index';

describe('test getSearchStr', () => {
  test('basic', () => {
    const obj = { a: 1, b: 2 };
    expect(getSearchStr(obj)).toBe('?a=1&b=2');
  });
});
