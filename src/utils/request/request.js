import merge from 'lodash/merge';

import { version, baseURL } from '../../config/';
import fetchData from './fetchData';

async function request(url, options, settings = {}) {
  const defaultSettings = {
    loading: true,
    loadingMsg: '加载中...',
    mask: true,
    showError: true
  };
  settings = merge({}, defaultSettings, settings);
  const { loading, loadingMsg, mask, showError } = settings;

  const token = getToken();
  url = `${baseURL}?ifname=${url}&ifversion=${1.0}`;
  token && (url = `${url}&api_token=${token}`);

  try {
    const data = await fetchData(url, options);
    return data;
  } catch (error) {
    throw error;
  }
}

function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

export default request;
