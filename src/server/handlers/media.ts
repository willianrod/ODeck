import robot from '@jitsi/robotjs';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';
import MediaKeys from '../enums/media-keys.enum';

export const config: HandlerConfig = {
  groupKey: 'media',
  defaultActive: true,
  id: 'media',
  handlers: {
    [KeyTypes.PLAY]: {
      title: 'media.play',
      icon: 'MdPlayArrow',
      defaults: {
        label: 'media.play',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.PAUSE]: {
      title: 'media.pause',
      icon: 'MdPause',
      defaults: {
        label: 'media.pause',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.STOP]: {
      title: 'media.stop',
      icon: 'MdStop',
      defaults: {
        label: 'media.stop',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.PREVIOUS]: {
      title: 'media.previous',
      icon: 'MdSkipPrevious',
      defaults: {
        label: 'media.previous',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.NEXT]: {
      title: 'media.next',
      icon: 'MdSkipNext',
      defaults: {
        label: 'media.next',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.VOL_DOWN]: {
      title: 'media.volume_minus',
      icon: 'MdVolumeDown',
      defaults: {
        label: 'media.volume_minus',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.VOL_UP]: {
      title: 'media.volume_plus',
      icon: 'MdVolumeUp',
      defaults: {
        label: 'media.volume_plus',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },

    [KeyTypes.MUTE]: {
      title: 'media.mute',
      icon: 'MdVolumeOff',
      defaults: {
        label: 'media.mute',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {},
};

const KEY_MAP: { [key: string]: MediaKeys } = {
  [KeyTypes.PLAY]: MediaKeys.PLAY,
  [KeyTypes.STOP]: MediaKeys.STOP,
  [KeyTypes.PREVIOUS]: MediaKeys.PREVIOUS,
  [KeyTypes.NEXT]: MediaKeys.NEXT,
  [KeyTypes.VOL_DOWN]: MediaKeys.VOL_DOWN,
  [KeyTypes.VOL_UP]: MediaKeys.VOL_UP,
  [KeyTypes.PAUSE]: MediaKeys.PAUSE,
  [KeyTypes.MUTE]: MediaKeys.MUTE,
};

export default class MediaHandler extends Handler {
  initialize() {
    this.bindHandlers([
      [KeyTypes.PLAY, this.onKeyPress],
      [KeyTypes.PLAY, this.onKeyPress],
      [KeyTypes.STOP, this.onKeyPress],
      [KeyTypes.PREVIOUS, this.onKeyPress],
      [KeyTypes.NEXT, this.onKeyPress],
      [KeyTypes.VOL_DOWN, this.onKeyPress],
      [KeyTypes.VOL_UP, this.onKeyPress],
      [KeyTypes.PAUSE, this.onKeyPress],
      [KeyTypes.MUTE, this.onKeyPress],
    ]);
  }

  onKeyPress({ keyPressed }: KeyPressEvent) {
    robot.keyTap(KEY_MAP[keyPressed.type]);
  }
}
