import { combineReducers } from 'redux';
import devicesReducer from './devices';
import keysReducer from './keys';
import pagesReducer from './pages';
import ipsReducer from './ips';
import handlersReducer from './handlers';

const rootReducer = combineReducers({
  devices: devicesReducer,
  keys: keysReducer,
  pages: pagesReducer,
  ips: ipsReducer,
  handlers: handlersReducer,
});

export default rootReducer;
