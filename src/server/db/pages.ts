import { IPage } from 'interfaces';
import DataTypes from '../enums/data-types.enum';
import Store from './store';

class Pages extends Store {
  getAll() {
    return this._getAll(DataTypes.PAGES);
  }

  getById(id: string): IPage | undefined {
    return this._find(DataTypes.PAGES, id);
  }

  getByDeviceId(id: string) {
    return this._getAll(DataTypes.PAGES).filter(
      (page: IPage) => page.deviceId === id
    );
  }

  create(page: IPage) {
    return this._create(DataTypes.PAGES, page);
  }

  update(pageId: string, data: IPage) {
    return this._update(DataTypes.PAGES, pageId, data);
  }

  delete(pageId: string) {
    this._delete(DataTypes.PAGES, pageId);
  }
}

export default Pages;
