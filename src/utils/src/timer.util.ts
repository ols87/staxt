import { LoggerUtil } from './logger.util';

const logger = new LoggerUtil('timer');

const timerStack: Array<string> = [];

export class TimerUtil {
  public startTime: number;
  public endTime: number;

  constructor(public caller: string) {
    if (timerStack.indexOf(caller) < 0) {
      this.caller = caller;
      timerStack.push(caller);
    } else {
      this.caller = 'timer';
      logger.error(`'${caller}' is already in the stack. Please choose a unique name`);
    }
  }

  public start(): number {
    return (this.startTime = new Date().getTime());
  }

  public end(): number {
    let end: number | string = new Date().getTime() - this.startTime;
    let endTime: number | string = (end /= 1000);
    return endTime;
  }
}
