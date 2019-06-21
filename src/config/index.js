import { version, pageSize } from './app';
import api from './api';
import baseURLs from './baseURLs';

const env = 1;

const baseURL = baseURLs[env];

export { env, version, baseURL, api, pageSize };
