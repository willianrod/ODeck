import { IButtonKey } from 'interfaces';
import DataTypes from '../enums/data-types.enum';
import Store from './store';

class Keys extends Store {
  getAll() {
    return this._getAll(DataTypes.KEYS);
  }

  getById(id: string) {
    return this._find(DataTypes.KEYS, id);
  }

  getByPageId(id: string) {
    return this._getAll(DataTypes.KEYS).filter(
      (key: IButtonKey) => key.pageId === id
    );
  }

  create(key: IButtonKey) {
    return this._create(DataTypes.KEYS, key);
  }

  update(keyId: string, data: IButtonKey) {
    return this._update(DataTypes.KEYS, keyId, data);
  }

  delete(keyId: string) {
    this._delete(DataTypes.KEYS, keyId);
  }
}

export default Keys;
