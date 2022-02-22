import { cloneDeep } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function trim(target: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = cloneDeep(target);

  if (result === null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }

  if (typeof result === 'string') {
    return result.trim();
  }

  if (typeof result === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.entries(result).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      result[key] = trim(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
