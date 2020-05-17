#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil } from '@utils';

const test = './test';

import(test).then((Page) => {
  const page = new Page.default();
  let { meta, model } = page;

  if (typeof meta === 'function') {
    meta = meta();
  }

  if (typeof model === 'function') {
    model = model();
  }
  console.log({ meta, model });
});
