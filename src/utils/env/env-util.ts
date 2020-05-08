import dotenv from 'dotenv';

/**
 * Returns an env object
 *
 * Basic usage example:
 *
 * ```ts
 * import { EnvUtil } from '@utils/env';
 *
 * const node_env = EnvUtil.get('NODE_ENV);
 *
 * console.log(node_env);
 * ```
 */

const EnvUtil = new (class {
  private env: any;

  constructor() {
    this.set();
  }

  private set() {
    const config = dotenv.config();

    if (config.error) {
      throw config.error;
    }

    try {
      this.env = config.parsed;
    } catch (error) {
      console.error(error);
    }
  }

  public get(key: string): string {
    try {
      const has = Object.prototype.hasOwnProperty;

      if (has.call(this.env, key)) {
        return this.env[key];
      }

      throw `No env key "${key}"`;
    } catch (error) {
      console.error(error);
    }
  }
})();

export { EnvUtil };
