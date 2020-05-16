#!/usr/bin/env node
import 'module-alias/register';

import { EnvUtil } from '@utils/env-util';

console.log(EnvUtil.get('NODE_ENV'));
