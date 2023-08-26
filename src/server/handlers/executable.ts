import path from 'path';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

const exec = require('child_process').execFile;

export const config: HandlerConfig = {
  groupKey: 'system',
  defaultActive: true,
  id: 'executable',
  handlers: {
    [KeyTypes.EXECUTABLE]: {
      title: 'executable.title',
      icon: 'MdLink',
      description: 'executable.description',
      defaults: {
        label: 'executable.label',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.EXECUTABLE]: [
      {
        label: 'executable.input.label_1',
        description: 'executable.input.description_1',
        type: 'file',
        name: 'exePath',
        defaultValue: '',
        props: {
          maxLength: 500,
          accept: '.exe',
        },
      },
    ],
  },
};

export default class ExecutableHandler extends Handler {
  initialize() {
    this.bindHandler(KeyTypes.EXECUTABLE, this.onKeyPress);
  }

  onKeyPress({ keyPressed }: KeyPressEvent) {
    if (!keyPressed.actionConfig.exePath) return;
    const cwd = path.dirname(keyPressed.actionConfig.exePath);
    exec(keyPressed.actionConfig.exePath, undefined, { cwd });
  }
}
