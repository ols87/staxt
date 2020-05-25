import { LoggerUtil } from './logger.util';

import _includes from 'lodash/includes';

const logger = new LoggerUtil('TimerUtil');

const timerStack: Array<string> = [];

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
 *
 * @category Utils
 */
export class TimerUtil {
  /**
   * Stores the time when a timer starts.
   */
  public startTime: number;

  /**
   * Stores the time when a timer end.
   */
  public endTime: number;

  /**
   * Checks if caller exists in the timerStack.
   * @param caller Unique name of calling file/reference.
   */
  constructor(public caller: string) {
    if (!_includes(timerStack, caller)) {
      this.caller = caller;
      timerStack.push(caller);
    } else {
      this.caller = 'timer';
      logger.error(`'${caller}' is already in the stack. Please choose a unique name`);
    }
  }

  /**
   * Starts a timer.
   * @returns Timestamp when called.
   */
  public start(): number {
    return (this.startTime = new Date().getTime());
  }

  /**
   * Ends a timer.
   * @returns Time as a number of seconds e,g 0.1;
   */
  public end(): number {
    let end: number | string = new Date().getTime() - this.startTime;
    let endTime: number | string = (end /= 1000);
    return endTime;
  }
}
