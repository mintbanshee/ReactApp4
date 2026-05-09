import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AdminCard from "../components/AdminCard";

const mockFlower = {
  id: "1",
  name: "Rose Bouquet",
  description: "Beautiful roses",
  price: 29.99,
  imageUrl: "https://example.com/rose.jpg",
  category: "Bouquet",
};

// mock test for opening the delete modal
test("opens delete modal when delete button is clicked", async () => {
  const mockDelete = vi.fn();

  render(
    <MemoryRouter>
      <AdminCard flower={mockFlower} onDelete={mockDelete} />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole("button", { name: /delete/i }));

  expect(screen.getByText(/delete flower/i)).toBeInTheDocument();
});

// mock test for calling onDelete when delete is confirmed
// does it actually delete when delete button clicked
test("calls onDelete when delete is confirmed", async () => {
  const mockDelete = vi.fn();

  render(
    <MemoryRouter>
      <AdminCard flower={mockFlower} onDelete={mockDelete} />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole("button", { name: /delete/i }));
  await userEvent.click(screen.getAllByRole("button", { name: /delete/i })[1]);

  expect(mockDelete).toHaveBeenCalledWith("1");
});

// mock test for closing the delete modal when cancel is clicked
test("closes delete modal when cancel is clicked", async () => {
  const mockDelete = vi.fn();

  render(
    <MemoryRouter>
      <AdminCard flower={mockFlower} onDelete={mockDelete} />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole("button", { name: /delete/i }));
  await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

  expect(screen.queryByText(/delete flower/i)).not.toBeInTheDocument();
}); 

// mock test for displying the flower details correctly
test("renders flower details correctly", () => {
  render(
    <MemoryRouter>
      <AdminCard flower={mockFlower} onDelete={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByText(/rose bouquet/i)).toBeInTheDocument();
  expect(screen.getByText(/beautiful roses/i)).toBeInTheDocument();
  expect(screen.getByText(/\$29.99/i)).toBeInTheDocument();
}); 