import dotenv from 'dotenv';
import { Logger } from './logger-util';
/**
 * Utility for working with a .env file

 * ```ts
 * import { Env } from '@utils';
 * 
 * const nodeEnv = Env.get('NODE_ENV')
 * console.log(nodeEnv); // 'development'
 * ```
 */

const logger = new Logger('env');
export class Env {
  /** used to store dontenv.config() */
  public static config: any = dotenv.config();

  /**
   * @param key  Name of .env key.
   * @returns Value of .env key.
   */
  public static get(key: string): string {
    const envFile: any = this.getFile();
    const has = Object.prototype.hasOwnProperty;

    if (has.call(envFile, key)) {
      return envFile[key];
    }

    console.error(`No env key "${key}"`);
  }

  /**
   * @returns env file as a javascript object.
   */
  private static getFile(): object {
    this.config = dotenv.config();

    try {
      return this.config.parsed;
    } catch {
      logger.error(this.config.error);
    }
  }
}
