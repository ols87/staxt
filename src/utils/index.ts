import { EnvUtil } from './src/env-util';
import { StateUtil } from './src/state-util';
import { LoggerUtil } from './src/logger-util';

export class Utils {
  public static env: EnvUtil = EnvUtil;
  public static state: StateUtil = StateUtil;
  public static logger: LoggerUtil = LoggerUtil;
}

export * from './src/env-util';
export * from './src/state-util';
export * from './src/logger-util';
