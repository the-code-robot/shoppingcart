import { createContext } from "react";
import ShoppingCart from "./ShoppingCart";

export interface IShoppingCartContext<T extends object> {
	cart: ShoppingCart<T> | null;
	is_loading: boolean;
}

const generateShoppingCartContext = <T extends object>() => {
	return createContext<IShoppingCartContext<T> | null>(null);
};

export default generateShoppingCartContext;
