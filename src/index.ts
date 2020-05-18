#!/usr/bin/env node
require('module-alias/register');

import { LoggerUtil } from '@utils';

(async () => {
  LoggerUtil.success('Testing 123');
  LoggerUtil.debug('Testing 123');
})();
