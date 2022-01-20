const API = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: '8080',
  pathname: '/api',
};

module.exports = {
  publicPath: '/',
  client: {
    documentTitle: 'React App',
  },
  server: {
    port: '3000',
    proxy: {
      [API.pathname]: `${API.protocol}://${API.hostname}:${API.port}`,
    },
  },
  api: API,
};
