import chalk from 'chalk';

/**
 * Parameters for writing to the console.
 */
export interface LoggerWriteOptions {
  type?: string;
  color?: string;
}

/**
 * Stores unique caller names.
 */
export const loggerStack: Array<string> = [];

/**
 * Utility for logging to Node.
 *
 * Usage:
 * ```ts
 * import { Logger } from '@utils';
 *
 * const logger = new Logger('test');
 *
 * logger.log('log message'); // [TEST-LOG]: log message
 * logger.debug('debug message'); // [TEST-DEBUG]: debug message
 * logger.warn('warn message'); // [TEST-WARN]: warn message
 * logger.error('error message'); // [TEST-ERROR]: error message
 * logger.success('success message'); // [TEST-SUCCESS]: success message
 *
 * //or
 * logger.write({
 *   message: 'foo bar',
 *   type: 'log',
 *   color: 'cyan',
 * });
 *  // [TEST-LOG]: log message
 * ```
 */
export class Logger {
  /**
   * Creates a new [Chalk](https://www.npmjs.com/package/chalk) instance.
   */
  public chalk: any = new chalk.Instance({
    level: 1,
  });

  /**
   * Maps method names to Chalk colorMap.
   */
  public colorMap: any = {
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
    if (loggerStack.indexOf(caller) < 0) {
      this.caller = caller;
      loggerStack.push(caller);
    } else {
      this.error(`${caller} is already in the stack. Please choose a unique name`);
    }
  }

  public log(message: string) {
    return this.write(message, {
      type: 'log',
    });
  }

  public debug(message: string) {
    return this.write(message, {
      type: 'debug',
    });
  }

  public warn(message: string) {
    return this.write(message, {
      type: 'warn',
    });
  }

  public error(message: string) {
    return this.write(message, {
      type: 'error',
    });
  }

  public success(message: string) {
    return this.write(message, {
      type: 'success',
    });
  }

  public write(message: string, { type, color }: LoggerWriteOptions = {}): void {
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
}
