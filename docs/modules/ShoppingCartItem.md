[@sreed17/shoppingcart](../README.md) / [Exports](../modules.md) / ShoppingCartItem

# Module: ShoppingCartItem

## Table of contents

### Classes

- [ShoppingCartItem](../classes/ShoppingCartItem.ShoppingCartItem.md)

### Type Aliases

- [ICartItemParameters](ShoppingCartItem.md#icartitemparameters)
- [IOptionalParameters](ShoppingCartItem.md#ioptionalparameters)
- [IRequiredParameters](ShoppingCartItem.md#irequiredparameters)

### Functions

- [isShoppingCartItem](ShoppingCartItem.md#isshoppingcartitem)

## Type Aliases

### ICartItemParameters

Ƭ **ICartItemParameters**\<`ProductType`\>: [`IRequiredParameters`](ShoppingCartItem.md#irequiredparameters)\<`ProductType`\> & [`IOptionalParameters`](ShoppingCartItem.md#ioptionalparameters)

Represents the parameters for creating a shopping cart item.

#### Type parameters

| Name |
| :------ |
| `ProductType` |

#### Defined in

[ShoppingCartItem.ts:56](https://github.com/sreed17/shoppingcart/blob/bea1116/src/ShoppingCartItem.ts#L56)

___

### IOptionalParameters

Ƭ **IOptionalParameters**: `Object`

Represents the optional parameters for creating a shopping cart item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantity?` | `number` | The quantity of the product. Default: 1 |
| `total_discount?` | `number` | The discount applied to the total price of the product. Default: 0 |
| `unit_discount?` | `number` | The discount applied to each unit of the product. Default: 0 |

#### Defined in

[ShoppingCartItem.ts:35](https://github.com/sreed17/shoppingcart/blob/bea1116/src/ShoppingCartItem.ts#L35)

___

### IRequiredParameters

Ƭ **IRequiredParameters**\<`ProductType`\>: `Object`

Represents the required parameters for creating a shopping cart item.

#### Type parameters

| Name |
| :------ |
| `ProductType` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The unique identifier for the product. Used for hashing |
| `index` | `number` | Index (position) of the item in the shopping cart. |
| `product` | `ProductType` | The product details. |
| `unit_price` | `number` | The price per unit of the product. |

#### Defined in

[ShoppingCartItem.ts:12](https://github.com/sreed17/shoppingcart/blob/bea1116/src/ShoppingCartItem.ts#L12)

## Functions

### isShoppingCartItem

▸ **isShoppingCartItem**\<`T`\>(`arg`): arg is ShoppingCartItem\<T\>

Check whether a given argument is an instance of ShoppingCartItem.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `unknown` | The argument to check. |

#### Returns

arg is ShoppingCartItem\<T\>

A boolean indicating whether the argument is an instance of ShoppingCartItem.

#### Defined in

[ShoppingCartItem.ts:369](https://github.com/sreed17/shoppingcart/blob/bea1116/src/ShoppingCartItem.ts#L369)
