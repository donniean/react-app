const { protocol, hostname } = window.location;
let baseURL = `${protocol}//${hostname}`;

if (process.env.NODE_ENV === 'development') {
  baseURL = '';
}

export default baseURL;
