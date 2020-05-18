#!/usr/bin/env node
require('module-alias/register');

import { LoggerUtil } from '@utils';

(async () => {
  LoggerUtil.debug('Testing 123');

  const test = './test';

  const Page = await import(test);
  const page = new Page.default();

  let { meta, model } = page;

  if (typeof meta === 'function') {
    meta = meta();
  }

  if (typeof model === 'function') {
    model = model();
  }

  console.log({ meta, model });
})();
