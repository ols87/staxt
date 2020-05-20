import { LoggerUtil } from '../';
import { type } from 'os';

export interface StateParams {
  value?: any;
  type?: string;
  stringify?: boolean;
  merge?: boolean;
}

export interface StateResponse {
  key: string;
  value: any;
}

export interface StateWriteOptions {
  key: string;
  value: any;
}

export interface StateTypeCheck {
  key: string;
  value: any;
  type: string;
}

export class StateUtil {
  private static state: any = { test: 1, foo: { bar: 1 } };

  public static add(key: string, { value, type }: StateParams): any {
    let response: StateResponse = this.request(key);

    if (response.value) {
      return LoggerUtil.error(`${response.key} already exists. Use StateUtil.edit()`);
    }

    let newValue: any = this.write({ key, value });

    this.typeCheck('add', { key, value: newValue, type });

    return value;
  }

  public static get(key: string, { type, stringify }: StateParams = {}): any {
    let response: StateResponse = this.request(key);

    if (!response.value) {
      return LoggerUtil.error(`${response.key} does not exist`);
    }

    this.typeCheck('get', { key, value: response.value, type });

    if (stringify) {
      response.value = JSON.stringify(response.value);
    }

    return response.value;
  }

  public static edit(key: string, { value, type, merge }: StateParams): any {
    let response: StateResponse = this.request(key);

    if (!response.value) {
      return LoggerUtil.error(`${response.key} does not exist`);
    }

    const typeofResponse = typeof response.value;
    const typeofValue = typeof value;

    if (typeofResponse !== typeofValue) {
      LoggerUtil.warn(`edit state - changing ${key} from type '${typeofResponse}' to type '${typeofValue}'`);
    }

    this.typeCheck('edit', { key, value, type });

    let newValue: any = this.write({ key, value });

    this.typeCheck('edit', { key, value: newValue, type });
  }

  public static remove(key: string, { type }: StateParams): any {
    let response: StateResponse = this.request(key);
    let keys: Array<string> = [];
    let keyMap: string;
    let keyLength: number;
    let data: any = {};

    try {
      keys = key.split('.');
      keyMap = `['${keys.join("']['")}']`;
      keyLength = keys.length;
      data = this.state;
    } catch {
      return LoggerUtil.error(`key must be a string e.g 'foo.bar' ${key}`);
    }

    if (!response.value) {
      return LoggerUtil.error(`${response.key} does not exist`);
    }

    for (let [keyIndex, keyName] of keys.entries()) {
      const isLast = keyIndex === keyLength - 1;

      data = data[keyName];

      if (isLast) {
        const removeValue = new Function(`return (state) => { delete state${keyMap}; }`)();
        removeValue(this.state);
      }
    }
  }

  public static clear(): object {
    this.state = {};
    return this.state;
  }

  public static request(key: string): StateResponse {
    let keys: Array<string> = [];
    let keyMap: string;
    let data: any = {};

    try {
      keys = key.split('.');
      keyMap = `['${keys.join("']['")}']`;
      data = this.state;
    } catch {
      LoggerUtil.error(`key must be a string e.g 'foo.bar' ${key}`);
    }

    let keyChain: string = '';

    for (let [, keyName] of keys.entries()) {
      keyChain += `${keyName}.`;
      try {
        data = data[keyName];
      } catch {
        data = null;
        break;
      }
    }

    keyChain = keyChain.replace(/.\s*$/, '');

    if (data) {
      const findValue = new Function(`return (state) => state${keyMap}`)();
      data = findValue(this.state);
    }

    return {
      value: data,
      key: keyChain,
    };
  }

  public static write({ key, value }: StateWriteOptions): any {
    let keyMap: Array<string> = [];
    let keyEntries: IterableIterator<[number, string]>;
    let keyLength: number;
    let data: any = {};

    try {
      keyMap = key.split('.');
      keyEntries = keyMap.entries();
      keyLength = keyMap.length;
      data = this.state;
    } catch {
      return LoggerUtil.error(`keymap must be a string e.g 'foo.bar' ${key}`);
    }

    for (let [keyIndex, keyName] of keyEntries) {
      let isLast = keyIndex === keyLength - 1;

      if (isLast) {
        data[keyName] = value;
      } else {
        if (typeof data[keyName] !== 'object') {
          data[keyName] = {};
        } else {
          data[keyName] = data[keyName];
        }
      }

      data = data[keyName];
    }

    return data;
  }

  public static typeCheck(action: string, { key, value, type }: StateTypeCheck) {
    const typeofValue = typeof value;

    if (type && typeofValue !== type) {
      LoggerUtil.warn(`${action} state - typeof ${key} !== '${type}'`);
      LoggerUtil.debug(`${action} state - typeof ${key} === '${typeofValue}'`);
    }
  }
}
