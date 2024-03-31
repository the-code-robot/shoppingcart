[@sreed17/shoppingcart](../README.md) / [Exports](../modules.md) / ShoppingCart

# Module: ShoppingCart

## Table of contents

### Classes

- [default](../classes/ShoppingCart.default.md)

### Type Aliases

- [ICartItemCreateParameters](ShoppingCart.md#icartitemcreateparameters)
- [ICartParameters](ShoppingCart.md#icartparameters)

## Type Aliases

### ICartItemCreateParameters

Ƭ **ICartItemCreateParameters**\<`T`\>: `Omit`\<[`ICartItemParameters`](ShoppingCartItem.md#icartitemparameters)\<`T`\>, ``"index"``\>

Represents the parameters required to create a shopping cart item.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[ShoppingCart.ts:17](https://github.com/sreed17/shoppingcart/blob/d2f4a4c/src/ShoppingCart.ts#L17)

___

### ICartParameters

Ƭ **ICartParameters**\<`ProductType`\>: `Object`

Represents the parameters required to initialize a shopping cart.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ProductType` | extends `object` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items?` | [`ShoppingCartItem`](../classes/ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>[] | The initial items in the shopping cart. |
| `onChange?` | `IOnChangeCallback`\<[`default`](../classes/ShoppingCart.default.md)\<`ProductType`\> \| [`ShoppingCartItem`](../classes/ShoppingCartItem.ShoppingCartItem.md)\<`ProductType`\>\> | The callback function to be called when the shopping cart changes. |
| `onCheckout?` | `IOnChangeCallback`\<[`default`](../classes/ShoppingCart.default.md)\<`ProductType`\>\> | The callback function to be called when the checkout process is triggered. |

#### Defined in

[ShoppingCart.ts:25](https://github.com/sreed17/shoppingcart/blob/d2f4a4c/src/ShoppingCart.ts#L25)
