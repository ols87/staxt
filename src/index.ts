#!/usr/bin/env node
import 'module-alias/register';

import { StateUtil, TimerUtil, LoggerUtil } from '@utils';

export const Staxt = new (class {
  constructor() {
    const timer = new TimerUtil('index');
    const logger = new LoggerUtil('index');

    StateUtil.add('foo.bar', { value: 1 });

    logger.debug(StateUtil.get('foo', { stringify: true }));
  }
})();
