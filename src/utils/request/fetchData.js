import 'whatwg-fetch';
import merge from 'lodash/merge';

function fetchData(url, options = {}) {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  };

  options = merge({}, defaultOptions, options);

  let { body, data } = options;

  if (data) {
    if (!body) {
      body = JSON.stringify(data);
      options = merge({ body }, options);
    }
    data && delete options.data;
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(handleData)
    .catch(handleError);
}

function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  } else {
    const error = new Error();
    error.type = 1;
    error.response = response;
    return Promise.reject(error);
  }
}

function handleData(data) {
  const status = data.status;
  const isLoading = false;
  if (status === 1) {
    return data;
  } else {
    const error = new Error();
    error.type = 0;
    error.data = data;
    return Promise.reject(error);
  }
}

/**
 *
 * error.type {number}
 *  0      请求成功，但业务出错
 *  1      response.status不在200-300之间
 *  其他   网络错误
 */
function handleError(error) {
  const { type, data, response } = error;
  const isLoading = false;
  let message = '';
  switch (type) {
    case 0:
      message = data.message;
      break;
    case 1:
      message = '请求错误！';
      break;
    default:
      message = '请求错误！请检查网络！';
      break;
  }
  error.message = message;
  return Promise.reject(error);
}

export default fetchData;
