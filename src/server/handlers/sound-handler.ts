import { IButtonKey } from 'interfaces';
import sound from 'sound-play';

export const soundHandler = (keyPressed: IButtonKey) => {
  if (!keyPressed.actionConfig.soundPath) return;

  sound.play(keyPressed.actionConfig.soundPath);
};

export default null;
