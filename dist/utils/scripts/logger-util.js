"use strict";
/**
 * Utility for logging to Node
 *
 * Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerUtil = void 0;
var LoggerUtil;
(function (LoggerUtil) {
    /**
     * @param msg  Message to log.
     */
    function message(msg) {
        console.log(msg);
    }
    LoggerUtil.message = message;
})(LoggerUtil = exports.LoggerUtil || (exports.LoggerUtil = {}));
//# sourceMappingURL=logger-util.js.map