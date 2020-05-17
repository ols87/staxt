"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvUtil = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Utility for working with .env file
 *
 * Usage:
 * ```ts
 * import { EnvUtil } from '@utils/env-util';
 * ```
 */
var EnvUtil;
(function (EnvUtil) {
    const config = dotenv_1.default.config();
    if (config.error) {
        throw config.error;
    }
    const env = config.parsed;
    /**
     * @param key  Name of .env key.
     * @returns Value of .env key.
     */
    function get(key) {
        const has = Object.prototype.hasOwnProperty;
        if (has.call(env, key)) {
            return env[key];
        }
        console.error(`No env key "${key}"`);
    }
    EnvUtil.get = get;
})(EnvUtil || (EnvUtil = {}));
exports.EnvUtil = EnvUtil;
//# sourceMappingURL=env-util.js.map