import sound from 'sound-play';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

interface InputProp {
  readonly maxLength: number;
  readonly defaultValue: string;
  readonly accept: string;
}

export const config: HandlerConfig<InputProp> = {
  groupKey: 'system',
  id: 'sound',
  handlers: {
    [KeyTypes.SOUND]: {
      title: 'sound.title',
      icon: 'MdLink',
      description: 'sound.description',
      defaults: {
        label: 'sound.label',
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.SOUND]: [
      {
        label: 'sound.input.label_1',
        description: 'sound.input.description_1',
        type: 'file',
        props: {
          name: 'soundPath',
          maxLength: 500,
          defaultValue: '',
          accept: '.mp3,.wav',
        },
      },
    ],
  },
};

export default class SoundHandler extends Handler {
  initialize() {
    this.bindHandler(KeyTypes.SOUND, this.onKeyPress);
  }

  onKeyPress({ keyPressed }: KeyPressEvent) {
    if (!keyPressed.actionConfig.soundPath) return;
    sound.play(keyPressed.actionConfig.soundPath);
  }
}
