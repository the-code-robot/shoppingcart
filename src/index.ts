import generateShoppingCartContext from "./ShoppingCartContext";
import generateShoppingCartContextProvider from "./ShoppingCartProvider";
import generateShoppingCartHook from "./useShoppingCartContext";

function shoppingCart<ProductType extends object>() {
	const MyShoppingCartContext = generateShoppingCartContext<ProductType>();
	return {
		ShoppingCartProvider: generateShoppingCartContextProvider(
			MyShoppingCartContext,
		),
		useShoppingCart: generateShoppingCartHook(MyShoppingCartContext),
	};
}

export default shoppingCart;
