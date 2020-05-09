import dotenv from 'dotenv';

/**
 * Returns an env object
 *
 * Basic usage example:
 *
 * ```ts
 * import { EnvUtil } from '@utils/env';
 *
 * const node_env = EnvUtil.get('NODE_ENV');
 *
 * console.log(node_env);
 * ```
 */

namespace EnvUtil {
  const config = dotenv.config();

  if (config.error) {
    throw config.error;
  }

  const env = config.parsed;

  export function get(key: string): string {
    try {
      const has = Object.prototype.hasOwnProperty;

      if (has.call(env, key)) {
        return env[key];
      }

      throw `No env key "${key}"`;
    } catch (error) {
      throw error;
    }
  }
}

export { EnvUtil };
