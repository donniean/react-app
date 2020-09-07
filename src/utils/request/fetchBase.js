import merge from 'lodash/merge';

const defaultOptions = {
  headers: {
    'content-type': 'application/json',
  },
};

function checkStatus(response) {
  const { status, statusText } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(statusText);
  error.response = response;
  return Promise.reject(error);
}

export default (url, options = {}) => {
  let opts = merge({}, defaultOptions, options);
  const { data } = opts;
  let { body } = opts;

  if (data) {
    if (!body) {
      body = JSON.stringify(data);
      opts = merge({ body }, opts);
    }
    delete opts.data;
  }

  return fetch(url, options)
    .then(checkStatus)
    .then((response) => response.json());
};
