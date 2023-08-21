import path from 'path';
import { IButtonKey } from '../../interfaces';

const exec = require('child_process').execFile;

export const executableHandler = (keyPressed: IButtonKey) => {
  if (!keyPressed.actionConfig.exePath) return;
  const cwd = path.dirname(keyPressed.actionConfig.exePath);
  exec(keyPressed.actionConfig.exePath, undefined, { cwd });
};

export default null;
