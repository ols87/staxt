#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const _utils_1 = require("@utils");
console.log(_utils_1.EnvUtil.get('NODE_ENV'));
console.log(_utils_1.LoggerUtil.message('Hello'));
//# sourceMappingURL=index.js.map