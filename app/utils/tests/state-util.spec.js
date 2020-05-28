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
        chai_1.expect(__1.StateUtil.remove).to.be.a('function');
    });
    it('Can add a value', () => {
        chai_1.expect(__1.StateUtil.add('foo.bar', { value: 1, type: 'number' }))
            .to.equal(1)
            .and.is.a('number');
    });
    it('Can get a value', () => {
        chai_1.expect(__1.StateUtil.get('foo.bar', { type: 'number' }))
            .to.equal(1)
            .and.is.a('number');
    });
    it('Can edit a value', () => {
        chai_1.expect(__1.StateUtil.edit('foo.bar', { value: 2, type: 'number' }))
            .to.equal(2)
            .and.is.a('number');
    });
    it('Can remove a value', () => {
        chai_1.expect(__1.StateUtil.remove('foo.bar')).to.equal(true);
    });
    it('Can clear state', () => {
        chai_1.expect(__1.StateUtil.clear()).to.equal(true);
    });
});
//# sourceMappingURL=state-util.spec.js.map