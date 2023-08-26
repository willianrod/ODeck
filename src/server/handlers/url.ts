import open from 'open';
import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';

export const config: HandlerConfig = {
  groupKey: 'system',
  defaultActive: true,
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
        name: 'url',
        type: 'string',
        defaultValue: '',
        props: {
          maxLength: 500,
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
