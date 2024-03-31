/**
 * @file ShoppingCart.ts
 * @description Represent the shopping cart
 */

import {
	ICartItemJSON,
	ICartItemParameters,
	ShoppingCartItem,
	isShoppingCartItem,
} from "./ShoppingCartItem";
import { IOnChangeCallback } from "./common_types";

/**
 * Represents the parameters required to create a shopping cart item.
 */
export type ICartItemCreateParameters<T> = Omit<
	ICartItemParameters<T>,
	"index"
>;

/**
 * Represents the parameters required to initialize a shopping cart.
 */
export type ICartParameters<ProductType extends object> = {
	/**
	 * The initial items in the shopping cart.
	 */
	items?: ShoppingCartItem<ProductType>[];
	/**
	 * The callback function to be called when the shopping cart changes.
	 */
	onChange?: IOnChangeCallback<
		ShoppingCart<ProductType> | ShoppingCartItem<ProductType>
	>;
	/**
	 * The callback function to be called when the checkout process is triggered.
	 */
	onCheckout?: IOnChangeCallback<ShoppingCart<ProductType>>;
};

/**
 * Represents a shopping cart that can hold items of a specific product type.
 * @typeparam T The type of product items that the shopping cart can hold.
 */
export default class ShoppingCart<ProductType extends object> {
	// Array to hold the shopping card items. This can be considered an independent state.
	private items: ShoppingCartItem<ProductType>[];
	// Hashmap to store item indices based on their IDs for quick retrieval
	private hmap: Record<string, number> = {};
	// The total cost of all items in the shopping cart before taxes and shipping charges are applied.
	private _sub_total: number = 0;
	// Callback function to be called when the shopping cart changes
	private onChange: ICartParameters<ProductType>["onChange"];
	// Callback function to be called when the checkout process is triggered
	private onCheckout: ICartParameters<ProductType>["onCheckout"];

