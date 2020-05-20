import chalk from 'chalk';

/**
 * Parameters for writing to the console.
 *
 * **Used at**:
 * - {@link LoggerUtil.write}
 */
export interface LogParams {
  /**
   * e.g. 'Hello World'
   */
  message: string;
  /**
   * e.g. 'log'
   */
  type: string;
}

/**
 * Utility for logging to Node
 *
 * Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 *
 * LoggerUtil.log('log message');
 * LoggerUtil.debug('debug message');
 * LoggerUtil.warn('warn message');
 * LoggerUtil.error('error message');
 * LoggerUtil.success('success message');
 * ```
 */

export class LoggerUtil {
  /**
   * Creates a new [Chalk](https://www.npmjs.com/package/chalk) instance.
   */
  public static chalk: any = new chalk.Instance({
    level: 1,
  });

  public static colors: any = {
    log: 'white',
    debug: 'blueBright',
    warn: 'yellow',
    error: 'red',
    success: 'green',
  };

  /**
   * ```ts
   * LoggerUtil.log('log message');
   * ```
   */
  public static log(message: string) {
    return this.write({
      message,
      type: 'log',
    });
  }

  /**
   * ```ts
   * LoggerUtil.debug('log message');
   * ```
   */
  public static debug(message: string) {
    return this.write({
      message,
      type: 'debug',
    });
  }

  /**
   * @param
   *
   * ```ts
   * LoggerUtil.warn('warning message');
   * ```
   */
  public static warn(message: string) {
    return this.write({
      message,
      type: 'warn',
    });
  }

  /**
   * ```ts
   * LoggerUtil.error('error message');
   * ```
   */
  public static error(message: string) {
    return this.write({
      message,
      type: 'error',
    });
  }

  /**
   * ```ts
   * LoggerUtil.success('success message');
   * ```
   */
  public static success(message: string) {
    return this.write({
      message,
      type: 'success',
    });
  }

  /**
   * ```ts
   * this.write({
   *   message,
   *   type: 'log',
   * });
   * ```
   */
  public static write({ message, type }: LogParams): void {
    try {
      const color = this.colors[type];
      const prefix = this.chalk[color].bold(`[${type.toUpperCase()}]`);

      return console.log(`${prefix}: ${this.chalk.white(message)}`);
    } catch {
      return this.error(`incorrect color mapping for '${type}'`);
    }
  }
}
