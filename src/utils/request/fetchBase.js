import 'whatwg-fetch';
import merge from 'lodash/merge';

const defaultOptions = {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
};

function checkStatus(response) {
  const { status, statusText } = response;
  if (status >= 200 && status < 300) {
    return response;
  } else {
    const error = new Error(statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export default (url, options = {}) => {
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
    .then(response => response.json());
};
