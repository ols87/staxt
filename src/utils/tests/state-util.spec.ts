import { StateUtil } from '..';
import { expect } from 'chai';

describe('StateUtil', () => {
  it('Creates a class', () => {
    expect(StateUtil).to.be.a('function');
  });

  it('Has methods: add, get, edit, remove', () => {
    expect(StateUtil.add).to.be.a('function');
    expect(StateUtil.get).to.be.a('function');
    expect(StateUtil.edit).to.be.a('function');
  });
});
