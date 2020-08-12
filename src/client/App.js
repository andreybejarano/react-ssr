import '@babel/polyfill';
import 'url-search-params-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';
import { JssProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';

import theme from '@/theme';
import configureStore from '@/store/configStore';
import history from './history';

import Pages from '@/Pages';

import '@/styles/Main.css';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const generateClassName = createGenerateClassName();

  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history}>
            <CssBaseline />
            <Pages />
          </Router>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
}

const initialState = window.APP_STATE;
const store = configureStore(initialState, history);
const app = document.getElementById('app');
delete window.APP_STATE;
ReactDOM.hydrate(
  <Main />,
  app
);

// Easy-to-use library for eliminating the 300ms delay between a
// physical tap and the firing of a click event on mobile browsers
FastClick.attach(document.body);
