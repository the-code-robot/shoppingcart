import { Context, useContext } from "react";
import { IShoppingCartContext } from "./ShoppingCartContext";

export default function generateShoppingCartHook<ProductType extends object>(
	_context: Context<IShoppingCartContext<ProductType> | null>,
) {
	const useShoppingCartContext = () => {
		const context = useContext(_context);
		if (!context) {
			throw new Error(
				"Error: useShoppingCartContext must be used inside ShoppingCartProvider.",
			);
		}
		return context;
	};

	return useShoppingCartContext;
}
