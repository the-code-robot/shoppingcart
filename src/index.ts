/**
 * Creates a shopping cart context and provides a hook for accessing the shopping cart state.
 * This function returns an object containing the shopping cart context provider component
 * and a hook for consuming the shopping cart context.
 *
 * @typeparam ProductType The type of product items in the shopping cart.
 * @returns An object containing the shopping cart context provider component
 * and a hook for consuming the shopping cart context.
 *
 * @example
 * ```tsx
 * // ./shoppingCart.ts
 * import shoppingCart from "shoppingcart";
 *
 * interface YourProductType{
 *  // Definition of you product type
 * }
 *
 * const _ = shoppingCart<YourProductType>();
 * export default _;
 *
 *
 * // <your-file>.tsx
 * import React from 'react';
 * import { ShoppingCartProvider, useShoppingCart } from './shoppingCart';
 *
 * const App = () => {
 *   const { cart } = useShoppingCart();
 *
 *   return (
 *     <div>
 *       <h1>Shopping Cart Example</h1>
 *       {cart ? <p>Cart Items: {cart.item_count}</p> : <p>No items in cart</p>}
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
import generateShoppingCartContext from "./ShoppingCartContext";
import generateShoppingCartContextProvider from "./ShoppingCartProvider";
import generateShoppingCartHook from "./useShoppingCartContext";

function shoppingCart<ProductType extends object>() {
	// Generate the shopping cart context
	const MyShoppingCartContext = generateShoppingCartContext<ProductType>();

	// Return an object containing the shopping cart context provider component
	// and a hook for consuming the shopping cart context
	return {
		/**
		 * The shopping cart context provider component.
		 * Use this component at the top level of your React application
		 * to provide access to the shopping cart state.
		 */
		ShoppingCartProvider: generateShoppingCartContextProvider(
			MyShoppingCartContext,
		),
		/**
		 * A hook for consuming the shopping cart context.
		 * Use this hook to access the shopping cart state within functional components.
		 */
		useShoppingCart: generateShoppingCartHook(MyShoppingCartContext),
	};
}

export default shoppingCart;
