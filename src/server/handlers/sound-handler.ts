import { IButtonKey } from 'interfaces';
import playSound from 'play-sound';

const player = playSound({});

export const soundHandler = (keyPressed: IButtonKey) => {
  if (!keyPressed.actionConfig.soundPath) return;

  player.play(keyPressed.actionConfig.soundPath);
};

export default null;
