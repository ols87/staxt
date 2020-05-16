"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvUtil = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Returns an env object
 *
 * Basic usage example:
 *
 * ```ts
 * import { EnvUtil } from '@utils/env';
 *
 * const node_env = EnvUtil.get('NODE_ENV');
 *
 * console.log(node_env);
 * ```
 */
var EnvUtil;
(function (EnvUtil) {
    const config = dotenv_1.default.config();
    if (config.error) {
        throw config.error;
    }
    const env = config.parsed;
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