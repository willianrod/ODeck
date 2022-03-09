import { IButtonKey } from 'interfaces';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState = {
  currentKey: null,
  items: [],
};

// Types
const Types = {
  SET_KEYS: 'DECK/KEYS/SET_KEYS',
  SET_CURRENT_KEY: 'DECK/KEYS/SET_CURRENT_KEY',
  CLEAR_CURRENT_KEY: 'DECK/KEYS/CLEAR_CURRENT_KEY',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_KEYS: {
      return { ...state, items: action.keys };
    }
    case Types.SET_CURRENT_KEY: {
      return { ...state, currentKey: action.currentKey };
    }
    case Types.CLEAR_CURRENT_KEY: {
      return { ...state, currentKey: null };
    }
    default:
      return state;
  }
};

// Actions
export const setKeys = (keys: Array<IButtonKey>) => {
  return { type: Types.SET_KEYS, keys };
};

export const setCurrentKey = (currentKey: IButtonKey) => {
  return { type: Types.SET_CURRENT_KEY, currentKey };
};

export const clearCurrentKey = () => {
  return { type: Types.CLEAR_CURRENT_KEY };
};

// Thunks
export const createKey = (newKey: IButtonKey) => {
  return (dispatch: any, _getState: any, socket: Socket) => {
    dispatch(setCurrentKey(newKey));
    socket.emit(EventTypes.KEYS.CREATE, newKey);
  };
};

export const updateKey = (updatedButton: IButtonKey) => {
  return (dispatch: any, _getState: any, socket: Socket) => {
    dispatch(setCurrentKey(updatedButton));
    socket.emit(EventTypes.KEYS.UPDATE, updatedButton);
  };
};

export const deleteKey = (currentKey: IButtonKey) => {
  return (dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.KEYS.DELETE, currentKey);
    dispatch(clearCurrentKey());
  };
};

export const getKeysByPage = (pageId: string) => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.KEYS.PAGE_KEYS, pageId);
  };
};

export default reducer;
