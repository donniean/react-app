import merge from 'lodash/merge';
import includes from 'lodash/includes';
import omitBy from 'lodash/omitBy';
import qs from 'qs';

const ignoreQueryPrefix = true;
const addQueryPrefix = true;

function getSearchObj({ search }) {
  const obj = qs.parse(search, { ignoreQueryPrefix });
  return obj;
}

function getSearchStr(obj) {
  const newObj = omitBy(obj, value => !value);
  const str = qs.stringify(newObj, { addQueryPrefix });
  return str;
}

function getNextURL({ pathname, search }) {
  const isIndex = includes(
    ['', '/', undefined, null, 'undefined', 'null'],
    pathname
  );
  if (isIndex) {
    return '' + search;
  } else {
    return pathname + search;
  }
}

function mergeObjToSearchObj({ location, obj }) {
  const currentObj = getSearchObj(location);
  const newObj = merge({}, currentObj, obj);
  return newObj;
}

function mergeObjToSearchStr({ location, obj }) {
  const newObj = mergeObjToSearchObj({ location, obj });
  const str = getSearchStr({ newObj });
  return str;
}

export {
  getSearchObj,
  getSearchStr,
  getNextURL,
  mergeObjToSearchObj,
  mergeObjToSearchStr
};
