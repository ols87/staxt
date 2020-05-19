import chalk from 'chalk';

/**
 * Available log types
 */
export type LogType = 'log' | 'debug' | 'warn' | 'error' | 'success';

/**
 * Available log colors
 */
export type LogColor = 'white' | 'blueBright' | 'yellow' | 'red' | 'green';

/**
 *  Maps a LogType to a LogColor.
 *
 * **Used at**:
 * - {@link LoggerUtil.colors}
 */
export type LogColorMaps = Record<LogType, LogColor>;

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
  type: LogType;
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
  public static logger: any = new chalk.Instance({
    level: 1,
  });

  /**
   * Maps a color to each log type.
   *
   * **Type**: {@link LogColorMaps}
   */
  public static colors: LogColorMaps = {
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
  private static write({ message, type }: LogParams): void {
    try {
      const color = this.colors[type];
      const prefix = this.logger[color].bold(`[${type.toUpperCase()}]`);

      return console.log(`${prefix}: ${this.logger.white(message)}`);
    } catch {
      return this.error(`incorrect color mapping for '${type}'`);
    }
  }
}
