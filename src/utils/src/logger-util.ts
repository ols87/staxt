import chalk from 'chalk';

/**
 * Parameters for writing to the console.
 */
export interface LoggerWriteOptions {
  type?: string;
  color?: string;
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
 *
 * LoggerUtil.write({
 *   message,
 *   type: 'log',
 *   color: 'cyan',
 * });
 * ```
 */

export class LoggerUtil {
  /**
   * Creates a new [Chalk](https://www.npmjs.com/package/chalk) instance.
   */
  public static chalk: any = new chalk.Instance({
    level: 1,
  });

  /**
   * Maps method names to Chalk colorMap
   */
  public static colorMap: any = {
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
    return this.write(message, {
      type: 'log',
    });
  }

  /**
   * ```ts
   * LoggerUtil.debug('log message');
   * ```
   */
  public static debug(message: string) {
    return this.write(message, {
      type: 'debug',
    });
  }

  /**
   * ```ts
   * LoggerUtil.warn('warning message');
   * ```
   */
  public static warn(message: string) {
    return this.write(message, {
      type: 'warn',
    });
  }

  /**
   * ```ts
   * LoggerUtil.error('error message');
   * ```
   */
  public static error(message: string) {
    return this.write(message, {
      type: 'error',
    });
  }

  /**
   * ```ts
   * LoggerUtil.success('success message');
   * ```
   */
  public static success(message: string) {
    return this.write(message, {
      type: 'success',
    });
  }

  /**
   * ```ts
   * LoggerUtil.write({
   *   message,
   *   type: 'log',
   *   color: 'magenta'
   * });
   * ```
   */
  public static write(message: string, { type, color }: LoggerWriteOptions = {}): void {
    try {
      type = type || 'log';
      const chalkColor = color || this.colorMap[type];
      const prefix = this.chalk[chalkColor].bold(`[${type.toUpperCase()}]`);

      return console.log(`${prefix}: ${this.chalk.white(message)}`);
    } catch {
      return this.error(`bad chalk color mapping: ${message}`);
    }
  }
}
