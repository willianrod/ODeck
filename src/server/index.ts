import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import EventEmitter from 'events';

import DeviceControler from './controllers/devices';
import IpsController from './controllers/ips';
import KeysController from './controllers/keys';
import PagesController from './controllers/pages';
import EventTypes from './enums/event-types.enum';

import registerHandlers from './handlers';
import { IButtonKey } from '../interfaces';
import HandlersController from './controllers/handlers';

const signals = new EventEmitter();

const startServer = () => {
  const expressApp = express();
  expressApp.use(cors());
  const server = http.createServer(expressApp);

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  let registeredHandlers = registerHandlers({
    io,
    signals,
  });

  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('Device connected', socket.id);

    const deviceController = DeviceControler(socket, io);
    const keysController = KeysController(socket, io);
    const pagesController = PagesController(socket, io);
    const ipsController = IpsController(socket, io);
    const handlersController = HandlersController(socket, io);

    socket.on(EventTypes.HANDLERS.GET, () => {
      handlersController.sendCurrentHandlersConfig(registeredHandlers);
    });

    // Devices
    socket.on(EventTypes.DEVICES.GET, deviceController.getDevices);

    socket.on(EventTypes.DEVICES.CREATE, deviceController.createDevice);

    socket.on(EventTypes.DEVICES.SELECT, deviceController.selectDevice);

    socket.on(EventTypes.DEVICES.DELETE, deviceController.deleteDevice);

    // // IPs
    socket.on(EventTypes.IPS.GET, ipsController.getIps);

    // Pages
    socket.on(EventTypes.PAGES.CREATE, pagesController.createPage);
    socket.on(EventTypes.PAGES.DELETE, pagesController.deletePage);

    // Keys
    socket.on(EventTypes.KEYS.CREATE, keysController.createKey);

    socket.on(EventTypes.KEYS.PAGE_KEYS, keysController.getKeysByPage);

    socket.on(EventTypes.KEYS.DELETE, keysController.deleteKey);

    socket.on(EventTypes.KEYS.UPDATE, keysController.updateKey);

    socket.on(EventTypes.HANDLERS.UPDATE, (payload) => {
      handlersController.updateHandlers(payload);
      signals.removeAllListeners();
      registeredHandlers = registerHandlers({ io, signals });

      handlersController.sendCurrentHandlersConfig(registeredHandlers);
    });

    socket.on(EventTypes.KEYS.PRESS, (keyPressed: IButtonKey) => {
      signals.emit(keyPressed.type, { keyPressed, socket });
    });
  });

  server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('ODeck running on port 3000');
  });
};

export default startServer;
