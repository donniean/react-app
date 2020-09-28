import includes from 'lodash/includes';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import qs from 'qs';

const ignoreQueryPrefix = true;
const addQueryPrefix = true;

function getSearchObj({ search }) {
  return qs.parse(search, { ignoreQueryPrefix });
}

function getSearchStr(obj) {
  const newObj = omitBy(obj, (value) => !value);
  return qs.stringify(newObj, { addQueryPrefix });
}

function getNextURL({ pathname, search }) {
  const isIndex = includes(
    ['', '/', undefined, null, 'undefined', 'null'],
    pathname
  );
  if (isIndex) {
    return `${search}`;
  }
  return pathname + search;
}

function mergeObjToSearchObj({ location, obj }) {
  const currentObj = getSearchObj(location);
  return merge({}, currentObj, obj);
}

function mergeObjToSearchStr({ location, obj }) {
  const newObj = mergeObjToSearchObj({ location, obj });
  return getSearchStr({ newObj });
}

export {
  getSearchObj,
  getSearchStr,
  getNextURL,
  mergeObjToSearchObj,
  mergeObjToSearchStr,
};
