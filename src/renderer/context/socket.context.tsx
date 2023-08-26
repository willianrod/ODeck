import { HandlerConfig, IPage } from 'interfaces';
import { useEffect, createContext, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevice, setDevices } from 'renderer/redux/ducks/devices';
import { requestConfig, setConfig } from 'renderer/redux/ducks/handlers';
import { requestIps, setIps } from 'renderer/redux/ducks/ips';
import { setKeys } from 'renderer/redux/ducks/keys';
import { setCurrentPage, setPages } from 'renderer/redux/ducks/pages';
import { socket } from 'renderer/redux/store';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<{
  socket: Socket;
}>({
  socket,
});

const SocketProvider = ({ children }: { children: ReactElement }) => {
  const selectedDevice = useSelector(
    (state: any) => state.devices.currentDevice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      if (selectedDevice) {
        dispatch(
          selectDevice({
            deviceId: selectedDevice,
            deviceType: 'ADMIN',
          })
        );
      } else {
        socket.emit(EventTypes.DEVICES.GET);
      }
    });

    socket.on(EventTypes.DEVICES.SET, (data) => {
      dispatch(setDevices(data));
    });

    socket.on(EventTypes.KEYS.SET, (data) => {
      dispatch(setKeys(data));
    });

    socket.on(EventTypes.PAGES.SET, (data: Array<IPage>) => {
      dispatch(setPages(data));
    });

    socket.on(EventTypes.PAGES.CURRENT, (data: IPage) => {
      dispatch(setCurrentPage(data));
    });

    socket.on(EventTypes.IPS.SET, (data: Array<string>) => {
      dispatch(setIps(data));
    });
    socket.on(EventTypes.SYSTEM.SET, (data: Array<HandlerConfig>) => {
      dispatch(setConfig(data));
    });
  }, [selectedDevice, dispatch]);

  useEffect(() => {
    dispatch(requestIps());
    dispatch(requestConfig());
  }, [dispatch]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
