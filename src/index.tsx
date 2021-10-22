import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import Guardian from './Guardian';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Guardian />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
