import { IButtonKey, IDevice, IPage } from 'interfaces';
import { Server } from 'socket.io';

import Devices from '../db/devices';
import Pages from '../db/pages';
import Keys from '../db/keys';

const devicesDb = new Devices();
const pagesDb = new Pages();
const keysDb = new Keys();

export const getPageKeys = (
  pageId: string
): { page: IPage | undefined; keys: Array<IButtonKey> } => {
  const page = pagesDb.getById(pageId);
  const keys = keysDb.getByPageId(pageId);

  return {
    page,
    keys,
  };
};

export const getCurrentPageKeys = (
  device: IDevice
): { page: IPage | undefined; keys: Array<IButtonKey> } => {
  const currentPageId = device.breadcumb?.at(-1);
  if (!currentPageId) return { page: undefined, keys: [] };

  return getPageKeys(currentPageId);
};

export const sendDeckKeys = (deviceId: string, io: Server) => {
  const device = devicesDb.getById(deviceId) as IDevice;

  const { keys } = getCurrentPageKeys(device);
  io.to(`${deviceId}-DECK`).emit('SET_KEYS', keys);
};

export const sendAdminKeys = (pageId: string, io: Server) => {
  const { keys, page } = getPageKeys(pageId);
  io.to(`${page?.deviceId}-ADMIN`).emit('SET_KEYS', keys);
};

export const propagate = (pageId: string | undefined, io: Server) => {
  if (!pageId) return;
  const page = pagesDb.getById(pageId);

  if (page?.deviceId) {
    sendAdminKeys(page.id, io);
    sendDeckKeys(page.deviceId, io);
  }
};
