import robot from '@jitsi/robotjs';
import parseKeys from '../helpers/parseKeys';
import { IButtonKey } from '../../interfaces';

export const hotkeyHandler = (keyPressed: IButtonKey) => {
  if (!keyPressed.actionConfig.bindings?.length) return;
  const { key, modifiers } = parseKeys(keyPressed.actionConfig.bindings || []);
  if (key) robot.keyTap(key, modifiers);
};

export default null;
