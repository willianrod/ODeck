import { IButtonKey, IDevice } from 'interfaces';
import { Socket } from 'socket.io';
import Devices from '../db/devices';
import Keys from '../db/keys';
import Pages from '../db/pages';

const devicesDb = new Devices();
const pagesDb = new Pages();
const keysDb = new Keys();

const getDeviceByPageId = (pageId: string) => {
  const page = pagesDb.getById(pageId);
  if (!page) return undefined;
  const device = devicesDb.getById(page.deviceId);
  return device;
};

export const navigate = (keyPressed: IButtonKey, socket: Socket) => {
  const device = getDeviceByPageId(keyPressed.pageId);

  if (!device || !keyPressed.actionConfig.pageId) return;

  const newDevice = {
    ...device,
    breadcumb: [...device.breadcumb, keyPressed.actionConfig.pageId],
  } as IDevice;

  devicesDb.update(device.id, newDevice);

  const keys = keysDb.getByPageId(keyPressed.actionConfig.pageId);

  socket.emit('SET_KEYS', keys);
};

export const goBack = (keyPressed: IButtonKey, socket: Socket) => {
  const device = getDeviceByPageId(keyPressed.pageId);

  if (!device || device.breadcumb.length === 1) return;

  const newBreadcumb = [...device.breadcumb];
  newBreadcumb.pop();

  const previousPage = newBreadcumb.at(-1);

  const newDevice = {
    ...device,
    breadcumb: newBreadcumb,
  } as IDevice;

  devicesDb.update(device.id, newDevice);

  if (!previousPage) return;

  const keys = keysDb.getByPageId(previousPage);

  socket.emit('SET_KEYS', keys);
};
