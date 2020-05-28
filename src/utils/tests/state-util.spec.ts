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
    expect(StateUtil.remove).to.be.a('function');
  });

  it('Can add a value', () => {
    expect(StateUtil.add('foo.bar', { value: 1, type: 'number' }))
      .to.equal(1)
      .and.is.a('number');
  });

  it('Can get a value', () => {
    expect(StateUtil.get('foo.bar', { type: 'number' }))
      .to.equal(1)
      .and.is.a('number');
  });

  it('Can edit a value', () => {
    expect(StateUtil.edit('foo.bar', { value: 2, type: 'number' }))
      .to.equal(2)
      .and.is.a('number');
  });

  it('Can remove a value', () => {
    expect(StateUtil.remove('foo.bar')).to.equal(true);
  });

  it('Can clear state', () => {
    expect(StateUtil.clear()).to.equal(true);
  });
});
