import { EnvUtil } from '../src/env-util';
import { expect } from 'chai';

describe('EnvUtil', () => {
  it('Creates a class', () => {
    expect(EnvUtil).to.be.a('function');
  });

  it('Creates a config property', () => {
    expect(EnvUtil).has.property('config');
  });

  it('Returns NODE_ENV property from get method', () => {
    expect(EnvUtil.get('NODE_ENV')).to.be.a('string');
  });
});
