import { HandlerData } from 'interfaces';
import { Server, Socket } from 'socket.io';

import EventTypes from '../enums/event-types.enum';
import Handlers from '../db/handlers';

const handlersDb = new Handlers();

const HandlersController = (socket: Socket, io: Server) => ({
  createKey: (data: HandlerData) => {
    handlersDb.create(data);
  },
  getHandlersData: () => {
    const handlersData = handlersDb.getAll();

    socket.emit(EventTypes.HANDLERS.SET, handlersData);
  },
  updateHandlers: (payload: HandlerData[]) => {
    const entries = Object.entries(payload);
    entries.forEach(([id, handler]) => {
      const handlerData = handlersDb.getById(id);
      console.log(handler);

      if (!handlerData) return;

      handlersDb.update(id, {
        id,
        data: {
          ...handler,
        },
      });
    });
    console.log(handlersDb.getAll());
  },
});

export default HandlersController;
