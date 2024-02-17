import type EventEmitter from 'events';
import type { Server } from 'socket.io';
import { HandlerConfig } from '../../interfaces';
import Handlers from '../db/handlers';
import HandlerClass from './common/handler';

import ExecutableHandler, { config as executableConfig } from './executable';
import HotkeyHandler, { config as hotkeyConfig } from './hotkey';
import MediaHandler, { config as mediaConfig } from './media';
import NavigationHandler, { config as navigationConfig } from './navigation';
import SoundHandler, { config as soundConfig } from './sound';
import UrlHandler, { config as urlConfig } from './url';
import CommandHandler, { config as commandConfig } from './command';
import HomeAssistantHandler, { config as homeassistantConfig } from "./homeassistant";

interface HandlerConstructor {
  new ({
    io,
    signals,
    id,
  }: {
    io: Server;
    signals: EventEmitter;
    id: string;
  }): HandlerClass;
}

const HANDLERS: [HandlerConstructor, HandlerConfig][] = [
  [ExecutableHandler, executableConfig],
  [HotkeyHandler, hotkeyConfig],
  [MediaHandler, mediaConfig],
  [NavigationHandler, navigationConfig],
  [SoundHandler, soundConfig],
  [UrlHandler, urlConfig],
  [CommandHandler, commandConfig],
  [HomeAssistantHandler, homeassistantConfig],
];

const handlersDb = new Handlers();

const initializeHandlerData = ({ config }: { config: HandlerConfig }) => {
  const handlerData = handlersDb.getById(config.id);

  if (!handlerData) {
    const configValues = config.config.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.defaultValue,
      };
    }, {});
    handlersDb.create({
      id: config.id,
      data: {
        active: config.defaultActive,
        ...configValues,
      },
    });
  } else {
    const configValues = config.config.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: handlerData.data[curr.name] || curr.defaultValue,
      };
    }, {} as Record<string, unknown>);
    handlersDb.update(config.id, {
      id: config.id,
      data: {
        ...handlerData.data,
        ...configValues,
      },
    });
  }
};

export default function registerHandlers({
  io,
  signals,
}: {
  io: Server;
  signals: EventEmitter;
}) {
  const configs: Map<string, HandlerConfig> = new Map();
  const handlers: Map<string, { initialize: () => void }> = new Map();

  HANDLERS.forEach(([Handler, config]) => {
    initializeHandlerData({ config });

    const handler = new Handler({
      io,
      signals,
      id: config.id,
    });

    configs.set(config.id, config);
    const handlerConfig = handlersDb.getById(config.id);

    if (typeof handler.initialize !== 'function') {
      // eslint-disable-next-line no-console
      throw new Error('Each handler must have an initialize() method');
    }

    if (!handlerConfig?.data.active) return;
    handler.initialize();
    handlers.set(config.id, handler);
  });

  return { handlers, configs };
}
