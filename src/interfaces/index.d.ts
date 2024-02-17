import { IconType } from 'react-icons';
import KeyTypes from 'server/enums/keys.enum';
import { Socket } from 'socket.io';

interface IActionConfig {
  bindings?: Array<string>;
  url?: string;
  exePath?: string;
  soundPath?: string;
  pageId?: string;
  haEntityID?: string;
  haService?: string;
  haDomain?: string;
}

interface IButtonKey {
  id: string;
  icon?: any;
  description?: string;
  label: string;
  type: KeyTypes;
  backgroundColor: string | null;
  backgroundUrl?: string;
  color: string;
  pageId: string;
  position: number;
  hideLabel: boolean;
  actionConfig: IActionConfig;
}

interface IDevice {
  id: string;
  name: string;
  breadcumb: Array<string>;
  amountHorizontal: number;
  amountVertical: number;
}

interface IPage {
  id: string;
  main: boolean;
  name: string;
  deviceId: string;
}

interface ISetup {
  device: IDevice;
  page: IPage;
  pages: Array<IPage>;
  keys: Array<IButtonKey>;
}

interface IButton {
  id: number;
}

interface IKeyTypeItem {
  type: KeyTypes;
  label: string;
  description?: string;
  icon: IconType;
  defaults: unknown;
}

interface IKeyType {
  key: string;
  label: string;
  icon: IconType;
  items: Array<IKeyTypeItem>;
}

interface ICreateDevice {
  name: string;
  amountHorizontal: number;
  amountVertical: number;
}

interface ISelectDevice {
  deviceId: string;
  deviceType: 'ADMIN' | 'DECK';
}

interface RegisteredHandler {
  config: any;
  handler: { initialize: () => void };
}

interface KeyPressEvent {
  keyPressed: IButtonKey;
  socket: Socket;
}

interface InputProp {
  defaultValue: string;
  name: string;
}

type HandlerItem = {
  readonly title: string;
  readonly description?: string;
  readonly defaults: Partial<IButtonKey>;
  readonly icon: string;
};

type HandlerInput = {
  readonly label: string;
  readonly description: string;
  readonly type: string;
  readonly name: string;
  readonly defaultValue: string;
  readonly secret?: boolean;
  readonly props: Record<string, unknown>;
};

interface HandlerConfig {
  readonly groupKey: string;
  readonly id: string;
  readonly defaultActive: boolean;
  readonly config: HandlerInput[];
  handlers: Partial<{
    [key in KeyTypes]: HandlerItem;
  }>;
  inputs: Partial<{
    [key in KeyTypes]: HandlerInput[];
  }>;
}

interface HandlerData {
  id: string;
  data: Record<string, unknown>;
}
