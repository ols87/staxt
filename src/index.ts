#!/usr/bin/env node
import 'module-alias/register';

import { StateUtil, TimerUtil, LoggerUtil } from '@utils';

export const Staxt = new (class {
  constructor() {
    const timer = new TimerUtil('index');
    const logger = new LoggerUtil('index');

    timer.start();

    StateUtil.add('foo', { value: 1 });
  }
})();
