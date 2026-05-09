import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "../pages/Cart";

// Mock test for empty cart display
test("shows empty cart message", () => {
  render(
    <MemoryRouter>
      <Cart
        cart={[]}
        onIncreaseQuantity={() => {}}
        onDecreaseQuantity={() => {}}
        onRemoveFromCart={() => {}}
      />
    </MemoryRouter>
  );

  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});

// mock test for displaying cart total and subtotal
test("shows total price and subtotal correctly in order summary", () => {
  const cartItems = [
  {
    id: "1",
    name: "Product A",
    description: "Test flower",
    price: 10,
    imageUrl: "https://example.com/a.jpg",
    category: "Bouquet",
    quantity: 2,
  },
  {
    id: "2",
    name: "Product B",
    description: "Test flower",
    price: 20,
    imageUrl: "https://example.com/b.jpg",
    category: "Bouquet",
    quantity: 1,
  },
];

  render(
    <MemoryRouter>
      <Cart
        cart={cartItems}
        onIncreaseQuantity={() => {}}
        onDecreaseQuantity={() => {}}
        onRemoveFromCart={() => {}}
      />
    </MemoryRouter>
  );

  expect(screen.getByText(/subtotal/i)).toHaveTextContent("Subtotal: $40.00");
  expect(screen.getByText(/^total/i)).toHaveTextContent("Total: $45.20");
});
