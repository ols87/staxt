import { State } from './state.utility';
import { Logger } from './logger.utility';

class Utils {
  public state = State;

  public logger(caller: string) {
    return new Logger(caller);
  }
}

export * from './state.utility';
export * from './logger.utility';
