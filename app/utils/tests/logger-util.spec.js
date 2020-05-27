"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const chai_1 = require("chai");
const logger = new __1.LoggerUtil('test');
describe('LoggerUtil', () => {
    it('Creates a class', () => {
        chai_1.expect(logger).to.be.an('object');
        chai_1.expect(logger.caller).to.equal('test');
    });
    it('Creates a Chalk instance', () => {
        chai_1.expect(logger.chalk).to.be.a('function').that.has.property('Instance');
    });
    it('Maps colors to log types', () => {
        chai_1.expect(logger.colorMap).to.be.an('object').and.to.have.all.keys({
            log: 'white',
            debug: 'blueBright',
            warn: 'yellow',
            error: 'red',
            success: 'green',
        });
    });
    it('Has methods: log, debug, warn, error, success', () => {
        chai_1.expect(logger.log).to.be.a('function');
        chai_1.expect(logger.debug).to.be.a('function');
        chai_1.expect(logger.warn).to.be.a('function');
        chai_1.expect(logger.error).to.be.a('function');
        chai_1.expect(logger.success).to.be.a('function');
    });
});
//# sourceMappingURL=logger-util.spec.js.map