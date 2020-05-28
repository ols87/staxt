"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const chai_1 = require("chai");
describe('StateUtil', () => {
    it('Creates a class', () => {
        chai_1.expect(__1.StateUtil).to.be.a('function');
    });
    it('Has methods: add, get, edit, remove', () => {
        chai_1.expect(__1.StateUtil.add).to.be.a('function');
        chai_1.expect(__1.StateUtil.get).to.be.a('function');
        chai_1.expect(__1.StateUtil.edit).to.be.a('function');
    });
});
//# sourceMappingURL=state-util.spec.js.map