import { IButtonKey } from 'interfaces';
import { Server, Socket } from 'socket.io';

import Keys from '../db/keys';
import { getPageKeys, propagate } from '../helpers/pages';
import EventTypes from '../enums/event-types.enum';
import KeyTypes from '../enums/keys.enum';
import MediaKeys from '../enums/media-keys.enum';

import { hotkeyHandler } from '../handlers/hotkey-handler';
import { urlHandler } from '../handlers/url-handler';
import { executableHandler } from '../handlers/executable-handler';
// import { soundHandler } from '../handlers/sound-handler';
import { mediaHandler } from '../handlers/media-handler';
import { goBack, navigate } from '../handlers/navigate-handler';

const keysDb = new Keys();

const HANDLERS = {
  [KeyTypes.HOTKEY]: hotkeyHandler,
  [KeyTypes.URL]: urlHandler,
  [KeyTypes.EXECUTABLE]: executableHandler,
  // [KeyTypes.SOUND]: soundHandler,
  [KeyTypes.PLAY]: () => mediaHandler(MediaKeys.PLAY),
  [KeyTypes.STOP]: () => mediaHandler(MediaKeys.STOP),
  [KeyTypes.PREVIOUS]: () => mediaHandler(MediaKeys.PREVIOUS),
  [KeyTypes.NEXT]: () => mediaHandler(MediaKeys.NEXT),
  [KeyTypes.VOL_DOWN]: () => mediaHandler(MediaKeys.VOL_DOWN),
  [KeyTypes.VOL_UP]: () => mediaHandler(MediaKeys.VOL_UP),
  [KeyTypes.PAUSE]: () => mediaHandler(MediaKeys.PAUSE),
  [KeyTypes.MUTE]: () => mediaHandler(MediaKeys.MUTE),
  [KeyTypes.NAVIGATE]: navigate,
  [KeyTypes.GO_BACK]: goBack,
};

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
  keyPress: (keyPressed: IButtonKey) => {
    const key = keysDb.getById(keyPressed.id);

    if (key) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const handler = HANDLERS[key.type];

      handler(key, socket);
    }
  },
});

export default KeysController;
