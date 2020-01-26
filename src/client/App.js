import '@babel/polyfill';
import 'url-search-params-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';

import configureStore from '@/store/configStore';
import history from './history';

import Pages from '@/Pages';

import '@/styles/Main.css';

const initialState = window.APP_STATE;
const store = configureStore(initialState, history);
const app = document.getElementById('app');
delete window.APP_STATE;
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <Pages />
    </Router>
  </Provider>,
  app
);

// Easy-to-use library for eliminating the 300ms delay between a
// physical tap and the firing of a click event on mobile browsers
FastClick.attach(document.body);
