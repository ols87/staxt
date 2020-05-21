import { Logger } from './logger.util';

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

/**
 * **Utility for managing state.**
 * Example Usage:
 * ```ts
 * import { State } from '@utils';
 * const state = State;
 * //or
 * import { Utils } from '@utils';
 * const state = Utils.state;
 *
 * state.add('foo', { value: 'bar', type: 'string' });
 * state.edit('foo', { value: 1, type: 'number' });
 * state.get('foo'); // returns 1
 * state.remove('foo');
 * state.clear();
 * ```
 */

export const State = new (class {
  private state: any = { test: 1, foo: { bar: 1 } };

  public add(key: string, { value, type }: StateParams): any {
    let response: StateResponse = this.request(key);

    if (response.value) {
      return logger.error(`${response.key} already exists. Use StateUtil.edit()`);
    }

    let newValue: any = this.write({ key, value });

    this.typeCheck('ADD', { key, value: newValue, type });

    return newValue;
  }

  public get(key: string, { type, stringify }: StateParams = {}): any {
    let response: StateResponse = this.request(key);

    if (!response.value) {
      return logger.error(`GET - ${response.key} does not exist`);
    }

    this.typeCheck('GET', { key, value: response.value, type });

    if (stringify) {
      response.value = JSON.stringify(response.value);
    }

    return response.value;
  }

  public edit(key: string, { value, type, merge }: StateParams): any {
    let response: StateResponse = this.request(key);

    if (!response.value) {
      return logger.error(`${response.key} does not exist`);
    }

    const typeofResponse = typeof response.value;
    const typeofValue = typeof value;

    if (typeofResponse !== typeofValue) {
      logger.warn(`EDIT - changing ${key} from type '${typeofResponse}' to type '${typeofValue}'`);
    }

    this.typeCheck('EDIT', { key, value, type });

    let newValue: any = this.write({ key, value });

    this.typeCheck('EDIT', { key, value: newValue, type });
  }

  public remove(key: string, { type }: StateParams): any {
    try {
      const response: StateResponse = this.request(key);
      let { data, keys, keyLength } = this.keyConfig(key);

      if (!response.value) {
        return logger.error(`REMOVE - ${response.key} does not exist`);
      }

      for (let [keyIndex, keyName] of keys.entries()) {
        const isLast = keyIndex === keyLength - 1;

        data = data[keyName];

        if (isLast) {
          const removeValue = new Function(`return (state) => { delete state.${key}; }`)();
          removeValue(this.state);
        }
      }
    } catch {
      logger.error(`REMOVE - ${key} failed`);
    }
  }

  public clear(): object {
    this.state = {};
    return this.state;
  }

  private request(key: string): StateResponse {
    try {
      let { keys, data } = this.keyConfig(key);

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
        const findValue = new Function(`return (state) => state.${key}`)();
        data = findValue(this.state);
      }

      return {
        value: data,
        key: keyChain,
      };
    } catch {
      logger.error(`REQUEST - ${key} failed`);
    }
  }

  private write({ key, value }: StateWriteOptions): any {
    try {
      let { keyLength, keyEntries, data } = this.keyConfig(key);

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
      logger.error(`Write - ${key} failed`);
    }
  }

  private keyConfig(key: string): SateKeyConfig {
    let keys: Array<string> = [];
    let keyLength: number;
    let keyEntries: IterableIterator<[number, string]>;
    let data: any = {};

    try {
      keys = key.split('.');
      keyLength = keys.length;
      data = this.state;
    } catch {
      logger.error(`key must be a string e.g 'foo.bar' ${key}`);
    }

    return { keys, keyLength, keyEntries, data };
  }

  private typeCheck(action: string, { key, value, type }: StateTypeCheck) {
    const typeofValue = typeof value;

    if (type && typeofValue !== type) {
      logger.warn(`${action} - typeof ${key} !== '${type}'`);
      logger.debug(`${action} - typeof ${key} === '${typeofValue}'`);
    }
  }
})();
