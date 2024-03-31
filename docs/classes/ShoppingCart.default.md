[shoppingcart](../README.md) / [Exports](../modules.md) / [ShoppingCart](../modules/ShoppingCart.md) / default

# Class: default\<ProductType\>

[ShoppingCart](../modules/ShoppingCart.md).default

Represents a shopping cart that can hold items of a specific product type.

**`Typeparam`**

T The type of product items that the shopping cart can hold.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ProductType` | extends `object` |

## Table of contents

### Constructors

- [constructor](ShoppingCart.default.md#constructor)

### Accessors

- [item\_count](ShoppingCart.default.md#item_count)
- [sub\_total](ShoppingCart.default.md#sub_total)

### Methods

- [[iterator]](ShoppingCart.default.md#[iterator])
- [addItem](ShoppingCart.default.md#additem)
- [checkout](ShoppingCart.default.md#checkout)
- [clone](ShoppingCart.default.md#clone)
- [filter](ShoppingCart.default.md#filter)
- [getCartItem](ShoppingCart.default.md#getcartitem)
- [map](ShoppingCart.default.md#map)
- [moveItem](ShoppingCart.default.md#moveitem)
- [removeItem](ShoppingCart.default.md#removeitem)
- [sort](ShoppingCart.default.md#sort)
- [toJSON](ShoppingCart.default.md#tojson)
- [toString](ShoppingCart.default.md#tostring)
- [valueOf](ShoppingCart.default.md#valueof)

## Constructors

### constructor

• **new default**\<`ProductType`\>(`args`): [`default`](ShoppingCart.default.md)\<`ProductType`\>

Creates a new instance of the ShoppingCart class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ProductType` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | [`ICartParameters`](../modules/ShoppingCart.md#icartparameters)\<`ProductType`\> | The parameters to initialize the shopping cart. |

#### Returns

[`default`](ShoppingCart.default.md)\<`ProductType`\>

#### Defined in

[ShoppingCart.ts:384](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L384)

## Accessors

### item\_count

• `get` **item_count**(): `number`

Return the number of items in the the cart.

#### Returns

`number`

#### Defined in

[ShoppingCart.ts:192](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L192)

___

### sub\_total

• `get` **sub_total**(): `number`

Return the subtotal of the items in the cart.

#### Returns

`number`

#### Defined in

[ShoppingCart.ts:199](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L199)

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`\<[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>, `void`, `unknown`\>

Returns an iterator for iterating over all items in the shopping cart.

#### Returns

`Generator`\<[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>, `void`, `unknown`\>

An iterator that yields each ShoppingCartItem in the shopping cart.

#### Defined in

[ShoppingCart.ts:234](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L234)

___

### addItem

▸ **addItem**(`arg`): `void`

Adds a new item to the shopping cart or updates the quantity of an existing item if the ID matches.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ICartItemCreateParameters`](../modules/ShoppingCart.md#icartitemcreateparameters)\<`ProductType`\> | The parameters for the new item to add or update. |

#### Returns

`void`

#### Defined in

[ShoppingCart.ts:291](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L291)

___

### checkout

▸ **checkout**(): `void`

Initiates the checkout process by calling the onCheckout callback function, if provided.

#### Returns

`void`

**`Throws`**

Error if the onCheckout function is not provided.

#### Defined in

[ShoppingCart.ts:371](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L371)

___

### clone

▸ **clone**(): [`default`](ShoppingCart.default.md)\<`ProductType`\>

Creates and returns a deep copy of the shopping cart.

#### Returns

[`default`](ShoppingCart.default.md)\<`ProductType`\>

A new instance of ShoppingCart with identical items, onChange, and onCheckout properties.

#### Defined in

[ShoppingCart.ts:268](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L268)

___

### filter

▸ **filter**(`fn`): `void`

Filters the items in the shopping cart based on the provided function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`cart_item`: [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>) => `boolean` | A function used to filter the items in the shopping cart. |

#### Returns

`void`

#### Defined in

[ShoppingCart.ts:342](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L342)

___

### getCartItem

▸ **getCartItem**(`key`): [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

Retrieves a ShoppingCartItem from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` \| `number` | The key (ID or index) used to retrieve the ShoppingCartItem. |

#### Returns

[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

The ShoppingCartItem corresponding to the specified key.

**`Throws`**

Error if the key is not found or if the index is out of bounds.

#### Defined in

[ShoppingCart.ts:209](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L209)

___

### map

▸ **map**(`fn`): `unknown`[]

Maps each item in the shopping cart to another value using a mapping function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`value`: `ICartItemJSON`\<`ProductType`\>, `index`: `number`) => `unknown` | A mapping function that transforms each item's JSON representation. |

#### Returns

`unknown`[]

An array of transformed values.

#### Defined in

[ShoppingCart.ts:281](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L281)

___

### moveItem

▸ **moveItem**(`identifier`, `new_index`): `void`

Move the item identified by the identifier to be moved to a new index within the shopping cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` \| `number` | Either the index of the item or its ID. |
| `new_index` | `number` | Index to which the item is to be moved. |

#### Returns

`void`

#### Defined in

[ShoppingCart.ts:156](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L156)

___

### removeItem

▸ **removeItem**(`arg`, `quantity?`): `void`

Removes an item from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `string` \| `number` | The key (ID or index) used to identify the item to remove. |
| `quantity?` | `number` | - |

#### Returns

`void`

#### Defined in

[ShoppingCart.ts:313](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L313)

___

### sort

▸ **sort**(`fn`): `void`

Sorts the items in the shopping cart based on the provided comparison function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`cart_item_A`: [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>, `cart_item_B`: [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>) => `number` | A function used to compare two items in the shopping cart for sorting. |

#### Returns

`void`

#### Defined in

[ShoppingCart.ts:354](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L354)

___

### toJSON

▸ **toJSON**(): `ICartItemJSON`\<`ProductType`\>[]

Returns the corresponding JSON object of the shopping cart.

#### Returns

`ICartItemJSON`\<`ProductType`\>[]

An array of objects representing each ShoppingCartItem in the shopping cart.

#### Defined in

[ShoppingCart.ts:252](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L252)

___

### toString

▸ **toString**(): `string`

Returns a JSON string representing the value of the shopping cart.

#### Returns

`string`

A JSON string representing the value of the shopping cart.

#### Defined in

[ShoppingCart.ts:260](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L260)

___

### valueOf

▸ **valueOf**(): `ICartItemJSON`\<`ProductType`\>[]

Returns the value of the shopping cart as an array of objects, each representing a ShoppingCartItem.

#### Returns

`ICartItemJSON`\<`ProductType`\>[]

An array of objects representing each ShoppingCartItem in the shopping cart.

#### Defined in

[ShoppingCart.ts:244](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCart.ts#L244)
