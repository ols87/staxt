import { EnvUtil } from '../src/env-util';
import { expect } from 'chai';

describe('Get env', () => {
  it('should return env property', () => {
    expect(EnvUtil.get('NODE_ENV')).to.be.a('string');
  });
});
