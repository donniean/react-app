import merge from 'lodash/merge';

import { baseURL, apiPath } from '../../config/';
import fetchBase from './fetchBase';

const defaultOptions = {
  method: 'POST'
};

const defaultSettings = {
  baseURL,
  apiPath,
  isShowLoading: true,
  isShowError: true,
  isHandleTokenInvalid: true,
  loadingOptions: {}
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
  options = merge({}, defaultOptions, options);
  settings = merge({}, defaultSettings, settings);
  const { baseURL, apiPath } = settings;
  url = `${baseURL}${apiPath}${url}`;
  return fetchBase(url, options).then(handleData);
};
