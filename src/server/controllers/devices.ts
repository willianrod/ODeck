import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { ICreateDevice, IDevice, ISelectDevice } from 'interfaces';
import EventTypes from '../enums/event-types.enum';
import { getCurrentPageKeys } from '../helpers/pages';
import Devices from '../db/devices';
import Pages from '../db/pages';

const devicesDb = new Devices();
const pagesDb = new Pages();

const DeviceControler = (socket: Socket, io: Server) => ({
  getDevices: () => {
    const devices = devicesDb.getAll();
    socket.emit(EventTypes.DEVICES.SET, devices);
  },
  createDevice: ({
    name,
    amountHorizontal = 8,
    amountVertical = 4,
  }: ICreateDevice) => {
    const pageId = uuidv4();
    const deviceId = uuidv4();
    const newDevice = {
      id: deviceId,
      name,
      amountHorizontal,
      amountVertical,
      breadcumb: [pageId],
    } as IDevice;

    devicesDb.create(newDevice);

    pagesDb.create({
      deviceId,
      id: pageId,
      main: true,
      name: 'Main Page',
    });

    const devices = devicesDb.getAll();
    socket.emit(EventTypes.DEVICES.SET, devices);
  },
  selectDevice: ({ deviceId, deviceType }: ISelectDevice) => {
    const device = devicesDb.getById(deviceId);

    if (!device) return;

    socket.join(`${deviceId}-${deviceType}`);

    const pages = pagesDb.getByDeviceId(deviceId);
    const { page, keys } = getCurrentPageKeys(device);

    socket.emit(EventTypes.DEVICES.CURRENT, device);
    socket.emit(EventTypes.PAGES.SET, pages);
    socket.emit(EventTypes.PAGES.CURRENT, page);
    socket.emit(EventTypes.KEYS.SET, keys);
  },
});

export default DeviceControler;
