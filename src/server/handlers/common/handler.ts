import type EventEmitter from 'events';
import type { Server } from 'socket.io';
import KeyTypes from '../../enums/keys.enum';
import { KeyPressEvent } from '../../../interfaces';

export interface HandlerProps {
  signals: EventEmitter;
  io: Server;
  id: string;
}

type CommandTuple = [KeyTypes, (event: KeyPressEvent) => void];

export default class Handler {
  id: string;

  io: Server;

  signals: EventEmitter;

  constructor(props: HandlerProps) {
    this.io = props.io;
    this.signals = props.signals;
    this.id = props.id;
  }

  ready() {
    return true;
  }

  initialize() {}

  bindHandler(keyType: KeyTypes, callback: (event: KeyPressEvent) => void) {
    this.signals.on(keyType, callback);
  }

  bindHandlers(commands: CommandTuple[]) {
    commands.forEach(([keyType, callback]) => {
      this.signals.on(keyType, callback);
    });
  }
}
