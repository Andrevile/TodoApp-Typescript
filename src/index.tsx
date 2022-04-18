import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/static/styles/reset.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
if (module.hot) {
  module.hot.accept('./App', () => {
    root.render(<App />);
  });
}
