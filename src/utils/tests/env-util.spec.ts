import { Env } from '../utils.module';
import { expect } from 'chai';

describe('EnvUtil', () => {
  it('Creates a class', () => {
    expect(Env).to.be.a('function');
  });

  it('Creates a config property', () => {
    expect(Env).has.property('config');
  });

  it('Returns NODE_ENV property from get method', () => {
    expect(Env.get('NODE_ENV')).to.be.a('string');
  });
});
