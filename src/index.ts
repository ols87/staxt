#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil, LoggerUtil, StateUtil } from '@utils';

(async () => {
  EnvUtil.get('NODE_ENV');

  StateUtil.get('foo.bar');

  StateUtil.add('foo.bar.fizz.buzz', { value: 1, type: 'string' });

  var a = StateUtil.get('foo.bar.fizz.buzz');

  StateUtil.edit('foo.bar.fizz.buzz', { value: a + 1 });

  // StateUtil.remove('foo.bar.fizz', { type: 'object' });

  LoggerUtil.debug(StateUtil.get('foo.bar', { stringify: true }));
})();
