import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import './assets/css/reset.less';
import './assets/css/animate.less';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode> // 严格模式下 antd 会有 警告
  <Router>
    <App />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
