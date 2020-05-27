#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const _utils_1 = require("@utils");
exports.Staxt = new (class {
    constructor() {
        const timer = new _utils_1.TimerUtil('index');
        const logger = new _utils_1.LoggerUtil('index');
        _utils_1.StateUtil.add('foo', { value: 1 });
        logger.debug(_utils_1.StateUtil.get('foo'));
    }
})();
//# sourceMappingURL=index.js.map