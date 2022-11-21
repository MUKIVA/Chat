import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import {BrowserRouter as Router} from 'react-router-dom';

export const store = createStore()

ReactDOM.render(
  <React.StrictMode>
      <context.Provider value={store}>
        <Router>
          <App />
        </Router>
      </context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
