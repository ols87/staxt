import { LoggerUtil } from '../';

export interface StateConfig {
  keyMap: string;
  keyData?: any;
  keyType?: string;
  merge?: boolean;
}

export interface StateResponse {
  data: any;
  key: string;
  keyList: Array<string>;
}

export class StateUtil {
  private static state: any = { test: 1 };

  public static add({ keyMap, keyData }: StateConfig): any {
    let request: StateResponse = this.request(keyMap);

    if (request.data) {
      return LoggerUtil.error(`${request.key} already exists. Use StateUtil.edit()`);
    }

    const keyList: IterableIterator<[number, string]> = request.keyList.entries();
    const keyListLength: number = request.keyList.length;
    let data: any = this.state;

    for (let [keyIndex, keyName] of keyList) {
      if (keyIndex === keyListLength - 1) {
        data[keyName] = keyData;
      } else {
        data[keyName] = data[keyName] || {};
      }

      data = data[keyName];
    }

    return keyData;
  }

  public static get({ keyMap, keyType }: StateConfig): any {
    let request: StateResponse = this.request(keyMap);

    if (!request.data) {
      return LoggerUtil.error(`${request.key} does not exist`);
    }

    if (keyType && typeof request.data !== keyType) {
      LoggerUtil.warn(`typeof ${keyMap} !== '${keyType}'`);
      LoggerUtil.warn(`typeof ${keyMap} === '${typeof keyMap}'`);
    }

    return request.data;
  }

  public static edit({ keyMap, keyType, merge }: StateConfig): any {}

  public static remove({ keyMap, keyType }: StateConfig): any {}

  public static clear(): any {}

  public static request(keyMap: string): StateResponse {
    let keyList: Array<string> = [];

    try {
      keyList = keyMap.split('.');
    } catch {
      LoggerUtil.error(`keymap must be a string e.g 'foo.bar' ${keyMap}`);
    }

    let data: any = this.state;
    let key: string = '';

    for (let [, keyName] of keyList.entries()) {
      key += `${keyName}.`;

      try {
        data = data[keyName];
      } catch {
        break;
      }
    }

    key = key.replace(/.\s*$/, '');

    return { data, key, keyList };
  }
}
