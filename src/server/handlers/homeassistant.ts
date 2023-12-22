import { HandlerConfig, KeyPressEvent } from 'interfaces';
import Handler, { HandlerProps } from './common/handler';
import KeyTypes from '../enums/keys.enum';
import axios from 'axios';
import HandlersController from "../controllers/handlers";

export const config: HandlerConfig = {
  groupKey: 'home_assistant',
  defaultActive: true,
  id: 'home_assistant',
  handlers: {
    [KeyTypes.HOME_ASSISTANT_CALL_SERVICE]: {
      title: 'home_assistant.call_service.title',
      icon: 'MdLink',
      description: 'home_assistant.call_service.description',
      defaults: {
        label: 'home_assistant.call_service.label',
        backgroundColor: 'transparent',
        color: '#fff',
      },
    },
  },
  config: [
    {
      label: "home_assistant.config.token.label",
      name: "home_assistant_token",
      description: "home_assistant.config.token.description",
      type: "string",
      defaultValue: "",
      props: {}
    },
    {
      label: "home_assistant.config.ip.label",
      name: "home_assistant_ip",
      description: "home_assistant.config.ip.description",
      type: "string",
      defaultValue: "",
      props: {}
    }
  ],
  inputs: {
    [KeyTypes.HOME_ASSISTANT_CALL_SERVICE]: [
      {
        label: 'home_assistant.call_service.domain.label',
        description: 'home_assistant.call_service.domain.description',
        type: 'string',
        name: 'haDomain',
        defaultValue: '',
        props: {},
      },
      {
        label: 'home_assistant.call_service.service.label',
        description: 'home_assistant.call_service.service.description',
        type: 'string',
        name: 'haService',
        defaultValue: '',
        props: {},
      },
      {
        label: 'home_assistant.call_service.entityid.label',
        description: 'home_assistant.call_service.entityid.description',
        type: 'string',
        name: 'haEntityID',
        defaultValue: '',
        props: {},
      },
    ],
  },
};

export default class HomeAssistantHandler extends Handler {

  constructor(props: HandlerProps) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.callHomeAssistantService = this.callHomeAssistantService.bind(this);
  }

  initialize() {
    this.bindHandlers([
      [KeyTypes.HOME_ASSISTANT_CALL_SERVICE, this.onKeyPress],
    ]);
  }

  onKeyPress({ keyPressed, socket }: KeyPressEvent) {
    if (!keyPressed.actionConfig.haEntityID || !keyPressed.actionConfig.haDomain || !keyPressed.actionConfig.haService) return;

    const haConfig = HandlersController(socket, this.io).getPublicHandlersData([config]);
    if (!haConfig) return;
    const haToken = this.getHAToken(haConfig);
    const haIP = this.getHAIP(haConfig);

    switch (keyPressed.type) {
      case KeyTypes.HOME_ASSISTANT_CALL_SERVICE:
        this.callHomeAssistantService(haIP, keyPressed.actionConfig.haDomain,
          keyPressed.actionConfig.haService, keyPressed.actionConfig.haEntityID, haToken);
        break;

      default:
        break;
    }
  }

  getHAToken(haConfig: any) {
    return haConfig["home_assistant"].home_assistant_token;
  }

  getHAIP(haConfig: any) {
    return haConfig["home_assistant"].home_assistant_ip;
  }

  callHomeAssistantService(ip: string, domain: string, service: string, entityID: string, token: string) {
    axios.post(`${ip}/api/services/${domain}/${service}`,
      {
        "entity_id": `${entityID}`
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        console.log(`Service "${ service }" in domain "${ domain }" called succesfuly`);
      })
      .catch((error) => {
        console.error(`Something went wrong calling "${ service }" in domain "${ domain }":`, error.code, error.message);
      });
  }
}
