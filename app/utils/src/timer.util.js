"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = require("./logger.util");
const includes_1 = __importDefault(require("lodash/includes"));
const logger = new logger_util_1.LoggerUtil('timer');
const timerStack = [];
/**
 * **Utility for timing operations.**
 *
 * Example Usage:
 * ```ts
 * import { TimerUtil } from '@utils';
 *
 * const time = new TimerUtil('test');
 *
 * time.start();
 * timer.end();
 * ```
 */
class TimerUtil {
    /**
     * Checks if caller exists in the timerStack.
     * @param caller Unique name of calling file/reference.
     */
    constructor(caller) {
        this.caller = caller;
        if (!includes_1.default(timerStack, caller)) {
            this.caller = caller;
            timerStack.push(caller);
        }
        else {
            this.caller = 'timer';
            logger.error(`'${caller}' is already in the stack. Please choose a unique name`);
        }
    }
    /**
     * Starts a timer.
     * @returns Timestamp when called.
     */
    start() {
        return (this.startTime = new Date().getTime());
    }
    /**
     * Ends a timer.
     * @returns Time as a number of seconds e,g 0.1;
     */
    end() {
        let end = new Date().getTime() - this.startTime;
        let endTime = (end /= 1000);
        return endTime;
    }
}
exports.TimerUtil = TimerUtil;
//# sourceMappingURL=timer.util.js.map