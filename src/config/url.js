const baseURLDev = '';
const apiPath = '';

const { protocol, hostname } = window.location;
let baseURL = `${protocol}//${hostname}`;

if (process.env.NODE_ENV === 'development') {
  baseURL = baseURLDev;
}

export { baseURL, apiPath };
export default { baseURL, apiPath };
