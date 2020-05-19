import { LoggerUtil } from '../';

export class StateUtil {
  private static state: any = {
    foo: {
      bar: {
        fizz: 1,
      },
    },
  };

  public static get({ keyMap, keyType }: any): any {
    let keyList = [];

    try {
      keyList = keyMap.split('.');
    } catch {
      return LoggerUtil.error(`keymap must be a string e.g 'foo.bar' ${keyMap}`);
    }

    let stateKey = this.state;
    let currentKey: string = '';
    let keyIndex: number = 0;
    let keyLength: number = keyList.length;

    for (keyIndex; keyIndex < keyLength; keyIndex++) {
      const key = keyList[keyIndex];
      currentKey += `${key}.`;
      const accessKey = currentKey.substring(0, currentKey.length - 1);
      const has = Object.prototype.hasOwnProperty;

      if (has.call(stateKey, key)) {
        stateKey = stateKey[key];
      } else {
        LoggerUtil.error(`${accessKey} does not exist`);
        break;
      }
    }

    if (typeof keyMap == keyType) {
      LoggerUtil.warn(`${keyMap} is not typeof ${keyType}.`);
      LoggerUtil.debug(`typeof ${keyMap} is '${typeof keyMap}'.`);
    }

    return stateKey;
  }

  public static set(key: string): any {}
}
