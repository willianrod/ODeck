import ElectronStore from 'electron-store';
import { IButtonKey, IDevice, IPage } from 'interfaces';
import DataTypes from '../enums/data-types.enum';

export const STORE = new ElectronStore({
  defaults: { devices: [], pages: [], keys: [] },
  // migrations: {
  //   '0.0.1': (store) => {
  //   },
  // },
});

type Type = IPage | IDevice | IButtonKey;

class Store {
  _getAll(type: DataTypes) {
    return STORE.get(type);
  }

  _find(type: DataTypes, id: string) {
    const entries = STORE.get(type);

    return entries.find((entry: Type) => entry.id === id);
  }

  _create(type: DataTypes, entry: Type): Type {
    const entries = STORE.get(type);
    STORE.set(type, [...entries, entry]);

    return entry;
  }

  _update(type: DataTypes, id: string, data: Type) {
    const entries = [...STORE.get(type)] as Array<Type>;

    const entryIndex = entries.findIndex((d: Type) => d.id === id);
    const entryData = entries[entryIndex] as Type;

    if (!entryData) return;

    const newEntryValue = {
      ...entryData,
      ...data,
    } as Type;

    entries[entryIndex] = newEntryValue;

    STORE.set(type, entries);
  }

  _delete(type: DataTypes, id: string) {
    const devices = STORE.get(type);

    STORE.set(
      type,
      devices.filter((d: Type) => d.id !== id)
    );
  }
}

export default Store;
