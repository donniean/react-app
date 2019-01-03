import api from './api';
import baseURLs from './baseURLs';
import routes from './routes';

const env = 0;

const baseURL = baseURLs[env];

export { env, api, baseURL, routes };
