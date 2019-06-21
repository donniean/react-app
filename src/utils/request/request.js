import merge from 'lodash/merge';

import { baseURL } from '../../config/';
import fetchBase from './fetchBase';

async function request(url, options, settings = {}) {
  const defaultSettings = {
    loading: true,
    loadingMsg: '加载中...',
    mask: true,
    showError: true
  };
  settings = merge({}, defaultSettings, settings);
  const { loading, loadingMsg, mask, showError } = settings;

  url = `${baseURL}${url}`;

  try {
    const data = await fetchBase(url, options);
    return data;
  } catch (error) {
    throw error;
  }
}

export default request;
