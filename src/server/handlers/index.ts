import * as fs from 'fs';
import * as path from 'path';
import type EventEmitter from 'events';
import type { Server } from 'socket.io';
import { HandlerConfig } from '../../interfaces';

export default function registerHandlers({
  io,
  signals,
}: {
  io: Server;
  signals: EventEmitter;
}) {
  const files: string[] = fs.readdirSync(__dirname);

  const configs: Map<string, HandlerConfig<unknown>> = new Map();
  const handlers: Map<string, { initialize: () => void }> = new Map();

  files.forEach((file) => {
    const filePath: string = path.join(__dirname, file);
    const fileStat: fs.Stats = fs.statSync(filePath);

    if (fileStat.isFile() && !file.includes('index')) {
      const {
        default: Handler,
        config,
      }: {
        default: any;
        config: HandlerConfig<unknown>;
        // eslint-disable-next-line import/no-dynamic-require, global-require
      } = require(filePath);

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
