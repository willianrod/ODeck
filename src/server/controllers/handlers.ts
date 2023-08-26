import { HandlerConfig, HandlerData } from 'interfaces';
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
  getPublicHandlersData: (configs: HandlerConfig[]) => {
    const handlersData = handlersDb.getAll();
    const values = {} as Record<string, unknown>;

    configs.forEach((config) => {
      const currentConfig = handlersData.find((h) => h.id === config.id);
      if (!currentConfig) return;
      const handlerConfigValues = {
        active: currentConfig.data.active,
      } as Record<string, unknown>;
      config.config.forEach((c) => {
        if (c.secret) return;
        handlerConfigValues[c.name] = currentConfig.data[c.name];
      });
      values[config.id] = handlerConfigValues;
    });

    return values;
  },
  updateHandlers: (payload: HandlerData[]) => {
    const entries = Object.entries(payload);
    entries.forEach(([id, handler]) => {
      const handlerData = handlersDb.getById(id);

      if (!handlerData) return;

      const newData = Object.entries(handler).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]:
            typeof value === 'boolean' ? value : value || handlerData.data[key],
        };
      }, {});

      handlersDb.update(id, {
        id,
        data: {
          ...newData,
        },
      });
    });
  },
  sendCurrentHandlersConfig(registeredHandlers: {
    handlers: Map<
      string,
      {
        initialize: () => void;
      }
    >;
    configs: Map<string, HandlerConfig>;
  }) {
    const configs = Array.from(registeredHandlers.configs.values());

    socket.emit(EventTypes.HANDLERS.SET, {
      initialized: Array.from(registeredHandlers.handlers.keys()),
      currentConfig: this.getPublicHandlersData(configs),
      configs,
    });
  },
});

export default HandlersController;
