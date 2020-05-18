/**
 * Utility for logging to Node
 *
 * Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 * ```
 */

import chalk from 'chalk';

/**
 * Sets color for each log type.
 */
export interface LoggerConfig {
  message: string;
  type: 'log' | 'debug' | 'warn' | 'error';
}

/**
 * Sets color for each log type.
 */
export enum LoggerTypes {
  log = 'white',
  debug = 'blueBright',
  warn = 'yellow',
  error = 'red',
}

export class LoggerUtil {
  /**
   * Creates a new instance of Chalk.
   */
  private static logger: any = new chalk.Instance({
    level: 1,
  });

  /**
   * @returns Creates a white console log [LOG].
   * @param message  Message to log.
   *
   * ```ts
   * LoggerUtil.log('Some log here');
   * ```
   */
  public static log(message: string) {
    return this.write({
      message,
      type: 'log',
    });
  }

  /**
   * @returns Creates a blue console log [DEBUG].
   * @param message  Message to log.
   *
   * ```ts
   * LoggerUtil.log('Some log here');
   * ```
   */
  public static debug(message: string) {
    return this.write({
      message,
      type: 'debug',
    });
  }

  /**
   * @returns Creates a yellow console log [WARN].
   * @param message  Message to log.
   *
   * ```ts
   * LoggerUtil.log('Some warning here');
   * ```
   */
  public static warn(message: string) {
    return this.write({
      message,
      type: 'warn',
    });
  }

  /**
   * @returns Creates a red console log [Error].
   * @param message  Message to log.
   *
   * ```ts
   * LoggerUtil.error('Some error here');
   * ```
   */
  public static error(message: string) {
    return this.write({
      message,
      type: 'error',
    });
  }

  /**
   * @returns Writes to the console using chalk.
   * @param LoggerConfig message and type.
   *
   * ```ts
   * return this.write({
   *   message,
   *   type: 'error',
   * });
   * ```
   */
  private static write({ message, type }: LoggerConfig) {
    const color = LoggerTypes[type as keyof typeof LoggerTypes];
    const prefix = this.logger[color].bold(`[${type.toUpperCase()}]`);

    return console.log(`${prefix}: ${this.logger.white(message)}`);
  }
}
