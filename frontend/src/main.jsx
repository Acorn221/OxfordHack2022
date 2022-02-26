import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);