import dotenv from 'dotenv';
import { LoggerUtil } from '../';
/**
 * Utility for working with a .env file

 * ```ts
 * import { EnvUtil } from '@utils';
 * ```
 */
export class EnvUtil {
  /** used to store dontenv.config() */
  public static config: any = dotenv.config();

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
    const envFile: any = this.getFile();
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
   * const envFile: any = this.getFile();
   * console.log(envFile); // { NODE_ENV: 'development', ...}
   * ```
   */
  private static getFile(): object {
    this.config = dotenv.config();

    try {
      return this.config.parsed;
    } catch {
      LoggerUtil.error(this.config.error);
    }
  }
}
