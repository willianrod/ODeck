import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState: Array<string> = [];

// Types
const Types = {
  SET_IPS: 'DECK/IPS/SET_IPS',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_IPS: {
      return action.ips;
    }
    default:
      return state;
  }
};

// Actions
export const setIps = (ips: Array<string>) => {
  return { type: Types.SET_IPS, ips };
};

// Thunks
export const requestIps = () => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.IPS.GET);
  };
};

export default reducer;
