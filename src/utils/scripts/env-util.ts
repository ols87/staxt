/**
 * Utility for working with .env file
 *
 * Usage:
 * ```ts
 * import { envUtil } from '@utils';
 *
 * const nodeEnv envUtil('NODE_ENV')
 *
 * console.log(nodeEnv); // development
 * ```
 */

import dotenv from 'dotenv';

function getEnv(): any {
  const config: any = dotenv.config();

  if (config.error) {
    return throw config.error;
  }
 
  return config.parsed;
}


/**
 * @param key  Name of .env key.
 * @returns Value of .env key.
 */
export function envUtil(key: string): string {
  const envFile: any = getEnv();
  const has = Object.prototype.hasOwnProperty;

  if (has.call(envFile, key)) {
    return envFile[key];
  }

  console.error(`No env key "${key}"`);
}
