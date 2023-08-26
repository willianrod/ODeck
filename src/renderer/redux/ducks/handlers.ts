import { HandlerConfig } from 'interfaces';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState: {
  currentConfig: Record<string, unknown>;
  configs: Array<HandlerConfig>;
  initialized: string[];
} = {
  configs: [],
  currentConfig: {},
  initialized: [],
};

// Types
const Types = {
  SET_CONFIG: 'HANDLER/CONFIG/SET_CONFIG',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_CONFIG: {
      return action.payload;
    }
    default:
      return state;
  }
};

// Actions
export const setConfig = (payload: {
  configs: Array<HandlerConfig>;
  currentConfig: Record<string, unknown>;
  initialized: string[];
}) => {
  return { type: Types.SET_CONFIG, payload };
};

// Thunks
export const requestConfig = () => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.HANDLERS.GET);
  };
};

export default reducer;
