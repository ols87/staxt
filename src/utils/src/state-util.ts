import { LoggerUtil } from '../';

export interface StateParams {
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

export interface StateWriteOptions {
  response: StateResponse;
  keyData: any;
}

export class StateUtil {
  private static state: any = { test: 1 };

  public static add({ keyMap, keyData, keyType }: StateParams): any {
    let response: StateResponse = this.request(keyMap);

    if (response.data) {
      return LoggerUtil.error(`${response.key} already exists. Use StateUtil.edit()`);
    }

    let data: any = this.write({ response, keyData });
    const typeofData = typeof data;

    if (keyType && typeofData !== keyType) {
      LoggerUtil.warn(`add state - typeof ${keyMap} !== '${keyType}'`);
      LoggerUtil.warn(`add state - typeof ${keyMap} === '${typeofData}'`);
    }

    return keyData;
  }

  public static get({ keyMap, keyType }: StateParams): any {
    let response: StateResponse = this.request(keyMap);

    if (!response.data) {
      return LoggerUtil.error(`${response.key} does not exist`);
    }

    const typeofData = typeof response.data;
    const typeofKeyMap = typeof keyMap;

    if (keyType && typeof typeofData !== typeofKeyMap) {
      LoggerUtil.warn(`get state - typeof ${keyMap} !== '${keyType}'`);
      LoggerUtil.warn(`get state - typeof ${keyMap} === '${typeofKeyMap}'`);
    }

    return response.data;
  }

  public static edit({ keyMap, keyData, keyType, merge }: StateParams): any {
    let response: StateResponse = this.request(keyMap);

    if (!response.data) {
      return LoggerUtil.error(`${response.key} does not exist`);
    }

    const typeofResponseData = typeof response.data;
    const typeofKeyData = typeof keyData;

    if (typeofResponseData !== typeofKeyData) {
      LoggerUtil.warn(`edit state - changing ${keyMap} from type '${typeofResponseData}' to type ${keyType}`);
    }

    if (keyType && typeofKeyData !== keyType) {
      LoggerUtil.warn(`edit state - typeof ${keyMap} !== '${keyType}'`);
      LoggerUtil.warn(`edit state - typeof ${keyMap} === '${typeofKeyData}'`);
    }

    let data: any = this.write({ response, keyData });
    const typeofData = typeof data;

    if (keyType && typeofData !== keyType) {
      LoggerUtil.warn(`edit state - typeof ${keyMap} !== '${keyType}'`);
      LoggerUtil.warn(`edit state - typeof ${keyMap} === '${typeofData}'`);
    }
  }

  public static remove({ keyMap, keyType }: StateParams): any {}

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

  public static write({ response, keyData }: StateWriteOptions): any {
    const keyList: IterableIterator<[number, string]> = response.keyList.entries();
    const keyListLength: number = response.keyList.length;

    let data = this.state;

    for (let [keyIndex, keyName] of keyList) {
      if (keyIndex === keyListLength - 1) {
        data[keyName] = keyData;
      } else {
        data[keyName] = data[keyName] || {};
      }

      data = data[keyName];
    }

    return data;
  }
}
