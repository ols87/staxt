[staxt](../README.md) › [Globals](../globals.md) › ["utils/src/logger.util"](../modules/_utils_src_logger_util_.md) › [LoggerUtil](_utils_src_logger_util_.loggerutil.md)

# Class: LoggerUtil

**Utility for logging to console.**

Example Usage:
```ts
import { LoggerUtil } from '@utils';
const logger = new LoggerUtil('test');
//or

logger.log('log message'); // [TEST-LOG]: log message
logger.debug('debug message'); // [TEST-DEBUG]: debug message
logger.warn('warn message'); // [TEST-WARN]: warn message
logger.error('error message'); // [TEST-ERROR]: error message
logger.success('success message'); // [TEST-SUCCESS]: success message

logger.write({
  message: 'foo bar',
  type: 'log',
  color: 'cyan',
});

logger.add({
  type: 'foo',
  color: 'magenta',
});

logger.foo('foo message') // [TEST-FOO]: foo message
```

## Hierarchy

* **LoggerUtil**

## Index

### Constructors

* [constructor](_utils_src_logger_util_.loggerutil.md#constructor)

### Properties

* [caller](_utils_src_logger_util_.loggerutil.md#caller)
* [chalk](_utils_src_logger_util_.loggerutil.md#readonly-chalk)

### Methods

* [add](_utils_src_logger_util_.loggerutil.md#add)
* [debug](_utils_src_logger_util_.loggerutil.md#debug)
* [error](_utils_src_logger_util_.loggerutil.md#error)
* [log](_utils_src_logger_util_.loggerutil.md#log)
* [success](_utils_src_logger_util_.loggerutil.md#success)
* [warn](_utils_src_logger_util_.loggerutil.md#warn)
* [write](_utils_src_logger_util_.loggerutil.md#write)

### Object literals

* [colorMap](_utils_src_logger_util_.loggerutil.md#colormap)

## Constructors

###  constructor

\+ **new LoggerUtil**(`caller`: string): *[LoggerUtil](_utils_src_logger_util_.loggerutil.md)*

*Defined in [utils/src/logger.util.ts:95](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L95)*

Checks if caller exists in the loggerStack.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`caller` | string | Unique name of calling file/reference.  |

**Returns:** *[LoggerUtil](_utils_src_logger_util_.loggerutil.md)*

## Properties

###  caller

• **caller**: *string*

*Defined in [utils/src/logger.util.ts:101](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L101)*

Unique name of calling file/reference.

___

### `Readonly` chalk

• **chalk**: *any* = new chalk.Instance({
    level: 1,
  })

*Defined in [utils/src/logger.util.ts:82](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L82)*

Creates a new [Chalk](https://www.npmjs.com/package/chalk) instance.

## Methods

###  add

▸ **add**(`options`: [LoggerOptions](../interfaces/_utils_src_logger_util_.loggeroptions.md)): *void*

*Defined in [utils/src/logger.util.ts:164](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L164)*

Adds a new log method and [colorMap](_utils_src_logger_util_.loggerutil.md#colormap)

**Parameters:**

Name | Type |
------ | ------ |
`options` | [LoggerOptions](../interfaces/_utils_src_logger_util_.loggeroptions.md) |

**Returns:** *void*

___

###  debug

▸ **debug**(`message`: any): *void*

*Defined in [utils/src/logger.util.ts:117](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *void*

___

###  error

▸ **error**(`message`: any): *void*

*Defined in [utils/src/logger.util.ts:129](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *void*

___

###  log

▸ **log**(`message`: any): *void*

*Defined in [utils/src/logger.util.ts:111](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *void*

___

###  success

▸ **success**(`message`: any): *void*

*Defined in [utils/src/logger.util.ts:135](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *void*

___

###  warn

▸ **warn**(`message`: any): *void*

*Defined in [utils/src/logger.util.ts:123](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *void*

___

###  write

▸ **write**(`message`: string, `options`: [LoggerOptions](../interfaces/_utils_src_logger_util_.loggeroptions.md)): *void*

*Defined in [utils/src/logger.util.ts:145](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L145)*

Writes a message to the console

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | - |
`options` | [LoggerOptions](../interfaces/_utils_src_logger_util_.loggeroptions.md) | {} |

**Returns:** *void*

## Object literals

###  colorMap

### ▪ **colorMap**: *object*

*Defined in [utils/src/logger.util.ts:89](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L89)*

Maps method names to Chalk colorMap.

###  debug

• **debug**: *"blueBright"* = "blueBright"

*Defined in [utils/src/logger.util.ts:91](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L91)*

###  error

• **error**: *"red"* = "red"

*Defined in [utils/src/logger.util.ts:93](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L93)*

###  log

• **log**: *"white"* = "white"

*Defined in [utils/src/logger.util.ts:90](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L90)*

###  success

• **success**: *"green"* = "green"

*Defined in [utils/src/logger.util.ts:94](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L94)*

###  warn

• **warn**: *"yellow"* = "yellow"

*Defined in [utils/src/logger.util.ts:92](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/logger.util.ts#L92)*
