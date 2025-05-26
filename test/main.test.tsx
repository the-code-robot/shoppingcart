import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { shoppingCart } from "../src/index";

interface IMyProduct {
	id: string;
	price: number;
}

const { useShoppingCart, ShoppingCartProvider } = shoppingCart<IMyProduct>();

const TestComponent = () => {
	const { cart, is_loading } = useShoppingCart();

	if (is_loading || !cart) return <div>Loading...</div>;

	const handleAddItem = () => {
		//console.log("clicked-add");

		// Add item to cart
		const id = `pdt-${cart.item_count}`;
		cart.addItem({
			product: { id, price: 10 },
			id,
			unit_price: 10,
		});
	};

	const handleRemoveItem = () => {
		//console.log("clicked-remove");

		// Remove item from cart
		const id = `pdt-${cart.item_count - 1}`;
		cart.removeItem(id);
	};

	return (
		<>
			<p>This is atleast rendering</p>
			<button onClick={handleAddItem} data-testid="add-button">
				Add Item
			</button>
			<button onClick={handleRemoveItem} data-testid="remove-button">
				Remove Item
			</button>
			<div>{`cart: ${cart}`}</div>
			<div>{`count: ${cart?.item_count}`}</div>
		</>
	);
};

describe("ShoppingCart", () => {
	it("renders with initial state", () => {
		const { getByText } = render(
			<ShoppingCartProvider>
				<TestComponent />
			</ShoppingCartProvider>,
		);

		expect(getByText("This is atleast rendering")).toBeInTheDocument();
	});

	it("adds item to cart", () => {
		const { getByTestId, getByText } = render(
			<ShoppingCartProvider>
				<TestComponent />
			</ShoppingCartProvider>,
		);

		const add_button = getByText("Add Item");
		fireEvent.click(add_button);

		expect(getByText("count: 1")).toBeInTheDocument();
	});

	it("removes item from cart", () => {
		const { getByTestId, getByText } = render(
			<ShoppingCartProvider>
				<TestComponent />
			</ShoppingCartProvider>,
		);

		const addButton = getByTestId("add-button");
		act(() => {
			userEvent.click(addButton);
		});
		const add_button = getByText("Add Item");
		fireEvent.click(add_button);
		const remove_button = getByText("Remove Item");
		fireEvent.click(remove_button);
		// const removeButton = getByTestId("remove-button");
		// act(() => {
		// 	userEvent.click(removeButton);
		// });

		expect(getByText("count: 0")).toBeInTheDocument();
	});
});
