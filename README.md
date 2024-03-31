<h1 align="center">@sreed17/shoppingcart</h1>
<hr/>

<p align="center">Effortlessly integrate a fully customizable shopping cart into your React applications with React Shopping Cart—type-safe, flexible, and ready to streamline your e-commerce development workflow!</p>

The `@sreed17/shoppingcart` library empowers developers to effortlessly integrate a shopping cart functionality into their React applications with utmost flexibility and type safety. You can **_generate a fully functional shopping cart context, provider, and hook tailored to your product types_**.

## Features

### 1. Universal Cart Generation

Easily create a shopping cart for any product type by providing a generic type parameter. The library dynamically generates a shopping cart context, provider, and hook specific to your product type, ensuring seamless integration and type safety.

### 2. Intuitive Context Usage

Access the shopping cart state anywhere in your React application using the created use hook. Retrieve essential cart information, such as item count and subtotal, with ease, enabling smooth rendering of shopping cart components.

### 3. Type-Safe Modifications

Interact with the shopping cart state in a type-safe manner. Utilize the provided class instance as the context, allowing for straightforward and type-checked modifications to the cart, ensuring data integrity and reliable application behavior.

## Installation

You can install shoppingcart using npm or yarn:

```bash
npm install @sreed17/shoppingcart
# or
yarn add @sreed17/shoppingcart
```

## Usage

To integrate `shoppingcart` into your React application, follow these steps:

### 1. Installation

First, install the `shoppingcart` package via npm or yarn:

```bash
npm install @sreed17/shoppingcart
```

or

```bash
yarn add @sreed17/shoppingcart
```

### 2. Usage

#### 1. Create the ShoppingCartProvider context provider and useShoppingCart hook from your product type.

```ts
/**
 * @file MyShoppingCart.tsx
 * @description Shopping cart tailored for your product type
 */

// import shoppingCart function (default) from shoppingcart
import shoppingCart from "@sreed17/shoppingcart";

// Define your product type
interface MyProductType {
	// definition of your product type
}

// Generate the provider and hook for your product type
export const { ShoppingCartProvider, useShoppingCart } =
	shoppingCart<MyProductType>();

// Your are now ready to use the the shopping cart tailored for your product type!
```

#### 2. Using the ShoppingCartProvider.

Wrap ShoppingCartProvider around components that need t access the cart.

```ts
import {ShoppingCartProvider} from "./MyShoppingCart"
// rest of the code...
return<>
<ShoppingCartProvider>
 // child-components
</ShoppingCartProvider>
```

You can add `onCheckout` attribute to set a handler for when checkout method is triggered from the children.

#### 3. Using the useShoppingCart hook.

