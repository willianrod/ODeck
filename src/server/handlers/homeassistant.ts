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
    const haConfig = HandlersController(socket, this.io).getPublicHandlersData([config]);
    if (!keyPressed.actionConfig.haEntityID || !keyPressed.actionConfig.haDomain || !keyPressed.actionConfig.haService || !haConfig) return;

    const haPetition = {
      token: this.getHAToken(haConfig),
      ip: this.getHAIP(haConfig),
      domain: keyPressed.actionConfig.haDomain,
      service: keyPressed.actionConfig.haService,
      entityID: keyPressed.actionConfig.haEntityID
    };

    switch (keyPressed.type) {
      case KeyTypes.HOME_ASSISTANT_CALL_SERVICE:
        this.callHomeAssistantService(haPetition);
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

  callHomeAssistantService(haPetition: any) {
    axios.post(`${haPetition.ip}/api/services/${haPetition.domain}/${haPetition.service}`,
      {
        "entity_id": `${haPetition.entityID}`
      },
      {
        headers: {
          "Authorization": `Bearer ${haPetition.token}`,
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        console.log(`Service "${haPetition.service}" in domain "${haPetition.domain}" called succesfuly`);
      })
      .catch((error) => {
        console.error(`Something went wrong calling "${haPetition.service}" in domain "${haPetition.domain}":`, error.code, error.message);
      });
  }
}
