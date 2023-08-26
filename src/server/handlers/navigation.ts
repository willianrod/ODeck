import Handler from './common/handler';
import KeyTypes from '../enums/keys.enum';
import { HandlerConfig, IDevice, KeyPressEvent } from '../../interfaces';
import Devices from '../db/devices';
import Keys from '../db/keys';
import Pages from '../db/pages';

const devicesDb = new Devices();
const pagesDb = new Pages();
const keysDb = new Keys();

const getDeviceByPageId = (pageId: string) => {
  const page = pagesDb.getById(pageId);
  if (!page) return undefined;
  const device = devicesDb.getById(page.deviceId);
  return device;
};

export const config: HandlerConfig = {
  groupKey: 'deck',
  defaultActive: true,
  id: 'navigation',
  handlers: {
    [KeyTypes.NAVIGATE]: {
      title: 'navigate.title',
      icon: 'MdNavigateNext',
      description: 'navigate.description',
      defaults: {
        label: 'navigate.label',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
    [KeyTypes.GO_BACK]: {
      title: 'go_back.title',
      icon: 'MdNavigateBefore',
      description: 'go_back.description',
      defaults: {
        label: 'go_back.label',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
  },
  config: [],
  inputs: {
    [KeyTypes.NAVIGATE]: [
      {
        label: 'navigate.input.label_1',
        description: 'navigate.input.description_1',
        type: 'pages',
        defaultValue: '',
        name: 'pageId',
        props: {},
      },
    ],
    [KeyTypes.GO_BACK]: [],
  },
};

export default class NavigationHandler extends Handler {
  initialize() {
    this.bindHandlers([
      [KeyTypes.NAVIGATE, this.onNavigate],
      [KeyTypes.GO_BACK, this.onGoBack],
    ]);
  }

  onNavigate({ keyPressed, socket }: KeyPressEvent) {
    if (!keyPressed.pageId) return;
    const device = getDeviceByPageId(keyPressed.pageId);

    if (!device || !keyPressed.actionConfig.pageId) return;

    const newDevice = {
      ...device,
      breadcumb: [...device.breadcumb, keyPressed.actionConfig.pageId],
    } as IDevice;

    devicesDb.update(device.id, newDevice);

    const keys = keysDb.getByPageId(keyPressed.actionConfig.pageId);

    socket.emit('SET_KEYS', keys);
  }

  onGoBack({ keyPressed, socket }: KeyPressEvent) {
    const device = getDeviceByPageId(keyPressed.pageId);

    if (!device || device.breadcumb.length === 1) return;

    const newBreadcumb = [...device.breadcumb];
    newBreadcumb.pop();

    const previousPage = newBreadcumb.at(-1);

    const newDevice = {
      ...device,
      breadcumb: newBreadcumb,
    } as IDevice;

    devicesDb.update(device.id, newDevice);

    if (!previousPage) return;

    const keys = keysDb.getByPageId(previousPage);

    socket.emit('SET_KEYS', keys);
  }
}
