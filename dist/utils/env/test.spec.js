"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
const EnvUtilTest = describe('Get env', () => {
    it('should return env property', () => {
        chai_1.expect(_1.EnvUtil.get('NODE_ENV')).to.be.a('string');
    });
});
exports.EnvUtilTest = EnvUtilTest;
//# sourceMappingURL=test.spec.js.map