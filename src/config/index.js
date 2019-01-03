import api from './api';
import baseURLs from './baseURLs';
import routes from './routes';

const env = 1;
const version = '1.0';

const baseURL = baseURLs[env];

export { env, version, api, baseURL, routes };
