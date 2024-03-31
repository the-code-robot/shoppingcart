import * as react from 'react';
import { PropsWithChildren } from 'react';

type IOnChangeCallback<T extends object> = (emitter_instance: T) => void;

/**
 * @file ShoppingCartItem.ts
 * @description Represents a single item in a shopping cart, managing its details such as product information, quantity, unit price, and discounts.
 */

/**
 * Represents the required parameters for creating a shopping cart item.
 */
type IRequiredParameters<ProductType> = {
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
type IOptionalParameters = {
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
type ICartItemParameters<ProductType> = IRequiredParameters<ProductType> & IOptionalParameters;
interface ICartItemJSON<ProductType> {
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
declare class ShoppingCartItem<ProductType extends object> {
    private _index;
    private _prev_index;
    private _id;
    private _product;
    private _unit_price;
    private _quantity;
    private _aggregate_price;
    private _unit_discount;
    private _total_discount;
    private onChangeCallback;
    private onChangeHandler;
    /**
     * Checks if the parameters used to create the shopping cart item are valid.
     * @returns A boolean indicating whether the parameters are valid.
     */
    private isParametersValid;
    /**
     * Updates the total price of the item based on the current parameters.
     */
    private updateTotalPrice;
    static parse<ProductType extends object>(str: string, onChange?: IOnChangeCallback<ShoppingCartItem<ProductType>>): ShoppingCartItem<ProductType>;
    /**
     * Returns the ShoppingCartItem as an object consisting of all its public properties.
     * @returns An object representing the ShoppingCartItem with its public properties.
     */
    valueOf(): ICartItemJSON<ProductType>;
    /**
     * Returns the JSON representation, the ShoppingCartItem as an object consisting of all its public properties.
     * @returns An object representing the ShoppingCartItem with its public properties.
     */
    toJSON(): ICartItemJSON<ProductType>;
    /**
     * Returns the serialized version of the instance as a JSON string.
     * @returns A JSON string representing the serialized version of the instance.
     */
    toString(): string;
    /**
     * Clones the current shopping cart item.
     * @returns A new instance of ShoppingClassItem with the same parameters as the current item.
     */
    clone(): ShoppingCartItem<ProductType>;
    /**
     * Increments the quantity of the item by the specified amount.
     * @param increment_size The amount by which to increment the quantity.
     */
    incrementQuantity(increment_size?: number): void;
    /**
     * Decrements the quantity of the item by the specified amount.
     * @param decrement_size The amount by which to decrement the quantity.
     */
    decrementQuantity(decrement_size?: number): void;
    /**
     * Sets the total discount applied to the item.
     * @param total_discount The total discount to apply.
     */
    setTotalDiscount(total_discount: number): void;
    /**
     * Change the index(position) of the item in the shopping cart.
     * @param new_index The new index of the item in the shopping cart.
     */
    setIndex(new_index: number): void;
    clearPrevIndex(): void;
    get index(): number;
    get prev_index(): number | null;
    get id(): string;
    get product(): ProductType;
    get unit_price(): number;
    get quantity(): number;
    get unit_discount(): number;
    get total_discount(): number;
    get aggregate_price(): number;
    /**
     * Constructs a new instance of ShoppingClassItem.
     * @param args The parameters used to initialize the shopping cart item.
     */
    constructor(args: ICartItemParameters<ProductType>, onChange?: IOnChangeCallback<ShoppingCartItem<ProductType>>);
}

/**
 * @file ShoppingCart.ts
 * @description Represent the shopping cart
 */

/**
 * Represents the parameters required to create a shopping cart item.
 */
type ICartItemCreateParameters<T> = Omit<ICartItemParameters<T>, "index">;
/**
 * Represents the parameters required to initialize a shopping cart.
 */
type ICartParameters<ProductType extends object> = {
    /**
     * The initial items in the shopping cart.
     */
    items?: ShoppingCartItem<ProductType>[];
    /**
     * The callback function to be called when the shopping cart changes.
     */
    onChange?: IOnChangeCallback<ShoppingCart<ProductType> | ShoppingCartItem<ProductType>>;
    /**
     * The callback function to be called when the checkout process is triggered.
     */
    onCheckout?: IOnChangeCallback<ShoppingCart<ProductType>>;
};
/**
 * Represents a shopping cart that can hold items of a specific product type.
 * @typeparam T The type of product items that the shopping cart can hold.
 */
declare class ShoppingCart<ProductType extends object> {
    private items;
    private hmap;
    private _sub_total;
    private onChange;
    private onCheckout;
    /**
     * Update the dependent states of the shopping cart.
     * This includes updating the hashmap and calculating the subtotal.
     */
    private updateDependentStates;
    /**
     * Emits the onChange callback if provided.
     */
    private emitOnChange;
    /**
     * Adds a new item to the shopping cart.
     * @param arg The parameters to create the new item.
     */
    private addNewItem;
    /**
     * Removes an item from the shopping cart by its index.
     * @param index The index of the item to remove.
     */
    private removeItemByIndex;
    /**
     * Removes an item from the shopping cart by its ID.
     * @param id The ID of the item to remove.
     */
    private removeItemById;
    /**
     * Move the item identified by the identifier to be moved to a new index within the shopping cart.
     * @param identifier Either the index of the item or its ID.
     * @param new_index  Index to which the item is to be moved.
     */
    moveItem(identifier: number | string, new_index: number): void;
    /**
     * Return the number of items in the the cart.
     */
    get item_count(): number;
    /**
     * Return the subtotal of the items in the cart.
     */
    get sub_total(): number;
    /**
     * Retrieves a ShoppingCartItem from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).
     * @param key The key (ID or index) used to retrieve the ShoppingCartItem.
     * @returns The ShoppingCartItem corresponding to the specified key.
     * @throws Error if the key is not found or if the index is out of bounds.
     */
    getCartItem(key: string | number): ShoppingCartItem<ProductType>;
    /**
     * Returns an iterator for iterating over all items in the shopping cart.
     * @returns An iterator that yields each ShoppingCartItem in the shopping cart.
     */
    [Symbol.iterator](): Generator<ShoppingCartItem<ProductType>, void, unknown>;
    /**
     * Parse a possibly serialized ShoppingCart to ShoppingCartItems array
     * @param str - A string which possible be serialized ShoppingCart
     */
    static parse<ProductType extends object>(str: string, onChange?: IOnChangeCallback<ShoppingCartItem<ProductType>>): ShoppingCartItem<ProductType>[];
    /**
     * Returns the value of the shopping cart as an array of objects, each representing a ShoppingCartItem.
     * @returns An array of objects representing each ShoppingCartItem in the shopping cart.
     */
    valueOf(): ICartItemJSON<ProductType>[];
    /**
     * Returns the corresponding JSON object of the shopping cart.
     * @returns An array of objects representing each ShoppingCartItem in the shopping cart.
     */
    toJSON(): ICartItemJSON<ProductType>[];
    /**
     * Returns a JSON string representing the value of the shopping cart.
     * @returns A JSON string representing the value of the shopping cart.
     */
    toString(): string;
    /**
     * Creates and returns a deep copy of the shopping cart.
     * @returns A new instance of ShoppingCart with identical items, onChange, and onCheckout properties.
     */
    clone(): ShoppingCart<ProductType>;
    /**
     * Maps each item in the shopping cart to another value using a mapping function.
     * @param fn A mapping function that transforms each item's JSON representation.
     * @returns An array of transformed values.
     */
    map(fn: (value: ICartItemJSON<ProductType>, index: number) => unknown): unknown[];
    /**
     * Adds a new item to the shopping cart or updates the quantity of an existing item if the ID matches.
     * @param arg The parameters for the new item to add or update.
     */
    addItem(arg: ICartItemCreateParameters<ProductType>): void;
    /**
     * Removes an item from the shopping cart based on the specified key, which can be either a string (ID) or a number (index).
     * @param arg The key (ID or index) used to identify the item to remove.
     */
    removeItem(arg: number | string, quantity?: number): void;
    /**
     * Filters the items in the shopping cart based on the provided function.
     * @param fn A function used to filter the items in the shopping cart.
     */
    filter(fn: (cart_item: ShoppingCartItem<ProductType>) => boolean): void;
    /**
     * Sorts the items in the shopping cart based on the provided comparison function.
     * @param fn A function used to compare two items in the shopping cart for sorting.
     */
    sort(fn: (cart_item_A: ShoppingCartItem<ProductType>, cart_item_B: ShoppingCartItem<ProductType>) => number): void;
    /**
     * Initiates the checkout process by calling the onCheckout callback function, if provided.
     * @throws Error if the onCheckout function is not provided.
     */
    checkout(): void;
    /**
     * Creates a new instance of the ShoppingCart class.
     * @param args The parameters to initialize the shopping cart.
     */
    constructor(args: ICartParameters<ProductType>);
}

interface IShoppingCartContext<T extends object> {
    cart: ShoppingCart<T> | null;
    is_loading: boolean;
}

interface IPersistanceConfig {
    storage: IStorage;
    disabled: boolean;
    clear_on_reload: boolean;
}
interface IStorage {
    save: (data: any) => void;
    load: () => string | null;
    clear: () => void;
}
declare class LocalStoragePersistence implements IStorage {
    private key;
    constructor(key: string);
    save(data: any): void;
    load(): any;
    clear(): void;
}

interface PropType<T extends object> extends PropsWithChildren {
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

declare function shoppingCart<ProductType extends object>(): {
    /**
     * The shopping cart context provider component.
     * Use this component at the top level of your React application
     * to provide access to the shopping cart state.
     */
    ShoppingCartProvider: react.FC<PropType<ProductType>>;
    /**
     * A hook for consuming the shopping cart context.
     * Use this hook to access the shopping cart state within functional components.
     */
    useShoppingCart: () => IShoppingCartContext<ProductType>;
};

export { type IStorage, LocalStoragePersistence, shoppingCart as default };
