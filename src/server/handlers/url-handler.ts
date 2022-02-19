import { IButtonKey } from '../../interfaces';

const open = require('open');

export const urlHandler = (keyPressed: IButtonKey) => {
  open(keyPressed.actionConfig.url);
};

export default null;
