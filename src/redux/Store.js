
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  return rootReducer(state, action);
};

let store;
const initStore = () => {
  store = store ?? createStore(reducer, bindMiddleware([thunkMiddleware]));
  return store;
};

export const Store = initStore();

export default createWrapper(initStore);
