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

function request(url, options, settings = {}) {
  settings = merge({}, defaultSettings, settings);
  console.log(settings);
  return fetchBase(url, options);
}

export default request;
