import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { viewerReducer as viewer } from '../components/Viewer/store';

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export default (initialState, options) => {
  const rootReducer = combineReducers({
    viewer,
  });

  return createStore(
    rootReducer, // persistReducer(persistConfig, rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
