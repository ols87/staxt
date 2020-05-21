#!/usr/bin/env node
import 'module-alias/register';

import { Utils } from '@utils';

export const Staxt = new (class {
  public utils = new Utils();
})();
