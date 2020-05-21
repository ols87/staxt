import { State } from './state.util';
import { Logger } from './logger.util';

export class Utils {
  public state = State;

  public logger(caller: string) {
    return new Logger(caller);
  }
}

export * from './state.util';
export * from './logger.util';
