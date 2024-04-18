import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    throw error;
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);

export { instance as request };
