/**
 * @file ShoppingCartItem.ts
 * @description Represents a single item in a shopping cart, managing its details such as product information, quantity, unit price, and discounts.
 */

import { ICartParameters } from "./ShoppingCart";
import { IOnChangeCallback } from "./common_types";

/**
 * Represents the required parameters for creating a shopping cart item.
 */
export type IRequiredParameters<ProductType> = {
	/**
	 * Index (position) of the item in the shopping cart.
	 */
	index: number;

	/**
	 * The unique identifier for the product. Used for hashing
	 */
	id: string;
	/**
	 * The product details.
	 */
	product: ProductType;
	/**
	 * The price per unit of the product.
	 */
	unit_price: number;
};

/**
 * Represents the optional parameters for creating a shopping cart item.
 */
export type IOptionalParameters = {
	/**
	 * The quantity of the product.
	 * Default: 1
	 */
	quantity?: number;
	/**
	 * The discount applied to each unit of the product.
	 * Default: 0
	 */
	unit_discount?: number;
	/**
	 * The discount applied to the total price of the product.
	 * Default: 0
	 */
	total_discount?: number;
};

/**
 * Represents the parameters for creating a shopping cart item.
 */
export type ICartItemParameters<ProductType> =
	IRequiredParameters<ProductType> & IOptionalParameters;

export interface ICartItemJSON<ProductType> {
	index: number;
	id: string;
	product: ProductType;
	unit_price: number;
	quantity: number;
	unit_discount: number;
	total_discount: number;
	aggregate_price: number;
}

/**
 * Represents a single item in the shopping cart.
 * Manages the item's details such as product, quantity, unit price, and discounts.
 */
export class ShoppingCartItem<ProductType extends object> {
	private _index: number;
	private _prev_index: number | null = null;
	private _id: string;
	private _product: ProductType;
	private _unit_price: number;
	private _quantity: number;
	private _aggregate_price: number = 0;
	private _unit_discount: number;
	private _total_discount: number;

	private onChangeCallback:
		| IOnChangeCallback<ShoppingCartItem<ProductType>>
		| undefined;

	private onChangeHandler() {
		if (
			this.onChangeCallback &&
			typeof this.onChangeCallback === "function"
		) {
			this.onChangeCallback(this);
		}
	}

	/**
	 * Checks if the parameters used to create the shopping cart item are valid.
	 * @returns A boolean indicating whether the parameters are valid.
	 */
	private isParametersValid(): boolean {
		return (
			this._unit_price >= 0 &&
			this._quantity >= 0 &&
			this._unit_discount >= 0 &&
			this._total_discount >= 0
		);
	}

	/**
	 * Updates the total price of the item based on the current parameters.
	 */
	private updateTotalPrice(): void {
		if (!this.isParametersValid()) {
			throw new Error(
				"Error updating the total price for the product stack: " +
					"check the unit_price, quantity, unit_discount, and total_discount parameters " +
					"and ensure they are non-negative values.",
			);
		}

		// Calculate the total price after applying discounts
		let aggregate_price =
			this._quantity * (this._unit_price - this._unit_discount);
		aggregate_price -= aggregate_price * this._total_discount;

		// Update the total price for the item
		this._aggregate_price = aggregate_price;
	}

	static parse<ProductType extends object>(
		str: string,
		onChange?: IOnChangeCallback<ShoppingCartItem<ProductType>>,
	): ShoppingCartItem<ProductType> {
		const obj = JSON.parse(str);
		if (!isShoppingCartItemJSON(obj)) {
			throw new Error("Error parsing the ShoppingCartItem: invalid format.");
		}

		const params: ICartItemParameters<ProductType> = {
			index: obj.index,
			id: obj.id,
			product: obj.product as ProductType,
			unit_price: obj.unit_price,
			quantity: obj.quantity,
			total_discount: obj.total_discount,
			unit_discount: obj.unit_discount,
		};
		return new ShoppingCartItem<ProductType>({ ...params }, onChange);
	}

	/**
	 * Returns the ShoppingCartItem as an object consisting of all its public properties.
	 * @returns An object representing the ShoppingCartItem with its public properties.
	 */
	valueOf(): ICartItemJSON<ProductType> {
		return {
			index: this._index,
			id: this._id,
			product: { ...this._product },
			unit_price: this.unit_price,
			quantity: this._quantity,
			unit_discount: this.unit_discount,
			total_discount: this.total_discount,
			aggregate_price: this._aggregate_price,
		};
	}

	/**
	 * Returns the JSON representation, the ShoppingCartItem as an object consisting of all its public properties.
	 * @returns An object representing the ShoppingCartItem with its public properties.
	 */
	toJSON() {
		return this.valueOf();
	}

	/**
	 * Returns the serialized version of the instance as a JSON string.
	 * @returns A JSON string representing the serialized version of the instance.
	 */
	toString(): string {
		return JSON.stringify(this);
	}

