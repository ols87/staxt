import { Logger } from './logger-util';

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

export interface SateKeyConfig {
  keys: Array<string>;
  keyMap: string;
  data: any;
  keyLength?: number;
  keyEntries?: IterableIterator<[number, string]>;
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

const logger = new Logger('state');

export class State {
  private static state: any = { test: 1, foo: { bar: 1 } };

  public static add(key: string, { value, type }: StateParams): any {
    let response: StateResponse = this.request(key);

    if (response.value) {
      return logger.error(`${response.key} already exists. Use StateUtil.edit()`);
    }

    let newValue: any = this.write({ key, value });

    this.typeCheck('add', { key, value: newValue, type });

    return value;
  }

  public static get(key: string, { type, stringify }: StateParams = {}): any {
    let response: StateResponse = this.request(key);

    if (!response.value) {
      return logger.error(`${response.key} does not exist`);
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
      return logger.error(`${response.key} does not exist`);
    }

    const typeofResponse = typeof response.value;
    const typeofValue = typeof value;

    if (typeofResponse !== typeofValue) {
      logger.warn(`edit state - changing ${key} from type '${typeofResponse}' to type '${typeofValue}'`);
    }

    this.typeCheck('edit', { key, value, type });

    let newValue: any = this.write({ key, value });

    this.typeCheck('edit', { key, value: newValue, type });
  }

  public static remove(key: string, { type }: StateParams): any {
    try {
      const config = this.keyConfig(key);
      const { keys, keyMap, keyLength } = config;
      let { data } = config;
      let response: StateResponse = this.request(key);

      if (!response.value) {
        return logger.error(`${response.key} does not exist`);
      }

      for (let [keyIndex, keyName] of keys.entries()) {
        const isLast = keyIndex === keyLength - 1;

        data = data[keyName];

        if (isLast) {
          const removeValue = new Function(`return (state) => { delete state${keyMap}; }`)();
          removeValue(this.state);
        }
      }
    } catch {
      logger.error(`remove state - ${key} failed`);
    }
  }

  public static clear(): object {
    this.state = {};
    return this.state;
  }

  public static request(key: string): StateResponse {
    try {
      const config = this.keyConfig(key);
      const { keys, keyMap } = config;
      let { data } = config;

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
    } catch {
      logger.error(`request state - ${key} failed`);
    }
  }

  public static write({ key, value }: StateWriteOptions): any {
    try {
      const config = this.keyConfig(key);
      const { keyLength, keyEntries } = config;
      let { data } = config;

      for (let [keyIndex, keyName] of keyEntries) {
        const isLast = keyIndex === keyLength - 1;
        const isObject = !isLast && typeof data[keyName] !== 'object';

        data[keyName] = isObject ? {} : data[keyName];

        if (isLast) {
          data[keyName] = value;
        }

        data = data[keyName];
      }

      return data;
    } catch {
      logger.error(`write state - ${key} failed`);
    }
  }

  private static keyConfig(key: string): SateKeyConfig {
    let keys: Array<string> = [];
    let keyMap: string;
    let keyLength: number;
    let keyEntries: IterableIterator<[number, string]>;
    let data: any = {};

    try {
      keys = key.split('.');
      keyMap = `['${keys.join("']['")}']`;
      keyLength = keys.length;
      data = this.state;
    } catch {
      logger.error(`key must be a string e.g 'foo.bar' ${key}`);
    }

    return { keys, keyMap, keyLength, keyEntries, data };
  }

  private static typeCheck(action: string, { key, value, type }: StateTypeCheck) {
    const typeofValue = typeof value;

    if (type && typeofValue !== type) {
      logger.warn(`${action} state - typeof ${key} !== '${type}'`);
      logger.debug(`${action} state - typeof ${key} === '${typeofValue}'`);
    }
  }
}
