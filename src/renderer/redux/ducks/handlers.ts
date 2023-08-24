import { HandlerConfig } from 'interfaces';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState: Array<HandlerConfig<unknown>> = [];

// Types
const Types = {
  SET_CONFIG: 'HANDLER/CONFIG/SET_CONFIG',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_CONFIG: {
      return action.config;
    }
    default:
      return state;
  }
};

// Actions
export const setConfig = (config: Array<HandlerConfig<unknown>>) => {
  return { type: Types.SET_CONFIG, config };
};

// Thunks
export const requestConfig = () => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.SYSTEM.GET);
  };
};

export default reducer;
