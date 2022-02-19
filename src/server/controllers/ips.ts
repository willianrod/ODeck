import { Server, Socket } from 'socket.io';
import EventTypes from '../enums/event-types.enum';
import { getIps } from '../helpers/ip';

const IpsController = (socket: Socket, io: Server) => ({
  getIps: () => {
    const ips = getIps();

    socket.emit(EventTypes.IPS.SET, ips);
  },
});

export default IpsController;
