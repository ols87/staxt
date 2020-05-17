#!/usr/bin/env node
require('module-alias/register');

import { EnvUtil } from '@utils';

console.log(EnvUtil.get('NODE_ENV'));
