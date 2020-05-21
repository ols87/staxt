#!/usr/bin/env node
import 'module-alias/register';

import { EnvUtil, LoggerUtil, StateUtil } from '@utils';

export class Staxt {
  public static init() {
    LoggerUtil.write('hello');
  }
}

Staxt.init();
