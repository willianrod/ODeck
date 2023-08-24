import { IButtonKey } from 'interfaces';
import { Server, Socket } from 'socket.io';

import Keys from '../db/keys';
import { getPageKeys, propagate } from '../helpers/pages';
import EventTypes from '../enums/event-types.enum';

const keysDb = new Keys();

const KeysController = (socket: Socket, io: Server) => ({
  createKey: (data: IButtonKey) => {
    keysDb.create(data);

    propagate(data?.pageId, io);
  },
  getKeysByPage: (pageId: string) => {
    const { keys, page } = getPageKeys(pageId);

    if (!page) return;

    io.to(`${page.deviceId}-ADMIN`).emit(EventTypes.KEYS.SET, keys);
  },
  deleteKey: (data: IButtonKey) => {
    keysDb.delete(data.id);

    propagate(data.pageId, io);
  },
  updateKey: (data: IButtonKey) => {
    keysDb.update(data.id, data);

    propagate(data.pageId, io);
  },
});

export default KeysController;
