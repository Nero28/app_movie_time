import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import serviseWorker from './serviseWorker'

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  //Provide our store to the app
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
serviseWorker();
