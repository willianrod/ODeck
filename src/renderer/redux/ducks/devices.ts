import { IDevice } from 'interfaces';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState = {
  currentDevice: null,
  items: [],
};

// Types
const Types = {
  SET_DEVICES: 'DECK/DEVICES/SET_DEVICES',
  SET_CURRENT_DEVICE: 'DECK/DEVICES/SET_CURRENT_DEVICE',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_DEVICES: {
      return { ...state, items: action.devices };
    }
    case Types.SET_CURRENT_DEVICE: {
      return { ...state, currentDevice: action.device };
    }
    default:
      return state;
  }
};

// Actions
export const setDevices = (devices: Array<IDevice>) => {
  return { type: Types.SET_DEVICES, devices };
};

export const setCurrentDevice = (device: IDevice) => {
  return { type: Types.SET_CURRENT_DEVICE, device };
};

// Thunks
export const selectDevice = ({ device, deviceType }: any) => {
  return (dispatch: any, _getState: any, socket: Socket) => {
    dispatch(setCurrentDevice(device));
    socket.emit(EventTypes.DEVICES.SELECT, {
      deviceId: device.id,
      deviceType,
    });
  };
};

export const getDevices = () => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.DEVICES.GET);
  };
};

export const createDevice = (device: IDevice) => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.DEVICES.CREATE, device);
  };
};

export default reducer;
