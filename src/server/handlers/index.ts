import * as fs from 'fs';
import * as path from 'path';
import type EventEmitter from 'events';
import type { Server } from 'socket.io';
import { HandlerConfig } from '../../interfaces';
import Handlers from '../db/handlers';
import HandlerClass from './common/handler';

const handlersDb = new Handlers();

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

export default function registerHandlers({
  io,
  signals,
}: {
  io: Server;
  signals: EventEmitter;
}) {
  const files: string[] = fs.readdirSync(__dirname);

  const configs: Map<string, HandlerConfig> = new Map();
  const handlers: Map<string, { initialize: () => void }> = new Map();

  files.forEach((file) => {
    const filePath: string = path.join(__dirname, file);
    const fileStat: fs.Stats = fs.statSync(filePath);

    if (fileStat.isFile() && !file.includes('index')) {
      const {
        default: Handler,
        config,
      }: {
        default: HandlerConstructor;
        config: HandlerConfig;
        // eslint-disable-next-line import/no-dynamic-require, global-require
      } = require(filePath);

      // const all = handlersDb.getAll();

      // all.forEach((c) => handlersDb.delete(c.id));

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
        console.log(handlersDb.getById(config.id));
      }

      const handler = new Handler({
        io,
        signals,
        id: config.id,
      });

      if (typeof handler.initialize !== 'function') {
        // eslint-disable-next-line no-console
        console.warn('Handler without initialize() method found at:', filePath);
        return;
      }

      if (!handler.ready()) return;

      handler.initialize();
      handlers.set(config.id, handler);
      configs.set(config.id, config);
    }
  });

  return { handlers, configs };
}
