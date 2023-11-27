// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3Provider } from './context/Web3Context';

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
