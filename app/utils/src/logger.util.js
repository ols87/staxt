"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const has_1 = __importDefault(require("lodash/has"));
const set_1 = __importDefault(require("lodash/set"));
const includes_1 = __importDefault(require("lodash/includes"));
const loggerStack = [];
/**
 *
 * **Utility for logging to console.**
 *
 * Example Usage:
 * ```
 * import { LoggerUtil } from '@utils';
 *
 * const logger = new LoggerUtil('test');
 *
 * logger.log('log message'); // [TEST-LOG]: log message
 * logger.debug('debug message'); // [TEST-DEBUG]: debug message
 * logger.warn('warn message'); // [TEST-WARN]: warn message
 * logger.error('error message'); // [TEST-ERROR]: error message
 * logger.success('success message'); // [TEST-SUCCESS]: success message
 *
 * logger.write({
 *   message: 'foo bar',
 *   type: 'log',
 *   color: 'cyan',
 * });
 *
 * logger.add({
 *   type: 'foo',
 *   color: 'magenta',
 * });
 *
 * logger.foo('foo message') // [TEST-FOO]: foo message
 * ```
 *
 * @category Utils
 */
class LoggerUtil {
    /**
     * Checks if caller exists in the loggerStack.
     * @param caller Unique name of calling file or reference.
     */
    constructor(caller) {
        this.caller = caller;
        if (!includes_1.default(loggerStack, caller)) {
            this.caller = caller;
            loggerStack.push(caller);
            this.init();
        }
        else {
            this.caller = 'logger';
            this.error(`'${caller}' is already in the stack. Please choose a unique name`);
        }
    }
    /**
     * Sets the defaults during costructor initiation. Can be used to reset an instance. Removing any added loggers.
     */
    init() {
        this.chalk = new chalk_1.default.Instance({
            level: 1,
        });
        this.colorMap = {
            log: 'white',
            debug: 'blueBright',
            warn: 'yellow',
            error: 'red',
            success: 'green',
        };
    }
    /**
     * Log message.
     * @param message Message to write.
     */
    log(message) {
        return this.write(message, {
            type: 'log',
        });
    }
    /**
     * Debug message.
     * @param message Message to write.
     */
    debug(message) {
        return this.write(message, {
            type: 'debug',
        });
    }
    /**
     * Warn message.
     * @param message Message to write.
     */
    warn(message) {
        return this.write(message, {
            type: 'warn',
        });
    }
    /**
     * Error message.
     * @param message Message to write.
     */
    error(message) {
        return this.write(message, {
            type: 'error',
        });
    }
    /**
     * Success message.
     * @param message Message to write.
     */
    success(message) {
        return this.write(message, {
            type: 'success',
        });
    }
    /**
     * Writes a messaqge to console.
     * @param message Message to write.
     * @param options {@link LoggerWriteOptions}.
     */
    write(message, options = {}) {
        let { type, color } = options;
        try {
            type = type || 'log';
            const chalkColor = color || this.colorMap[type];
            const caller = this.caller.toUpperCase();
            const logType = type.toUpperCase();
            const prefix = this.chalk[chalkColor].bold(`[${caller}-${logType}]`);
            return console.log(`${prefix}: ${this.chalk.white(message)}`);
        }
        catch (_a) {
            return this.write(`bad chalk color mapping: ${message}`, { type: 'error' });
        }
    }
    /**
     * Adds a new log method and [colorMap]{@link LoggerUtil#colorMap}.
     * @param options {@link LoggerWriteOptions}.
     */
    add(options) {
        let { type, color } = options;
        if (has_1.default(this, type)) {
            return this.error(`method ${type} already exists`);
        }
        if (has_1.default(this.colorMap, type)) {
            this.colorMap[type] = color;
            return this.error(`color map ${type} already exists`);
        }
        set_1.default(this, type, (message) => {
            return this.write(message, {
                type: type,
            });
        });
    }
}
exports.LoggerUtil = LoggerUtil;
//# sourceMappingURL=logger.util.js.map