const API = {
  origin: 'http://127.0.0.1:8080',
  basePath: '/api',
};

const WebSocket = {
  origin: 'ws://127.0.0.1:8081',
  basePath: '/ws',
};

module.exports = {
  backend: {
    api: API,
    webSocket: WebSocket,
  },
  server: {
    port: '3000',
    proxy: {
      [API.basePath]: API.origin,
      /* [WebSocket.basePath]: {
        target: WebSocket.origin,
        ws: true,
      }, */
    },
  },
};
