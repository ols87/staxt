[staxt](../README.md) › [Globals](../globals.md) › ["utils/src/timer.util"](../modules/_utils_src_timer_util_.md) › [TimerUtil](_utils_src_timer_util_.timerutil.md)

# Class: TimerUtil

**Utility for timing operations.**

Example Usage:
```ts
import { TimerUtil } from '@utils';

const time = new TimerUtil('test');

time.start();
timer.end();
```

## Hierarchy

* **TimerUtil**

## Index

### Constructors

* [constructor](_utils_src_timer_util_.timerutil.md#constructor)

### Properties

* [caller](_utils_src_timer_util_.timerutil.md#caller)
* [endTime](_utils_src_timer_util_.timerutil.md#endtime)
* [startTime](_utils_src_timer_util_.timerutil.md#starttime)

### Methods

* [end](_utils_src_timer_util_.timerutil.md#end)
* [start](_utils_src_timer_util_.timerutil.md#start)

## Constructors

###  constructor

\+ **new TimerUtil**(`caller`: string): *[TimerUtil](_utils_src_timer_util_.timerutil.md)*

*Defined in [utils/src/timer.util.ts:31](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L31)*

Checks if caller exists in the timerStack.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`caller` | string | Unique name of calling file/reference.  |

**Returns:** *[TimerUtil](_utils_src_timer_util_.timerutil.md)*

## Properties

###  caller

• **caller**: *string*

*Defined in [utils/src/timer.util.ts:37](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L37)*

Unique name of calling file/reference.

___

###  endTime

• **endTime**: *number*

*Defined in [utils/src/timer.util.ts:31](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L31)*

Stores the time when a timer end.

___

###  startTime

• **startTime**: *number*

*Defined in [utils/src/timer.util.ts:26](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L26)*

Stores the time when a timer starts.

## Methods

###  end

▸ **end**(): *number*

*Defined in [utils/src/timer.util.ts:59](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L59)*

Ends a timer.

**Returns:** *number*

Time as a number of seconds e,g 0.1;

___

###  start

▸ **start**(): *number*

*Defined in [utils/src/timer.util.ts:51](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/timer.util.ts#L51)*

Starts a timer.

**Returns:** *number*

Timestamp when called.
