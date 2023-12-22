import KeyTypes from 'server/enums/keys.enum';
import {
  MdLink,
  MdSettings,
  MdKeyboard,
  MdMonitor,
  MdMusicNote,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdStop,
  MdVolumeOff,
  MdVolumeDown,
  MdVolumeUp,
  MdOutlineCropLandscape,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

import { IKeyType } from 'interfaces';
import MediaKeys from 'server/enums/media-keys.enum';
import i18n from 'renderer/i18n';

const KEY_TYPES: Array<IKeyType> = [
  {
    key: 'DECK',
    label: i18n.t('keys:deck'),
    icon: MdOutlineCropLandscape,
    items: [
      {
        type: KeyTypes.NAVIGATE,
        label: i18n.t('keys:navigate.title'),
        description: i18n.t('keys:navigate.description'),
        icon: MdNavigateNext,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:navigate.label'),
        },
      },
      {
        type: KeyTypes.GO_BACK,
        label: i18n.t('keys:go_back.title'),
        description: i18n.t('keys:go_back.description'),
        icon: MdNavigateBefore,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:go_back.label'),
        },
      },
    ],
  },
  {
    key: 'SYSTEM',
    label: i18n.t('keys:system'),
    icon: MdSettings,
    items: [
      {
        type: KeyTypes.EXECUTABLE,
        label: i18n.t('keys:executable.title'),
        description: i18n.t('keys:executable.description'),
        icon: MdMonitor,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:executable.label'),
        },
      },
      {
        type: KeyTypes.HOTKEY,
        label: i18n.t('keys:hotkey.title'),
        description: i18n.t('keys:hotkey.description'),
        icon: MdKeyboard,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:hotkey.label'),
        },
      },
      {
        type: KeyTypes.URL,
        label: i18n.t('keys:website.title'),
        description: i18n.t('keys:website.description'),
        icon: MdLink,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:website.label'),
        },
      },
      {
        type: KeyTypes.SOUND,
        label: i18n.t('keys:play_sound.label'),
        description: i18n.t('keys:play_sound.description'),
        icon: MdPlayArrow,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:play_sound.label'),
        },
      },
    ],
  },
  {
    key: 'MEDIA',
    label: i18n.t('keys:media'),
    icon: MdMusicNote,
    items: [
      {
        type: KeyTypes.PLAY,
        label: i18n.t('keys:play'),
        icon: MdPlayArrow,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:play'),
          actionConfig: {
            mediaKey: MediaKeys.PLAY,
          },
        },
      },
      {
        type: KeyTypes.PAUSE,
        label: i18n.t('keys:pause'),
        icon: MdPause,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:pause'),
          actionConfig: {
            mediaKey: MediaKeys.PAUSE,
          },
        },
      },
      {
        type: KeyTypes.NEXT,
        label: i18n.t('keys:next'),
        icon: MdSkipNext,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:next'),
          actionConfig: {
            mediaKey: MediaKeys.NEXT,
          },
        },
      },
      {
        type: KeyTypes.PREVIOUS,
        label: i18n.t('keys:previous'),
        icon: MdSkipPrevious,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:previous'),
          actionConfig: {
            mediaKey: MediaKeys.PREVIOUS,
          },
        },
      },
      {
        type: KeyTypes.STOP,
        label: i18n.t('keys:stop'),
        icon: MdStop,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:stop'),
          actionConfig: {
            mediaKey: MediaKeys.STOP,
          },
        },
      },
      {
        type: KeyTypes.MUTE,
        label: i18n.t('keys:mute'),
        icon: MdVolumeOff,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:mute'),
          actionConfig: {
            mediaKey: MediaKeys.MUTE,
          },
        },
      },
      {
        type: KeyTypes.VOL_DOWN,
        label: i18n.t('keys:volume_minus'),
        icon: MdVolumeDown,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:volume_minus'),
          actionConfig: {
            mediaKey: MediaKeys.VOL_DOWN,
          },
        },
      },
      {
        type: KeyTypes.VOL_UP,
        label: i18n.t('keys:volume_plus'),
        icon: MdVolumeUp,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:volume_plus'),
          actionConfig: {
            mediaKey: MediaKeys.VOL_UP,
          },
        },
      },
    ],
  },
  {
    key: 'HOME_ASSISTANT',
    label: i18n.t('keys:home_assistant'),
    icon: MdSettings,
    items: [
      {
        type: KeyTypes.HOME_ASSISTANT_CALL_SERVICE,
        label: i18n.t('keys:home_assistant_call_service.title'),
        description: i18n.t('keys:home_assistant_call_service.description'),
        icon: MdMonitor,
        defaults: {
          color: '#fff',
          label: i18n.t('keys:home_assistant_call_service.label'),
        },
      },
    ],
  },
];

export default KEY_TYPES;
