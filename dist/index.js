#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const test = './test';
Promise.resolve().then(() => __importStar(require(test))).then((Page) => {
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
//# sourceMappingURL=index.js.map