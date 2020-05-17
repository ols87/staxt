#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil, LoggerUtil } from '@utils';

console.log(EnvUtil.get('NODE_ENV'));

console.log(LoggerUtil.message('Hello'));
