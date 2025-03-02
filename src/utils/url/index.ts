import { includes, merge, omitBy } from 'lodash';
import * as qs from 'qs';

const ignoreQueryPrefix = true;
const addQueryPrefix = true;

function getSearchObj({ search }: { search: string }) {
  return qs.parse(search, { ignoreQueryPrefix });
}

function getSearchStr(obj: Record<string, unknown>) {
  const newObj = omitBy(obj, (value) => !value);
  return qs.stringify(newObj, { addQueryPrefix });
}

function getNextURL({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}) {
  const isIndex = includes(
    ['', '/', undefined, null, 'undefined', 'null'],
    pathname,
  );
  if (isIndex) {
    return search;
  }
  return pathname + search;
}

function mergeObjToSearchObj({
  location,
  obj,
}: {
  location: { search: string };
  obj: Record<string, unknown>;
}) {
  const currentObj = getSearchObj(location);
  return merge({}, currentObj, obj);
}

function mergeObjToSearchStr({
  location,
  obj,
}: {
  location: { search: string };
  obj: Record<string, unknown>;
}) {
  const newObj = mergeObjToSearchObj({ location, obj });
  return getSearchStr({ newObj });
}

export {
  getNextURL,
  getSearchObj,
  getSearchStr,
  mergeObjToSearchObj,
  mergeObjToSearchStr,
};
