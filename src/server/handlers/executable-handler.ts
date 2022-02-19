import { IButtonKey } from '../../interfaces';

const exec = require('child_process').execFile;

export const executableHandler = (keyPressed: IButtonKey) => {
  if (!keyPressed.actionConfig.exePath) return;
  exec(keyPressed.actionConfig.exePath);
};

export default null;
