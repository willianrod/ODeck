import { IDevice } from 'interfaces';
import DataTypes from '../enums/data-types.enum';
import Store from './store';

class Devices extends Store {
  getAll(): Array<IDevice> {
    return this._getAll(DataTypes.DEVICES);
  }

  getById(id: string): IDevice | undefined {
    return this._find(DataTypes.DEVICES, id);
  }

  create(device: IDevice): IDevice {
    this._create(DataTypes.DEVICES, device);
    return device;
  }

  update(deviceId: string, data: IDevice) {
    return this._update(DataTypes.DEVICES, deviceId, data);
  }

  delete(deviceId: string) {
    this._delete(DataTypes.DEVICES, deviceId);
  }
}

export default Devices;
