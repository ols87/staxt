import { LoggerUtil } from './logger.util';

export interface StateParams {
  value?: any;
  type?: string;
  stringify?: boolean;
  merge?: boolean;
}

export interface StateItem {
  key: string;
  value: any;
}

export interface StateParsedKey {
  keys: Array<string>;
  data: any;
  keyLength?: number;
  keyEntries?: IterableIterator<[number, string]>;
}

export interface StateWriteOptions {
  stringify?: boolean;
}

export interface StateTypeCheck {
  type: string;
}

const logger = new LoggerUtil('state');

/**
 * **Utility for managing state.**
 *
 * Example Usage:
 * ```ts
 * import { State } from '@utils';
 * const state = new State();
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

export class StateUtil {
  private static state: any = {};
  /**
   * Add a new state value if none exists
   */
  public static add(key: string, { value, type, stringify }: StateParams): any {
    try {
      let item: any = this.requestItem(key, { stringify });

      if (item) {
        return logger.error(`${key} already exists. Use edit()`);
      }

      this.validateType('ADD', { key, value, type });

      value = this.writeItem({ key, value, stringify });

      return value;
    } catch (error) {
      logger.error(`ADD - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Get a state value if exists
   */
  public static get(key: string, { type, stringify }: StateParams = {}): any {
    try {
      const value = this.requestItem(key, { stringify });

      if (!value) {
        return logger.error(`GET - ${key} does not exist`);
      }

      this.validateType('GET', { key, value, type });

      return value;
    } catch (error) {
      logger.error(`GET - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Edit a state value if it exists
   */
  public static edit(key: string, { value, type, merge, stringify }: StateParams): any {
    try {
      const item: StateItem = this.requestItem(key, { stringify });

      if (!item) {
        return logger.error(`${key} does not exist, use add()`);
      }

      const typeofItem = typeof item;
      const typeofValue = typeof value;

      if (typeofItem !== typeofValue) {
        logger.warn(`EDIT - changing ${key} from type '${typeofItem}' to type '${typeofValue}'`);
      }

      this.validateType('EDIT', { key, value, type });

      value = this.writeItem({ key, value, stringify });

      this.validateType('EDIT', { key, value, type });

      return value;
    } catch (error) {
      logger.error(`EDIT - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Remove a state value if exists
   */
  public static remove(key: string, { type }: StateParams): any {
    try {
      const item: StateItem = this.requestItem(key);

      if (!item.value) {
        return logger.error(`REMOVE - ${item.key} does not exist`);
      }

      this.validateType('REMOVE', { key, value: item.value, type });

      new Function(`return (state) => { delete state.${key}; }`)()(this.state);
    } catch (error) {
      logger.error(`REMOVE - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Clear the state
   */
  public static clear(): object {
    this.state = {};
    return this.state;
  }

  /**
   * Request a value by key
   */
  private static requestItem(key: string, { stringify }: StateParams = {}): any {
    try {
      let value = new Function(`return (state) => state.${key}`)()(this.state);

      const isObject = typeof value === 'object';

      if (stringify) {
        value = isObject ? JSON.stringify(value) : String(value);
      }

      return value;
    } catch (error) {
      logger.error(`REQUEST - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Write a value to the matching key
   */
  private static writeItem({ key, value, stringify }: StateItem & StateWriteOptions): any {
    try {
      const isObject = value !== 'object';

      if (stringify) {
        value = isObject ? JSON.stringify(value) : String(value);
      }

      value = new Function(`return (state, value) => state.${key} = ${value}`)()(this.state, value);

      return value;
    } catch (error) {
      logger.error(`WRITE - ${key} failed:`);
      logger.debug(error);
    }
  }

  /**
   * Checks that the requested value has the same type as provided in the arguement
   */
  private static validateType(action: string, { key, value, type }: StateItem & StateTypeCheck) {
    const typeofValue = typeof value;

    if (type && typeofValue !== type) {
      logger.warn(`${action} - typeof ${key} !== '${type}'`);
      logger.debug(`${action} - typeof ${key} === '${typeofValue}'`);
    }
  }
}
