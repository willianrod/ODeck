import { HandlerData } from 'interfaces';
import DataTypes from '../enums/data-types.enum';
import Store from './store';

class Handlers extends Store {
  getAll(): Array<HandlerData> {
    return this._getAll(DataTypes.HANDLERS);
  }

  getById(id: string): HandlerData | undefined {
    return this._find(DataTypes.HANDLERS, id);
  }

  create(handler: HandlerData): HandlerData {
    this._create(DataTypes.HANDLERS, handler);
    return handler;
  }

  update(handlerId: string, data: HandlerData) {
    return this._update(DataTypes.HANDLERS, handlerId, data);
  }

  delete(handlerId: string) {
    this._delete(DataTypes.HANDLERS, handlerId);
  }
}

export default Handlers;
