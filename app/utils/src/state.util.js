"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = require("./logger.util");
const get_1 = __importDefault(require("lodash/get"));
const set_1 = __importDefault(require("lodash/set"));
const unset_1 = __importDefault(require("lodash/unset"));
const merge_1 = __importDefault(require("lodash/merge"));
const isUndefined_1 = __importDefault(require("lodash/isUndefined"));
const logger = new logger_util_1.LoggerUtil('StateUtil');
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
class StateUtil {
    /**
     * Add a new state value if none exists.
     * @param key Name of item key e.g. 'foo.bar.fizz'
     * @param options {@link StateOptions}.
     */
    static add(key, options) {
        try {
            let { value, type, stringify } = options;
            let item = this.requestItem(key, { stringify });
            if (item) {
                return logger.error(`${key} already exists. Use edit()`);
            }
            this.validateType('ADD', { key, value, type });
            value = this.writeItem({ key, value, stringify });
            return value;
        }
        catch (error) {
            logger.error(`ADD - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Get a state value if exists.
     * @param key Name of item key e.g. 'foo.bar.fizz'
     * @param options {@link StateOptions}.
     */
    static get(key, options = {}) {
        try {
            let { type, stringify } = options;
            const value = this.requestItem(key, { stringify });
            if (!value) {
                return logger.error(`GET - ${key} does not exist`);
            }
            this.validateType('GET', { key, value, type });
            return value;
        }
        catch (error) {
            logger.error(`GET - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Edit a state value if it exists.
     * @param key Name of item key e.g. 'foo.bar.fizz'
     * @param options {@link StateOptions}.
     */
    static edit(key, options) {
        try {
            let { value, type, merge, stringify } = options;
            const item = this.requestItem(key, { stringify });
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
                value = merge_1.default(item, value);
            }
            value = this.writeItem({ key, value, stringify });
            this.validateType('EDIT', { key, value, type });
            return value;
        }
        catch (error) {
            logger.error(`EDIT - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Remove a state value if exists.
     * @param key Name of item key e.g. 'foo.bar.fizz'
     * @param options {@link StateOptions}.
     */
    static remove(key, options = {}) {
        try {
            let { type } = options;
            const item = this.requestItem(key);
            if (!item) {
                logger.error(`REMOVE - ${item.key} does not exist`);
                return false;
            }
            this.validateType('REMOVE', { key, value: item.value, type });
            unset_1.default(this.state, key);
            return isUndefined_1.default(get_1.default(this.state, key));
        }
        catch (error) {
            logger.error(`REMOVE - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Clear the state.
     */
    static clear() {
        try {
            this.state = {};
            return true;
        }
        catch (error) {
            logger.error(`CLEAR - failed`);
            logger.debug(error);
        }
    }
    /**
     * Request a value by key.
     * @param key Name of item key e.g. 'foo.bar.fizz'
     * @param options {@link StateOptions}.
     */
    static requestItem(key, options = {}) {
        try {
            let { stringify } = options;
            let value = get_1.default(this.state, key);
            const isObject = typeof value === 'object';
            if (stringify) {
                value = isObject ? JSON.stringify(value) : String(value);
            }
            return value;
        }
        catch (error) {
            logger.error(`REQUEST - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Write a value to the matching key.
     * @param options {@link StateItem} & {@link StateOptions}.
     */
    static writeItem(options) {
        let { key } = options;
        try {
            let { value, stringify } = options;
            const isObject = value !== 'object';
            if (stringify) {
                value = isObject ? JSON.stringify(value) : String(value);
            }
            set_1.default(this.state, key, value);
            return value;
        }
        catch (error) {
            logger.error(`WRITE - ${key} failed`);
            logger.debug(error);
        }
    }
    /**
     * Checks that the requested value has the same type as provided in the arguement.
     * @param action Method type e.g "GET".
     * @param options {@link StateItem} & {@link StateOptions}.
     */
    static validateType(action, options) {
        try {
            let { key, value, type } = options;
            const typeofValue = typeof value;
            if (type && typeofValue !== type) {
                logger.warn(`${action} - typeof ${key} !== '${type}'`);
                logger.debug(`${action} - typeof ${key} === '${typeofValue}'`);
            }
        }
        catch (error) {
            logger.error(`TYPECHECK - couldn't check types`);
            logger.debug(error);
        }
    }
}
exports.StateUtil = StateUtil;
StateUtil.state = {};
//# sourceMappingURL=state.util.js.map