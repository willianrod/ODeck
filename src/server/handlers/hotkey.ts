import robot from '@jitsi/robotjs';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';
import parseKeys from '../helpers/parseKeys';

interface InputProp {
  readonly maxLength: number;
}

export const config: HandlerConfig<InputProp> = {
  groupKey: 'system',
  id: 'hotkey',
  handlers: {
    [KeyTypes.HOTKEY]: {
      title: 'hotkey.title',
      icon: 'MdKeyboard',
      description: 'hotkey.description',
      defaults: {
        label: 'hotkey.label',
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.HOTKEY]: [
      {
        label: 'hotkey.input.label_1',
        description: 'hotkey.input.description_1',
        type: 'hotkey',
        props: {
          defaultValue: '',
          name: 'bindings',
          maxLength: 200,
        },
      },
    ],
  },
};

export default class HotkeyHandler extends Handler {
  initialize() {
    this.bindHandler(KeyTypes.HOTKEY, this.onHotkey);
  }

  onHotkey({ keyPressed }: KeyPressEvent) {
    if (!keyPressed.actionConfig.bindings?.length) return;
    const { key, modifiers } = parseKeys(
      keyPressed.actionConfig.bindings || []
    );
    if (key) robot.keyTap(key, modifiers);
  }
}
