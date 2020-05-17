/**
 * Utility for logging to Node
 *
 * Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 * ```
 */

export namespace LoggerUtil {
  /**
   * @param msg  Message to log.
   */
  export function message(msg: string) {
    console.log(msg);
  }
}
