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

const KEY_TYPES: Array<IKeyType> = [
  {
    key: 'DECK',
    label: 'Deck',
    icon: MdOutlineCropLandscape,
    items: [
      {
        type: KeyTypes.NAVIGATE,
        label: 'Navigate',
        description: 'Navigate to another page',
        icon: MdNavigateNext,
        defaults: {
          color: '#fff',
          label: 'Go to...',
        },
      },
      {
        type: KeyTypes.GO_BACK,
        label: 'Go back',
        description: 'Return to previous page',
        icon: MdNavigateBefore,
        defaults: {
          color: '#fff',
          label: 'Go Back',
        },
      },
    ],
  },
  {
    key: 'SYSTEM',
    label: 'System',
    icon: MdSettings,
    items: [
      {
        type: KeyTypes.EXECUTABLE,
        label: 'Run executable',
        description: 'Open an app installed on your computer',
        icon: MdMonitor,
        defaults: {
          color: '#fff',
          label: 'Open app',
        },
      },
      {
        type: KeyTypes.HOTKEY,
        label: 'Hotkey',
        description:
          'Simulates a combination of keys to invoke a hotkey shortcut',
        icon: MdKeyboard,
        defaults: {
          color: '#fff',
          label: 'Hotkey',
        },
      },
      {
        type: KeyTypes.URL,
        label: 'Website',
        description: 'Open an URL in your default browser',
        icon: MdLink,
        defaults: {
          color: '#fff',
          label: 'Open link',
        },
      },
    ],
  },
  {
    key: 'MEDIA',
    label: 'Media',
    icon: MdMusicNote,
    items: [
      {
        type: KeyTypes.PLAY,
        label: 'Play',
        icon: MdPlayArrow,
        defaults: {
          color: '#fff',
          label: 'Play',
          actionConfig: {
            mediaKey: MediaKeys.PLAY,
          },
        },
      },
      {
        type: KeyTypes.PAUSE,
        label: 'Pause',
        icon: MdPause,
        defaults: {
          color: '#fff',
          label: 'Pause',
          actionConfig: {
            mediaKey: MediaKeys.PAUSE,
          },
        },
      },
      {
        type: KeyTypes.NEXT,
        label: 'Next',
        icon: MdSkipNext,
        defaults: {
          color: '#fff',
          label: 'Next',
          actionConfig: {
            mediaKey: MediaKeys.NEXT,
          },
        },
      },
      {
        type: KeyTypes.PREVIOUS,
        label: 'Previous',
        icon: MdSkipPrevious,
        defaults: {
          color: '#fff',
          label: 'Previous',
          actionConfig: {
            mediaKey: MediaKeys.PREVIOUS,
          },
        },
      },
      {
        type: KeyTypes.STOP,
        label: 'Stop',
        icon: MdStop,
        defaults: {
          color: '#fff',
          label: 'Stop',
          actionConfig: {
            mediaKey: MediaKeys.STOP,
          },
        },
      },
      {
        type: KeyTypes.MUTE,
        label: 'Mute',
        icon: MdVolumeOff,
        defaults: {
          color: '#fff',
          label: 'Mute',
          actionConfig: {
            mediaKey: MediaKeys.MUTE,
          },
        },
      },
      {
        type: KeyTypes.VOL_DOWN,
        label: 'Volume -',
        icon: MdVolumeDown,
        defaults: {
          color: '#fff',
          label: 'Volume -',
          actionConfig: {
            mediaKey: MediaKeys.VOL_DOWN,
          },
        },
      },
      {
        type: KeyTypes.VOL_UP,
        label: 'Volume +',
        icon: MdVolumeUp,
        defaults: {
          color: '#fff',
          label: 'Volume +',
          actionConfig: {
            mediaKey: MediaKeys.VOL_UP,
          },
        },
      },
    ],
  },
];

export default KEY_TYPES;
