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
import { IPersistanceConfig, defaultPersistanceConfig } from "./Persistance";

export interface PropType<T extends object> extends PropsWithChildren {
	/**
	 * Optional onCheckout callback. Calling the checkout method from the cart without defining this callback will throw an error.-
	 * @param cart The cart instance at the time of calling checkout
	 */
	onCheckout?: (cart: ShoppingCart<T>) => void;
	/**
	 * Initial values for the cart items, its has precedence over persisted data when loading
	 */
	initialItems?: ShoppingCartItem<T>[];
	/**
	 * Persistance configuration
	 */
	persist?: Partial<IPersistanceConfig> | null;
}

export default function generateShoppingCartContextProvider<
	ProductType extends object,
>(
	Context_: Context<IShoppingCartContext<ProductType> | null>,
): FC<PropType<ProductType>> {
	return ({
		children,
		onCheckout,
		initialItems,
		persist,
	}: PropType<ProductType>) => {
		const persistance_config = { ...defaultPersistanceConfig, ...persist };

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

			const { disabled, clear_on_reload, storage } = persistance_config;

			let persisted_str: string | null | undefined = undefined;

			if (storage && !disabled) {
				persisted_str = storage.load();
			}

			const persisted_data =
				typeof persisted_str === "string"
					? ShoppingCart.parse<ProductType>(persisted_str)
					: undefined;

			const shoppingCart = new ShoppingCart<ProductType>({
				onChange: updateCart,
				onCheckout,
				items: initialItems ?? persisted_data ?? undefined,
			});
			setCart(shoppingCart);
			setLoading(false);

			return () => {
				// Clean up
				const { disabled, clear_on_reload, storage } = persistance_config;
				if (storage && (disabled || clear_on_reload)) {
					storage.clear();
				}
			};
		}, []);

		useEffect(() => {
			const { storage, disabled } = persistance_config;
			if (disabled || !storage) {
				return;
			}
			storage.save(cart);
		}, [cart]);

		const value = { cart, is_loading };

		return <Context_.Provider value={value}>{children}</Context_.Provider>;
	};
}
