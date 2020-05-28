import { LoggerUtil } from './logger.util';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import _merge from 'lodash/merge';
import _isUndefined from 'lodash/isUndefined';

/**
 * A state item, key & value.
 */
export interface StateItem {
  /**
   * Name of item key e.g. 'foo.bar.fizz'
   */
  key: string;
  /**
   * Any type of value.
   */
  value: any;
}

/**
 * Options for dealing with state.
 */
export interface StateOptions {
  /**
   * Any value.
   */
  value?: any;
  /**
   * Type of item.
   */
  type?: string;
  /**
   * Stringify item? Uses JSON.stringify() or String() depending on type.
   */
  stringify?: boolean;
  /**
   * Merge new value with old value?
   */
  merge?: boolean;
}

const logger = new LoggerUtil('StateUtil');

/**
 * **Utility for managing state. Supports optional type warnings.**
 *
 * Example Usage:
 * ```ts
 * import { StateUtil } from '@utils';
 *
 * StateUtil.add('foo', { value: 'bar', type: 'string' });
 * StateUtil.edit('foo', { value: 1, type: 'number' });
 * StateUtil.get('foo'); // returns 1
 * StateUtil.remove('foo');
 * StateUtil.clear();
 * ```
 *
 * @category Utils
 */

export class StateUtil {
  private static state: any = {};

  /**
   * Add a new state value if none exists.
   * @param key Name of item key e.g. 'foo.bar.fizz'
   * @param options {@link StateOptions}.
   */

  public static add(key: string, options: StateOptions): any {
    try {
      let { value, type, stringify } = options;

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
   * Get a state value if exists.
   * @param key Name of item key e.g. 'foo.bar.fizz'
   * @param options {@link StateOptions}.
   */
  public static get(key: string, options: StateOptions = {}): any {
    try {
      let { type, stringify } = options;

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
   * Edit a state value if it exists.
   * @param key Name of item key e.g. 'foo.bar.fizz'
   * @param options {@link StateOptions}.
   */
  public static edit(key: string, options: StateOptions): any {
    try {
      let { value, type, merge, stringify } = options;

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

      if (merge && typeofItem === 'object' && typeofValue === 'object') {
        value = _merge(item, value);
      }

      value = this.writeItem({ key, value, stringify });

      this.validateType('EDIT', { key, value, type });

      return value;
    } catch (error) {
      logger.error(`EDIT - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Remove a state value if exists.
   * @param key Name of item key e.g. 'foo.bar.fizz'
   * @param options {@link StateOptions}.
   */
  public static remove(key: string, options: StateOptions = {}): boolean {
    try {
      let { type } = options;

      const item: StateItem = this.requestItem(key);

      if (!item) {
        logger.error(`REMOVE - ${item.key} does not exist`);
        return false;
      }

      this.validateType('REMOVE', { key, value: item.value, type });

      _unset(this.state, key);

      return _isUndefined(_get(this.state, key));
    } catch (error) {
      logger.error(`REMOVE - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Clear the state.
   */
  public static clear(): boolean {
    try {
      this.state = {};
      return true;
    } catch (error) {
      logger.error(`CLEAR - failed`);
      logger.debug(error);
    }
  }

  /**
   * Request a value by key.
   * @param key Name of item key e.g. 'foo.bar.fizz'
   * @param options {@link StateOptions}.
   */
  private static requestItem(key: string, options: StateOptions = {}): any {
    try {
      let { stringify } = options;

      let value = _get(this.state, key);

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
   * Write a value to the matching key.
   * @param options {@link StateItem} & {@link StateOptions}.
   */
  private static writeItem(options: StateItem & StateOptions): any {
    let { key } = options;

    try {
      let { value, stringify } = options;

      const isObject = value !== 'object';

      if (stringify) {
        value = isObject ? JSON.stringify(value) : String(value);
      }

      _set(this.state, key, value);

      return value;
    } catch (error) {
      logger.error(`WRITE - ${key} failed`);
      logger.debug(error);
    }
  }

  /**
   * Checks that the requested value has the same type as provided in the arguement.
   * @param action Method type e.g "GET".
   * @param options {@link StateItem} & {@link StateOptions}.
   */
  private static validateType(action: string, options: StateItem & StateOptions) {
    try {
      let { key, value, type } = options;

      const typeofValue = typeof value;

      if (type && typeofValue !== type) {
        logger.warn(`${action} - typeof ${key} !== '${type}'`);
        logger.debug(`${action} - typeof ${key} === '${typeofValue}'`);
      }
    } catch (error) {
      logger.error(`TYPECHECK - couldn't check types`);
      logger.debug(error);
    }
  }
}
