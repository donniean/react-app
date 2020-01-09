import merge from 'lodash/merge';

import { baseURL, apiPath } from '../../config/';
import fetchBase from './fetchBase';

const defaultSettings = {
  baseURL,
  apiPath,
  baseApiPath: '',
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
  settings = merge({}, defaultSettings, settings);
  console.log(settings);
  return fetchBase(url, options).then(handleData);
};
