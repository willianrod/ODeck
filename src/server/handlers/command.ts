import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

const exec = require('child_process');

export const config: HandlerConfig = {
  groupKey: 'system',
  defaultActive: true,
  id: 'command',
  handlers: {
    [KeyTypes.COMMAND]: {
      title: 'command.title',
      icon: 'MdLink',
      description: 'command.description',
      defaults: {
        label: 'command.label',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.COMMAND]: [
      {
        label: 'command.input.label_1',
        description: 'command.input.description_1',
        type: 'string',
        name: 'command',
        defaultValue: '',
        props: {},
      },
    ],
  },
};

export default class CommandHandler extends Handler {
  initialize() {
    this.bindHandler(KeyTypes.COMMAND, this.onKeyPress);
  }

  onKeyPress({ keyPressed }: KeyPressEvent) {
    if (!keyPressed.actionConfig.command) return;
    exec.spawn(keyPressed.actionConfig.command, {
      encoding: 'utf8',
      shell: true,
    });
  }
}
