import { cloneDeep } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function trim(target: unknown) {
  const result = cloneDeep(target);

  if (result === null) {
    return result;
  }

  if (typeof result === 'string') {
    return result.trim();
  }

  if (typeof result === 'object') {
    Object.entries(result).forEach(([key, value]) => {
      result[key] = trim(value);
    });
  }

  return result;
}
