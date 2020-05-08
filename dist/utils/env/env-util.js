"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Returns an env object
 *
 * Basic usage example:
 *
 * ```ts
 * import { EnvUtil } from '@utils/env';
 *
 * const node_env = EnvUtil.get('NODE_ENV);
 *
 * console.log(node_env);
 * ```
 */
const EnvUtil = new (class {
    constructor() {
        this.set();
    }
    set() {
        const config = dotenv_1.default.config();
        if (config.error) {
            throw config.error;
        }
        try {
            this.env = config.parsed;
        }
        catch (error) {
            console.error(error);
        }
    }
    get(key) {
        try {
            const has = Object.prototype.hasOwnProperty;
            if (has.call(this.env, key)) {
                return this.env[key];
            }
            throw `No env key "${key}"`;
        }
        catch (error) {
            console.error(error);
        }
    }
})();
exports.EnvUtil = EnvUtil;
//# sourceMappingURL=env-util.js.map