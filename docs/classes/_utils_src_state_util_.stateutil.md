[staxt](../README.md) › [Globals](../globals.md) › ["utils/src/state.util"](../modules/_utils_src_state_util_.md) › [StateUtil](_utils_src_state_util_.stateutil.md)

# Class: StateUtil

**Utility for managing state.**

Example Usage:
```ts
import { StateUtil } from '@utils';

StateUtil.add('foo', { value: 'bar', type: 'string' });
StateUtil.edit('foo', { value: 1, type: 'number' });
StateUtil.get('foo'); // returns 1
StateUtil.remove('foo');
StateUtil.clear();
```

## Hierarchy

* **StateUtil**

## Index

### Properties

* [state](_utils_src_state_util_.stateutil.md#static-private-state)

### Methods

* [add](_utils_src_state_util_.stateutil.md#static-add)
* [clear](_utils_src_state_util_.stateutil.md#static-clear)
* [edit](_utils_src_state_util_.stateutil.md#static-edit)
* [get](_utils_src_state_util_.stateutil.md#static-get)
* [remove](_utils_src_state_util_.stateutil.md#static-remove)
* [requestItem](_utils_src_state_util_.stateutil.md#static-requestitem)
* [validateType](_utils_src_state_util_.stateutil.md#static-validatetype)
* [writeItem](_utils_src_state_util_.stateutil.md#static-writeitem)

## Properties

### `Static` `Private` state

▪ **state**: *any*

*Defined in [utils/src/state.util.ts:64](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L64)*

Object for storing state.

## Methods

### `Static` add

▸ **add**(`key`: string, `options`: [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:69](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L69)*

Add a new state value if none exists.

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`options` | [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) |

**Returns:** *any*

___

### `Static` clear

▸ **clear**(): *object*

*Defined in [utils/src/state.util.ts:174](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L174)*

Clear the state.

**Returns:** *object*

___

### `Static` edit

▸ **edit**(`key`: string, `options`: [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:115](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L115)*

Edit a state value if it exists.

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`options` | [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) |

**Returns:** *any*

___

### `Static` get

▸ **get**(`key`: string, `options`: [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:93](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L93)*

Get a state value if exists.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`key` | string | - |
`options` | [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) | {} |

**Returns:** *any*

___

### `Static` remove

▸ **remove**(`key`: string, `options`: [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:152](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L152)*

Remove a state value if exists.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`key` | string | - |
`options` | [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) | {} |

**Returns:** *any*

___

### `Static` requestItem

▸ **requestItem**(`key`: string, `options`: [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:182](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L182)*

Request a value by key.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`key` | string | - |
`options` | [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) | {} |

**Returns:** *any*

___

### `Static` validateType

▸ **validateType**(`action`: string, `options`: [StateItem](../interfaces/_utils_src_state_util_.stateitem.md) & [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *void*

*Defined in [utils/src/state.util.ts:228](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L228)*

Checks that the requested value has the same type as provided in the arguement.

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`options` | [StateItem](../interfaces/_utils_src_state_util_.stateitem.md) & [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) |

**Returns:** *void*

___

### `Static` writeItem

▸ **writeItem**(`options`: [StateItem](../interfaces/_utils_src_state_util_.stateitem.md) & [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md)): *any*

*Defined in [utils/src/state.util.ts:204](https://github.com/ols87/staxt/blob/f2f2022/src/utils/src/state.util.ts#L204)*

Write a value to the matching key.

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateItem](../interfaces/_utils_src_state_util_.stateitem.md) & [StateOptions](../interfaces/_utils_src_state_util_.stateoptions.md) |

**Returns:** *any*
