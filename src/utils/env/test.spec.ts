import { EnvUtil } from '.';
import { expect } from 'chai';

const EnvUtilTest = describe('Get env', () => {
  it('should return env property', () => {
    expect(EnvUtil.get('NODE_ENV')).to.be.a('string');
  });
});

export { EnvUtilTest };
