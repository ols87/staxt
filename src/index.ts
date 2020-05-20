#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil, LoggerUtil, StateUtil } from '@utils';

(async () => {
  EnvUtil.get('NODE_ENV');
  StateUtil.add({ keyMap: 'foo.bar.fizz.buzz', keyData: 1 });
  StateUtil.add({ keyMap: 'foo.bar', keyData: { fizz: { buzz: 1 } } });
})();