	/**
	 * Clones the current shopping cart item.
	 * @returns A new instance of ShoppingClassItem with the same parameters as the current item.
	 */
	clone(): ShoppingCartItem<ProductType> {
		return new ShoppingCartItem(
			{
				index: this._index,
				id: this._id,
				product: this._product,
				unit_price: this._unit_price,
				quantity: this._quantity,
				unit_discount: this._unit_discount,
				total_discount: this._total_discount,
			},
			this.onChangeCallback,
		);
	}

	/**
	 * Increments the quantity of the item by the specified amount.
	 * @param increment_size The amount by which to increment the quantity.
	 */
	incrementQuantity(increment_size: number = 1): void {
		if (increment_size <= 0) {
			throw new Error(
				"Error updating the shopping cart item quantity: increment_size must be a positive non-zero number",
			);
		}
		this._quantity += increment_size;
		this.updateTotalPrice();

		// trigger change callback
		this.onChangeHandler();
	}

	/**
	 * Decrements the quantity of the item by the specified amount.
	 * @param decrement_size The amount by which to decrement the quantity.
	 */
	decrementQuantity(decrement_size: number = 1): void {
		if (decrement_size <= 0) {
			throw new Error(
				"Error updating the shopping cart item quantity: decrement_size must be a positive non-zero number",
			);
		}
		const new_quantity = this._quantity - decrement_size;
		this._quantity = new_quantity < 0 ? 0 : new_quantity;
		this.updateTotalPrice();

		// trigger change callback
		this.onChangeHandler();
	}

	/**
	 * Sets the total discount applied to the item.
	 * @param total_discount The total discount to apply.
	 */
	setTotalDiscount(total_discount: number): void {
		this._total_discount = total_discount;
		this.updateTotalPrice();

		// trigger change callback
		this.onChangeHandler();
	}

	/**
	 * Change the index(position) of the item in the shopping cart.
	 * @param new_index The new index of the item in the shopping cart.
	 */
	setIndex(new_index: number) {
		if (this.prev_index !== null) {
			throw new Error(
				"Error changing the index of cart item: a pending move exists",
			);
		}

		this._prev_index = this.index;
		this._index = new_index;
	}

	clearPrevIndex() {
		if (this.prev_index == null) {
			throw new Error(
				"Error trying to clear prev index when prev index is null",
			);
		}
		this._prev_index = null;
	}

	// =================
	// public properties
	// =================

	get index(): number {
		return this._index;
	}

	get prev_index(): number | null {
		return this._prev_index;
	}

	get id(): string {
		return this._id;
	}

	get product(): ProductType {
		return this._product;
	}

	get unit_price(): number {
		return this._unit_price;
	}

	get quantity(): number {
		return this._quantity;
	}

	get unit_discount(): number {
		return this._unit_discount;
	}

	get total_discount(): number {
		return this._total_discount;
	}

	get aggregate_price(): number {
		return this._aggregate_price;
	}

	// ============
	// Constructor
	// ============

	/**
	 * Constructs a new instance of ShoppingClassItem.
	 * @param args The parameters used to initialize the shopping cart item.
	 */
	constructor(
		args: ICartItemParameters<ProductType>,
		onChange?: IOnChangeCallback<ShoppingCartItem<ProductType>>,
	) {
		// Assign default values to optional parameters if not provided
		const {
			index,
			id,
			product,
			unit_price,
			quantity = 1,
			unit_discount = 0,
			total_discount = 0,
		}: ICartItemParameters<ProductType> = args;

		// Assign parameters to instance variables
		this._index = index;
		this._id = id;
		this._product = product;
		this._quantity = quantity;
		this._unit_price = unit_price;
		this._unit_discount = unit_discount;
		this._total_discount = total_discount;

		this.onChangeCallback = onChange;

		// Update the total price based on the provided parameters
		this.updateTotalPrice();
	}
}

/**
 * Default parameters for creating a shopping cart item.
 */
const defaultParameters: IOptionalParameters = {
	unit_discount: 0,
	total_discount: 0,
	quantity: 1,
};

/**
 * Check whether a given argument is an instance of ShoppingCartItem.
 * @param arg The argument to check.
 * @returns A boolean indicating whether the argument is an instance of ShoppingCartItem.
 */
export function isShoppingCartItem<T extends object>(
	arg: unknown,
): arg is ShoppingCartItem<T> {
	if (!arg || typeof arg !== "object") {
		return false;
	}
	return arg instanceof ShoppingCartItem;
}

export function isShoppingCartItemJSON<T extends object>(
	arg: unknown,
): arg is ICartItemJSON<T> {
	if (!arg || typeof arg !== "object") {
		return false;
	}
	const props = [
		"index",
		"id",
		"product",
		"unit_price",
		"quantity",
		"unit_discount",
		"total_discount",
		"aggregate_price",
	];

	for (let prop of props) {
		if (!(prop in arg)) {
			return false;
		}
		if (prop !== "product" && prop !== "id") {
			const n_value = Number(arg[prop as keyof typeof arg]);
			if (Number.isNaN(n_value)) {
				return false;
			}
		}
		if (prop === "id") {
			const n_value = Number(arg[prop as keyof typeof arg]);
			if (typeof n_value !== "string") {
				return false;
			}
		}
	}
	return true;
}
