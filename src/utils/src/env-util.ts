import dotenv from 'dotenv';

/**
 * Utility for working with a .env file

 * ```ts
 * import { EnvUtil } from '@utils';
 * ```
 */
export class EnvUtil {
  /** used to store dontenv.config() */
  private static config: any;

  /**
   * @param key  Name of .env key.
   * @returns Value of .env key.
   *
   * ```ts
   * const nodeEnv = EnvUtil.get('NODE_ENV')
   * console.log(nodeEnv); // 'development'
   * ```
   */
  public static get(key: string): string {
    const envFile: any = this.getEnv();
    const has = Object.prototype.hasOwnProperty;

    if (has.call(envFile, key)) {
      return envFile[key];
    }

    console.error(`No env key "${key}"`);
  }

  /**
   * @returns env file as a javascript object.
   *
   * ```ts
   * const envFile: any = this.getEnv();
   * console.log(envFile); // { NODE_ENV: 'development', ...}
   * ```
   */
  private static getEnv(): object {
    this.config = dotenv.config();

    if (this.config.error) {
      throw this.config.error;
    }

    return this.config.parsed;
  }
}
