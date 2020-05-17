import dotenv from 'dotenv';

/**
 * Utility for working with .env file
 *
 * Usage:
 * ```ts
 * import { EnvUtil } from '@utils/env-util';
 * ```
 */

namespace EnvUtil {
  const config = dotenv.config();

  if (config.error) {
    throw config.error;
  }

  const env = config.parsed;

  /**
   * @param key  Name of .env key.
   * @returns Value of .env key.
   */
  export function get(key: string): string {
    const has = Object.prototype.hasOwnProperty;

    if (has.call(env, key)) {
      return env[key];
    }

    console.error(`No env key "${key}"`);
  }
}

export { EnvUtil };
