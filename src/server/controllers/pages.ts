import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';

import { IButtonKey, IPage } from 'interfaces';
import EventTypes from '../enums/event-types.enum';
import Pages from '../db/pages';
import Keys from '../db/keys';

const pagesDb = new Pages();
const keysDb = new Keys();

const PagesController = (socket: Socket, io: Server) => ({
  createPage: (data: IPage) => {
    const pageId = uuidv4();
    pagesDb.create({ ...data, id: pageId, main: false });

    const pages = pagesDb.getByDeviceId(data.deviceId);

    socket.emit(EventTypes.PAGES.SET, pages);
  },

  deletePage: (data: IPage) => {
    if (data.main) return;

    const pageKeys = keysDb.getByPageId(data.id);
    pageKeys.forEach((key: IButtonKey) => keysDb.delete(key.id));

    pagesDb.delete(data.id);

    const pages = pagesDb.getByDeviceId(data.deviceId);

    socket.emit(EventTypes.PAGES.SET, pages);

    const mainPage = pages.find((page: IPage) => page.main) as unknown as IPage;
    if (!mainPage) return;
    const mainPageKeys = keysDb.getByPageId(mainPage.id);

    socket.emit(EventTypes.PAGES.CURRENT, mainPage);
    socket.emit(EventTypes.KEYS.SET, mainPageKeys);
  },
});

export default PagesController;
