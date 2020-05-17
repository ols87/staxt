"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvUtil = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Utility for working with a .env file

 * ```ts
 * import { EnvUtil } from '@utils';
 * ```
 */
class EnvUtil {
    /**
     * @returns env file as a javascript object.
     *
     * ```ts
     * const envFile: any = this.getEnv();
     * console.log(nodeEnv); // { NODE_ENV: 'development', ...}
     * ```
     */
    static getEnv() {
        this.config = dotenv_1.default.config();
        if (this.config.error) {
            throw this.config.error;
        }
        return this.config.parsed;
    }
    /**
     * @param key  Name of .env key.
     * @returns Value of .env key.
     *
     * ```ts
     * const nodeEnv = EnvUtil.get('NODE_ENV')
     * console.log(nodeEnv); // 'development'
     * ```
     */
    static get(key) {
        const envFile = this.getEnv();
        const has = Object.prototype.hasOwnProperty;
        if (has.call(envFile, key)) {
            return envFile[key];
        }
        console.error(`No env key "${key}"`);
    }
}
exports.EnvUtil = EnvUtil;
//# sourceMappingURL=env-util.js.map