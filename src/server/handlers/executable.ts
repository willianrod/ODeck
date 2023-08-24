import path from 'path';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

const exec = require('child_process').execFile;

interface InputProp {
  readonly maxLength: number;
  readonly defaultValue: string;
  readonly accept: string;
}

export const config: HandlerConfig<InputProp> = {
  groupKey: 'system',
  id: 'executable',
  handlers: {
    [KeyTypes.EXECUTABLE]: {
      title: 'executable.title',
      icon: 'MdLink',
      description: 'executable.description',
      defaults: {
        label: 'executable.label',
        backgroundColor: '#000',
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
        props: {
          name: 'exePath',
          maxLength: 500,
          defaultValue: '',
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
