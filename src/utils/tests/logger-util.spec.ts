import { Logger } from '../';
import { expect } from 'chai';

const logger = new Logger('test');

describe('LoggerUtil', () => {
  it('Creates a class', () => {
    expect(logger).to.be.an('object');
    expect(logger.caller).to.equal('test');
  });

  it('Creates a Chalk instance', () => {
    expect(logger.chalk).to.be.a('function').that.has.property('Instance');
  });

  it('Maps colors to log types', () => {
    expect(logger.colorMap).to.be.an('object').and.to.have.all.keys({
      log: 'white',
      debug: 'blueBright',
      warn: 'yellow',
      error: 'red',
      success: 'green',
    });
  });

  it('Has methods: log, debug, warn, error, success', () => {
    expect(logger.log).to.be.a('function');
    expect(logger.debug).to.be.a('function');
    expect(logger.warn).to.be.a('function');
    expect(logger.error).to.be.a('function');
    expect(logger.success).to.be.a('function');
  });
});
