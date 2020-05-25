import chalk from 'chalk';

import _has from 'lodash/has';
import _set from 'lodash/set';
import _includes from 'lodash/includes';

/**
 * [Chalk](https://www.npmjs.com/package/chalk) colors.
 */
export type LoggerChalkColors =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright';

/**
 * Maps a key to a [Chalk](https://www.npmjs.com/package/chalk) color.
 */
export interface LoggerColorMap {
  [key: string]: LoggerChalkColors;
}

export interface LoggerOptions {
  /**
   * Any valid key from {@link colorMap} that has a matching method.
   */
  type?: string;
  /**
   * Any valid [Chalk](https://www.npmjs.com/package/chalk) color.
   */
  color?: LoggerChalkColors;
}

const loggerStack: Array<string> = [];

/**
 * **Utility for logging to console.**
 *
 *
 * Example Usage:
 * ```ts
 * import { LoggerUtil } from '@utils';
 * const logger = new LoggerUtil('test');
 * //or
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
 */
export class LoggerUtil {
  /**
   * Creates a new [Chalk](https://www.npmjs.com/package/chalk) instance.
   */
  public readonly chalk: any = new chalk.Instance({
    level: 1,
  });

  /**
   * Maps method names to Chalk colorMap.
   */
  public colorMap: LoggerColorMap = {
    log: 'white',
    debug: 'blueBright',
    warn: 'yellow',
    error: 'red',
    success: 'green',
  };

  /**
   * Checks if caller exists in the loggerStack.
   * @param caller Unique name of calling file/reference.
   */
  constructor(public caller: string) {
    if (!_includes(loggerStack, caller)) {
      this.caller = caller;
      loggerStack.push(caller);
    } else {
      this.caller = 'logger';
      this.error(`'${caller}' is already in the stack. Please choose a unique name`);
    }
  }

  public log(message: any) {
    return this.write(message, {
      type: 'log',
    });
  }

  public debug(message: any) {
    return this.write(message, {
      type: 'debug',
    });
  }

  public warn(message: any) {
    return this.write(message, {
      type: 'warn',
    });
  }

  public error(message: any) {
    return this.write(message, {
      type: 'error',
    });
  }

  public success(message: any) {
    return this.write(message, {
      type: 'success',
    });
  }

  /**
   * Writes a message to the console
   */

  public write(message: string, options: LoggerOptions = {}): void {
    let { type, color } = options;

    try {
      type = type || 'log';
      const chalkColor = color || this.colorMap[type];
      const caller = this.caller.toUpperCase();
      const logType = type.toUpperCase();
      const prefix = this.chalk[chalkColor].bold(`[${caller}-${logType}]`);

      return console.log(`${prefix}: ${this.chalk.white(message)}`);
    } catch {
      return this.write(`bad chalk color mapping: ${message}`, { type: 'error' });
    }
  }

  /**
   * Adds a new log method and {@link colorMap}
   */
  public add(options: LoggerOptions) {
    let { type, color } = options;

    if (_has(this, type)) {
      return this.error(`method ${type} already exists`);
    }

    if (_has(this.colorMap, type)) {
      this.colorMap[type] = color;
      return this.error(`color map ${type} already exists`);
    }

    _set(this, type, (message: string) => {
      return this.write(message, {
        type: type,
      });
    });
  }
}
