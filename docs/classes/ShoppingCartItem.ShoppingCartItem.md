[shoppingcart](../README.md) / [Exports](../modules.md) / [ShoppingCartItem](../modules/ShoppingCartItem.md) / ShoppingCartItem

# Class: ShoppingCartItem\<ProductType\>

[ShoppingCartItem](../modules/ShoppingCartItem.md).ShoppingCartItem

Represents a single item in the shopping cart.
Manages the item's details such as product, quantity, unit price, and discounts.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ProductType` | extends `object` |

## Table of contents

### Constructors

- [constructor](ShoppingCartItem.ShoppingCartItem.md#constructor)

### Methods

- [clone](ShoppingCartItem.ShoppingCartItem.md#clone)
- [decrementQuantity](ShoppingCartItem.ShoppingCartItem.md#decrementquantity)
- [incrementQuantity](ShoppingCartItem.ShoppingCartItem.md#incrementquantity)
- [setIndex](ShoppingCartItem.ShoppingCartItem.md#setindex)
- [setTotalDiscount](ShoppingCartItem.ShoppingCartItem.md#settotaldiscount)
- [toJSON](ShoppingCartItem.ShoppingCartItem.md#tojson)
- [toString](ShoppingCartItem.ShoppingCartItem.md#tostring)
- [valueOf](ShoppingCartItem.ShoppingCartItem.md#valueof)

## Constructors

### constructor

• **new ShoppingCartItem**\<`ProductType`\>(`args`, `onChange?`): [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

Constructs a new instance of ShoppingClassItem.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ProductType` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | [`ICartItemParameters`](../modules/ShoppingCartItem.md#icartitemparameters)\<`ProductType`\> | The parameters used to initialize the shopping cart item. |
| `onChange?` | `IOnChangeCallback`\<[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>\> | - |

#### Returns

[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

#### Defined in

[ShoppingCartItem.ts:300](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L300)

## Methods

### clone

▸ **clone**(): [`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

Clones the current shopping cart item.

#### Returns

[`ShoppingCartItem`](ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>

A new instance of ShoppingClassItem with the same parameters as the current item.

#### Defined in

[ShoppingCartItem.ts:166](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L166)

___

### decrementQuantity

▸ **decrementQuantity**(`decrement_size?`): `void`

Decrements the quantity of the item by the specified amount.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `decrement_size` | `number` | `1` | The amount by which to decrement the quantity. |

#### Returns

`void`

#### Defined in

[ShoppingCartItem.ts:202](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L202)

___

### incrementQuantity

▸ **incrementQuantity**(`increment_size?`): `void`

Increments the quantity of the item by the specified amount.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `increment_size` | `number` | `1` | The amount by which to increment the quantity. |

#### Returns

`void`

#### Defined in

[ShoppingCartItem.ts:185](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L185)

___

### setIndex

▸ **setIndex**(`new_index`): `void`

Change the index(position) of the item in the shopping cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `new_index` | `number` | The new index of the item in the shopping cart. |

#### Returns

`void`

#### Defined in

[ShoppingCartItem.ts:232](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L232)

___

### setTotalDiscount

▸ **setTotalDiscount**(`total_discount`): `void`

Sets the total discount applied to the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `total_discount` | `number` | The total discount to apply. |

#### Returns

`void`

#### Defined in

[ShoppingCartItem.ts:220](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L220)

___

### toJSON

▸ **toJSON**(): `ICartItemJSON`\<`ProductType`\>

Returns the JSON representation, the ShoppingCartItem as an object consisting of all its public properties.

#### Returns

`ICartItemJSON`\<`ProductType`\>

An object representing the ShoppingCartItem with its public properties.

#### Defined in

[ShoppingCartItem.ts:150](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L150)

___

### toString

▸ **toString**(): `string`

Returns the serialized version of the instance as a JSON string.

#### Returns

`string`

A JSON string representing the serialized version of the instance.

#### Defined in

[ShoppingCartItem.ts:158](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L158)

___

### valueOf

▸ **valueOf**(): `ICartItemJSON`\<`ProductType`\>

Returns the ShoppingCartItem as an object consisting of all its public properties.

#### Returns

`ICartItemJSON`\<`ProductType`\>

An object representing the ShoppingCartItem with its public properties.

#### Defined in

[ShoppingCartItem.ts:134](https://github.com/sreed17/shoppingcart/blob/e9bd6d4/src/ShoppingCartItem.ts#L134)
