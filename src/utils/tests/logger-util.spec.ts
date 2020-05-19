import { LoggerUtil, LogType } from '../';
import { expect } from 'chai';

describe('LoggerUtil', () => {
  it('Creates a class', () => {
    expect(LoggerUtil).to.be.a('function');
  });

  it('Creates a Chalk instance', () => {
    expect(LoggerUtil.logger).to.be.a('function').that.has.property('Instance');
  });

  it('Maps colors to log types', () => {
    expect(LoggerUtil.colors).to.be.an('object').and.to.have.all.keys({
      log: 'white',
      debug: 'blueBright',
      warn: 'yellow',
      error: 'red',
      success: 'green',
    });
  });

  it('Has methods: log, debug, warn, error, success', () => {
    expect(LoggerUtil.log).to.be.a('function');
    expect(LoggerUtil.debug).to.be.a('function');
    expect(LoggerUtil.warn).to.be.a('function');
    expect(LoggerUtil.error).to.be.a('function');
    expect(LoggerUtil.success).to.be.a('function');
  });
});
