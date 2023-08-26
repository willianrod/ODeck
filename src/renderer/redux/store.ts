import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import socketIOClient from 'socket.io-client';
import rootReducer from './ducks';

const ENDPOINT = 'http://localhost:3000';

export const socket = socketIOClient(ENDPOINT, {
  rejectUnauthorized: false,
  secure: true,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(socket)))
);

export default store;