	/**
	 * Update the dependent states of the shopping cart.
	 * This includes updating the hashmap and calculating the subtotal.
	 */
	private updateDependentStates() {
		const hmap: Record<string, number> = {};

		let sum = 0;

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].setIndex(i);
			const id = this.items[i].id;
			hmap[id] = i;
			this.items[i].clearPrevIndex();
			sum += this.items[i].aggregate_price;
		}

		this._sub_total = sum;
		this.hmap = hmap;
	}

	/**
	 * Emits the onChange callback if provided.
	 */
	private emitOnChange() {
		if (this.onChange) {
			this.onChange(this);
		}
	}

	/**
	 * Adds a new item to the shopping cart.
	 * @param arg The parameters to create the new item.
	 */
	private addNewItem(
		arg: ICartItemParameters<ProductType> | ShoppingCartItem<ProductType>,
	) {
		let item: ShoppingCartItem<ProductType>;
		if (isShoppingCartItem<ProductType>(arg)) {
			item = arg;
		} else {
			item = new ShoppingCartItem(arg, this.onChange);
		}
		this.items.push(item);
		this.hmap[arg.id] = arg.index;
		this._sub_total += item.aggregate_price;

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Removes an item from the shopping cart by its index.
	 * @param index The index of the item to remove.
	 */
	private removeItemByIndex(index: number) {
		// Check if the index is within the allowed range
		if (index < 0 || index >= this.items.length) {
			throw new Error(
				`Error removing cart item by index: index out of bound. index[${index}]`,
			);
		}

		const id = this.items[index].id;
		this.items.splice(index, 1);

		this.updateDependentStates();

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Removes an item from the shopping cart by its ID.
	 * @param id The ID of the item to remove.
	 */
	private removeItemById(id: string) {
		// Check if the index is within the allowed range
		if (!(id in this.hmap)) {
			throw new Error(
				`Error removing cart item by id: id not found. id[${id}]`,
			);
		}

		const index = this.hmap[id];
		this.items.splice(index, 1);

		this.updateDependentStates();

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Move the item identified by the identifier to be moved to a new index within the shopping cart.
	 * @param identifier Either the index of the item or its ID.
	 * @param new_index  Index to which the item is to be moved.
	 */
	moveItem(identifier: number | string, new_index: number) {
		const index =
			typeof identifier === "number" ? identifier : this.hmap[identifier];

		if (typeof index !== "number") {
			throw new Error(
				"Error repositioning cart item: identifier cant be resolved, or not found. Check the identifier <index | id>",
			);
		}

		if (new_index < 0 || new_index >= this.items.length) {
			throw new Error(
				"Error repositioning cart item: new_index is out of bound.",
			);
		}

		const removed_item = this.items.splice(index, 1);
		this.items.splice(new_index, 0, ...removed_item);

		// Reset the prev_index to prevent error during dependent state update.
		// This acts as a minor lock for manually setting the index from the cart object.
		// If a user tries to manually set the index from a cart object-
		// then it must be followed by a move operation to remove the lock.
		if (this.items[new_index].prev_index !== null) {
			this.items[new_index].clearPrevIndex();
		}

		this.updateDependentStates();

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Return the number of items in the the cart.
	 */
	get item_count() {
		return this.items.length;
	}

	/**
	 * Return the subtotal of the items in the cart.
	 */
	get sub_total() {
		return this._sub_total;
	}

	/**
	 * Retrieves a ShoppingCartItem from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).
	 * @param key The key (ID or index) used to retrieve the ShoppingCartItem.
	 * @returns The ShoppingCartItem corresponding to the specified key.
	 * @throws Error if the key is not found or if the index is out of bounds.
	 */
	getCartItem(key: string | number): ShoppingCartItem<ProductType> {
		switch (typeof key) {
			case "string": {
				if (key in this.hmap) {
					throw new Error(
						`Error getting the cart item by id: id not found. id[${key}]`,
					);
				}
				return this.items[this.hmap[key]];
			}
			case "number": {
				if (key < 0 || key >= this.items.length) {
					throw new Error(
						`Error getting the cart item by index: index out of bound. index[${key}]`,
					);
				}
				return this.items[key];
			}
		}
	}

	/**
	 * Returns an iterator for iterating over all items in the shopping cart.
	 * @returns An iterator that yields each ShoppingCartItem in the shopping cart.
	 */
	*[Symbol.iterator]() {
		for (const item of this.items) {
			yield item;
		}
	}

	/**
	 * Returns the value of the shopping cart as an array of objects, each representing a ShoppingCartItem.
	 * @returns An array of objects representing each ShoppingCartItem in the shopping cart.
	 */
	valueOf() {
		return this.items.map((item) => item.valueOf());
	}

	/**
	 * Returns the corresponding JSON object of the shopping cart.
	 * @returns An array of objects representing each ShoppingCartItem in the shopping cart.
	 */
	toJSON() {
		return this.valueOf();
	}

	/**
	 * Returns a JSON string representing the value of the shopping cart.
	 * @returns A JSON string representing the value of the shopping cart.
	 */
	toString() {
		return JSON.stringify(this);
	}

	/**
	 * Creates and returns a deep copy of the shopping cart.
	 * @returns A new instance of ShoppingCart with identical items, onChange, and onCheckout properties.
	 */
	clone() {
		return new ShoppingCart<ProductType>({
			items: this.items,
			onChange: this.onChange,
			onCheckout: this.onCheckout,
		});
	}

	/**
	 * Maps each item in the shopping cart to another value using a mapping function.
	 * @param fn A mapping function that transforms each item's JSON representation.
	 * @returns An array of transformed values.
	 */
	map(fn: (value: ICartItemJSON<ProductType>, index: number) => unknown) {
		return this.items.map((item, i) => {
			return fn(item.valueOf(), i);
		});
	}

	/**
	 * Adds a new item to the shopping cart or updates the quantity of an existing item if the ID matches.
	 * @param arg The parameters for the new item to add or update.
	 */
	addItem(arg: ICartItemCreateParameters<ProductType>) {
		const id = arg.id;
		const item_already_exists = id in this.hmap;

		const params: ICartItemParameters<ProductType> = {
			...arg,
			index: this.items.length,
		};

		// If its a new item (id is not in hmap) then push the new item
		if (!item_already_exists) {
			return this.addNewItem(params);
		}

		// If the items already exists then update the quantity
		this.items[this.hmap[id]].incrementQuantity(arg.quantity);
	}

	/**
	 * Removes an item from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).
	 * @param arg The key (ID or index) used to identify the item to remove.
	 */
	removeItem(arg: number | string, quantity?: number) {
		if (typeof quantity === "number" && quantity > 0) {
			const item = this.getCartItem(arg);

			const old_quantity = item.quantity;
			const new_quantity = old_quantity - quantity;
			if (new_quantity <= 0) {
				this.removeItemByIndex(item.index);
				return;
			}

			item.decrementQuantity(quantity);
			return;
		}

		switch (typeof arg) {
			case "string": {
				return this.removeItemById(arg);
			}
			case "number": {
				return this.removeItemByIndex(arg);
			}
		}
	}

	/**
	 * Filters the items in the shopping cart based on the provided function.
	 * @param fn A function used to filter the items in the shopping cart.
	 */
	filter(fn: (cart_item: ShoppingCartItem<ProductType>) => boolean) {
		this.items.filter(fn);
		this.updateDependentStates();

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Sorts the items in the shopping cart based on the provided comparison function.
	 * @param fn A function used to compare two items in the shopping cart for sorting.
	 */
	sort(
		fn: (
			cart_item_A: ShoppingCartItem<ProductType>,
			cart_item_B: ShoppingCartItem<ProductType>,
		) => number,
	) {
		this.items.sort(fn);
		this.updateDependentStates();

		// Trigger change
		this.emitOnChange();
	}

	/**
	 * Initiates the checkout process by calling the onCheckout callback function, if provided.
	 * @throws Error if the onCheckout function is not provided.
	 */
	checkout() {
		if (this.onCheckout) {
			return this.onCheckout(this);
		}
		throw new Error(
			"Error: Called checkout function without providing a onCheckout function",
		);
	}

	/**
	 * Creates a new instance of the ShoppingCart class.
	 * @param args The parameters to initialize the shopping cart.
	 */
	constructor(args: ICartParameters<ProductType>) {
		const { items = [], onChange, onCheckout } = args;

		if (onChange && typeof onChange !== "function") {
			throw new Error(
				"Type error: onChange must be a function. see the documentation.",
			);
		}

		if (onCheckout && typeof onCheckout !== "function") {
			throw new Error(
				"Type error: onCheckout must be a function. see the documentation.",
			);
		}

		this.items = [...items];
		this.onChange = onChange;
		this.onCheckout = onCheckout;
		this.updateDependentStates();
	}
}
