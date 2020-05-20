#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil, LoggerUtil, StateUtil } from '@utils';

(async () => {
  EnvUtil.get('NODE_ENV');
  StateUtil.add({ keyMap: 'foo.bar.fizz.buzz', keyData: 1, keyType: 'number' });

  var a = StateUtil.get({ keyMap: 'foo.bar.fizz.buzz', keyType: 'number' });

  StateUtil.edit({ keyMap: 'foo.bar.fizz.buzz', keyData: (a + 1).toString(), keyType: 'string' });
})();
