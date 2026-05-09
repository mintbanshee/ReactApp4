import { render, screen } from "@testing-library/react";
import FlowerCard from "../components/FlowerCard";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const mockFlower = {
  id: "1",
  name: "Rose Bouquet",
  description: "Beautiful roses",
  price: 29.99,
  imageUrl: "https://example.com/rose.jpg",
  category: "Bouquet",
};

// mock test for flower name display in FlowerCard component
test("renders flower name", () => {
  render(
    <FlowerCard
      flower={mockFlower}
      onAddToCart={() => {}}
    />
  );

  expect(screen.getByText("Rose Bouquet")).toBeInTheDocument();
});

// mock test for add to cart button
test("calls onAddToCart when button is clicked", async () => {
  const mockAddToCart = vi.fn();

  render(
    <FlowerCard
      flower={mockFlower}
      onAddToCart={mockAddToCart}
    />
  );

  const button = screen.getByRole("button", {
    name: /add to cart/i,
  });

  await userEvent.click(button);

  expect(mockAddToCart).toHaveBeenCalled();
});