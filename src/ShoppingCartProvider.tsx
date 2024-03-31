import React, {
	Context,
	FC,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import { IShoppingCartContext } from "./ShoppingCartContext";
import ShoppingCart from "./ShoppingCart";
import { ShoppingCartItem, isShoppingCartItem } from "./ShoppingCartItem";

export interface PropType<T extends object> extends PropsWithChildren {
	onCheckout?: (cart: ShoppingCart<T>) => void;
	initialItems?: ShoppingCartItem<T>[];
}

export default function generateShoppingCartContextProvider<
	ProductType extends object,
>(
	Context_: Context<IShoppingCartContext<ProductType> | null>,
): FC<PropType<ProductType>> {
	return ({ children, onCheckout, initialItems }: PropType<ProductType>) => {
		const [cart, setCart] = useState<ShoppingCart<ProductType> | null>(null);
		const [is_loading, setLoading] = useState(true);

		useEffect(() => {
			const updateCart = (
				instance: ShoppingCart<ProductType> | ShoppingCartItem<ProductType>,
			) => {
				if (isShoppingCartItem<ProductType>(instance)) {
					setCart((cart) => {
						if (!cart) {
							return null;
						}

						return cart.clone();
					});
				} else {
					setCart(instance.clone());
				}
			};

			const shoppingCart = new ShoppingCart<ProductType>({
				onChange: updateCart,
				onCheckout,
				items: initialItems ?? undefined,
			});
			setCart(shoppingCart);
			setLoading(false);
		}, []);

		const value = { cart, is_loading };

		return <Context_.Provider value={value}>{children}</Context_.Provider>;
	};
}
