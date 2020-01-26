import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './reducers';

function configureStore(initialState = {}, history) {
  const router = routerMiddleware(history);

  // Create the store with three middlewares
  const middlewares = [promise, thunk, router];
  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension =
      process.env.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f;
    enhancers.push(devToolsExtension);
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  return store;
}

export default configureStore;