It provides can instance of ShoppingCart class named `cart` and an `is_loading` flag.
Read the [documentation](https://github.com/sreed17/shoppingcart/blob/master/docs/classes/ShoppingCart.default.md) to see all the available methods available in the cart;

```ts
/**
 * @file Child-component.tsx
 * @description A child component that uses the shopping cart context.
 */

// ...other imports
import {useShoppingCart} from "./MyShoppingCart";

// other definitions

const ChildComponent:FC<PropType> = ({/* Props */})=>{

/**
 * cart: instance of the shopping cart class, can take null value hence needs null check.
 * is_loading: whether the context is loaded on component mount
 */
const {cart, is_loading} = useShoppingCart();

// null check cart and use the is_loading flag to stabilize rendering

return <div>
<div>Item count: {cart.item_count}<div>

{/** Render the cart items */}
<ul>
{
cart.map((cartItem)=>{
  const {id, aggregate_price, quantity} = cartItem;
  return <li key={id}>
 <span>{id}</span>
 <span>{aggregate_price}</span>
 <span>{quantity}</span>
  </li>
})
}
</ul>

</div>
}
```

### Methods

#### ShoppingCart

| Method/Accessor                   | Description                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `item_count`                      | Returns the number of items in the shopping cart.                                                      |
| `sub_total`                       | Returns the subtotal of all items in the shopping cart.                                                |
| `getCartItem(key)`                | Retrieves a `ShoppingCartItem` from the shopping cart based on the specified key (ID or index).        |
| `moveItem(identifier, new_index)` | Moves the item identified by the identifier to a new index within the shopping cart.                   |
| `valueOf()`                       | Returns the value of the shopping cart as an array of objects, each representing a `ShoppingCartItem`. |
| `toJSON()`                        | Returns the corresponding JSON object of the shopping cart.                                            |
| `toString()`                      | Returns a JSON string representing the value of the shopping cart.                                     |
| `clone()`                         | Creates and returns a deep copy of the shopping cart.                                                  |
| `map(fn)`                         | Maps each item in the shopping cart to another value using a mapping function.                         |
| `addItem(arg)`                    | Adds a new item to the shopping cart or updates the quantity of an existing item if the ID matches.    |
| `removeItem(arg, quantity?)`      | Removes an item from the shopping cart based on the specified key (ID or index).                       |
| `filter(fn)`                      | Filters the items in the shopping cart based on the provided function.                                 |
| `sort(fn)`                        | Sorts the items in the shopping cart based on the provided comparison function.                        |
| `checkout()`                      | Initiates the checkout process by calling the `onCheckout` callback function, if provided.             |
| `*[Symbol.iterator]()`            | Returns an iterator for iterating over all items in the shopping cart.                                 |

#### ShoppingCartItem

| Method/Accessor              | Description                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `valueOf()`                  | Returns the `ShoppingCartItem` as an object consisting of all its public properties.                 |
| `toJSON()`                   | Returns the JSON representation of the `ShoppingCartItem` as an object consisting of its properties. |
| `toString()`                 | Returns the serialized version of the `ShoppingCartItem` instance as a JSON string.                  |
| `clone()`                    | Creates and returns a deep copy of the current shopping cart item.                                   |
| `incrementQuantity(size)`    | Increments the quantity of the item by the specified amount.                                         |
| `decrementQuantity(size)`    | Decrements the quantity of the item by the specified amount.                                         |
| `setTotalDiscount(discount)` | Sets the total discount applied to the item.                                                         |

| Property          | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `index`           | The index (position) of the item in the shopping cart.  |
| `prev_index`      | The previous index of the item in the shopping cart.    |
| `id`              | The unique identifier for the product.                  |
| `product`         | The product details.                                    |
| `unit_price`      | The price per unit of the product.                      |
| `quantity`        | The quantity of the product.                            |
| `unit_discount`   | The discount applied to each unit of the product.       |
| `total_discount`  | The discount applied to the total price of the product. |
| `aggregate_price` | The total price of the item after applying discounts.   |

#### ShoppingCartProvider

This provider manages the state of the shopping cart and provides access to it throughout the application.

```jsx
import { ShoppingCartProvider, useShoppingCart } from "./ShoppingCart";

// Use the provider in your application
function App() {
	return (
		<ShoppingCartProvider onCheckout={handleCheckout} persist={persistConfig}>
			{/* Your application components */}
		</ShoppingCartProvider>
	);
}
```

By default persistance is `disabled` and the storage is set to an instance of `LocalStoragePersistence` which uses localstorage api to persist data. You can add your own peristance `storage` by implementing `IStorage` interface.

##### Props

###### `PropType<ProductType>`

| Name           | Type                                        | Description                                                                                                                                    |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `onCheckout`   | `(cart: ShoppingCart<ProductType>) => void` | Optional callback function to handle the checkout process. This function is called when the `checkout` method is invoked on the shopping cart. |
| `initialItems` | `ShoppingCartItem<ProductType>[]`           | Initial values for the cart items. These items will be used to initialize the shopping cart.                                                   |
| `persist`      | `Partial<IPersistanceConfig> \| null`       | Persistence configuration for the shopping cart. It can include options to configure storage, disable persistence, or clear data on reload.    |

### `IPersistanceConfig`

| Name              | Type       | Default                   | Description                                                                                                  |
| ----------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `storage`         | `IStorage` | `LocalStoragePersistence` | The storage mechanism to use for persisting shopping cart data.                                              |
| `disabled`        | `boolean`  | `true`                    | If set to `true`, persistence will be disabled, and shopping cart data will not be stored.                   |
| `clear_on_reload` | `boolean`  | `false`                   | If set to `true`, shopping cart data will be cleared from storage when the application reloads or refreshes. |

##### Interfaces

###### `IStorage`

An interface defining methods for storing and retrieving shopping cart data.

| Method  | Description                         |
| ------- | ----------------------------------- |
| `save`  | Saves the provided data to storage. |
| `load`  | Retrieves data from storage.        |
| `clear` | Clears data from storage.           |

###### `defaultPersistanceConfig`

The default persistence configuration for the shopping cart.

###### Example

Here's an example of configuring the persistence settings for the shopping cart:

```jsx
const persistConfig: Partial<IPersistanceConfig> = {
    disabled: false,
    clear_on_reload: true,
    storage: new LocalStoragePersistence("custom_shopping_cart"),
};
```

This documentation provides detailed information about the usage of the `generateShoppingCartContextProvider` function, including its props, interfaces, and an example of how to configure persistence settings for the shopping cart.

## Release

For detailed release notes, please see [CHANGELOG.md](https://github.com/sreed17/shoppingcart/blob/master/docs/CHANGELOG.md).

## Contributing

Thank you for considering contributing to this project! Contributions are welcome and encouraged.

### How to Contribute

If you have any ideas, suggestions, or bug fixes, please follow these steps:

1. **Open an Issue**: If you encounter a bug, have a feature request, or want to suggest an improvement, please open an issue on [GitHub](https://github.com/sreed17/shoppingcart/issues) to discuss it.

2. **Submit a Pull Request**: If you'd like to contribute directly, fork the repository, make your changes, and submit a pull request. Please ensure your pull request follows our [contribution guidelines](https://github.com/sreed17/shoppingcart/blob/master/CONTRIBUTING.md) and adheres to our coding standards.

### Development Workflow

This project uses semantic-release, commitizen, and cz-conventional-changelog to automate versioning and generate changelogs. To commit changes, please use the following command:

```bash
npm run commit
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, please open an issue or submit a pull request on [GitHub](https://github.com/sreed17/shoppingcart).

!IMPORTANT: The project uses semantic-release and commitizen with cz-conventional-changelog. Use `npm run commit`to commit changes before pushing changes.

### Code of Conduct

Please note that this project is governed by a [Code of Conduct](https://github.com/sreed17/shoppingcart/blob/master/CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

We appreciate your contributions to making this project better for everyone!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sreed17/shoppingcart/blob/master/LICENSE) file for details.
