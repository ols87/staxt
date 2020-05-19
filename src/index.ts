#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil, LoggerUtil, StateUtil } from '@utils';

(async () => {
  // LoggerUtil.success('Testing 123');
  // LoggerUtil.debug('Testing 123');
  EnvUtil.get('NODE_ENV');
  LoggerUtil.log(StateUtil.get({ keyMap: 'foo.bar.fizz', keyType: 'string' }));
})();
