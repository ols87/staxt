#!/usr/bin/env node
import 'module-alias/register';

import { Logger, Env } from '@utils';

const logger = new Logger('index');

Env.get('NODE_ENV');

logger.log('hello');
