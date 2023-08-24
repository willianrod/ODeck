import open from 'open';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

interface InputProp {
  readonly maxLength: number;
  readonly defaultValue: string;
}

export const config: HandlerConfig<InputProp> = {
  groupKey: 'system',
  id: 'url',
  handlers: {
    [KeyTypes.URL]: {
      title: 'url.title',
      icon: 'MdLink',
      description: 'url.description',
      defaults: {
        label: 'url.label',
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.URL]: [
      {
        label: 'url.input.label_1',
        description: 'url.input.description_1',
        type: 'string',
        props: {
          name: 'url',
          maxLength: 500,
          defaultValue: '',
        },
      },
    ],
  },
};

export default class UrlHandler extends Handler {
  initialize() {
    this.bindHandler(KeyTypes.URL, this.onKeyPress);
  }

  onKeyPress({ keyPressed }: KeyPressEvent) {
    if (!keyPressed.actionConfig.url) return;
    open(keyPressed.actionConfig.url);
  }
}
