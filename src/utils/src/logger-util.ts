/**
 * Utility for logging to Node
 *
 * Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 * ```
 */

export class LoggerUtil {
  /**
   * @param msg  Message to log.
   */
  public static message(msg: string) {
    console.log(msg);
  }
}
