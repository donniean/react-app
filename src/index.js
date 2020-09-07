// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

function render() {
  // eslint-disable-next-line react/jsx-filename-extension
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
