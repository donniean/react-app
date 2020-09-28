import merge from 'lodash/merge';

import { API_PATH, BASE_URL } from '@/constants';

import fetchBase from './fetchBase';

const defaultOptions = {
  method: 'POST',
};

const defaultSettings = {
  baseURL: BASE_URL,
  apiPath: API_PATH,
  isShowLoading: true,
  isShowError: true,
  isHandleTokenInvalid: true,
  loadingOptions: {},
};

function handleData(data) {
  // custom code
  // example
  /* const { status, message } = data;
  if (status === 1) {
    return data;
  } else {
    const error = new Error(message);
    error.data = data;
    return Promise.reject(error);
  } */
  return data;
}

export default (url, options, settings = {}) => {
  const opts = merge({}, defaultOptions, options);
  const s = merge({}, defaultSettings, settings);
  const { baseURL, apiPath } = s;
  const fullURL = `${baseURL}${apiPath}${url}`;
  return fetchBase(fullURL, opts).then(handleData);
};
