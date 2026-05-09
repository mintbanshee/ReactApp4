// src/pages/Checkout.tsx

import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../models/CartItem";
import { createOrder } from "../services/orderService";
import { useState } from "react";

type CheckoutProps = {
  cart: CartItem[];
  userEmail: string | null | undefined;
  onClearCart: () => void;
};

export default function Checkout({
  cart,
  userEmail,
  onClearCart,
}: CheckoutProps) {
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  // handle placing the order and showing the success modal
  async function handlePlaceOrder() {
    if (cart.length === 0) return;

    await createOrder(cart, userEmail);
    setShowSuccessModal(true);
  }

  return (
    <>
      <main className="container py-5">
        <h1 className="mb-5">Checkout</h1>

        {/* Display cart items or empty message */}
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card p-4 shadow-sm w-">
                <h4>Order Summary</h4>

                {cart.map((item) => (
                  <p key={item.id}>
                    {item.name} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}

                <hr />

            {/* Order Totals */}
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <h4>Total: ${total.toFixed(2)}</h4>

                <p className="text-muted mt-3">
                  * This is a mock checkout. No real payment will be processed.
                </p>

            {/* Buttons */}
                <div className="d-flex justify-content-center gap-3">
                  <Link
                    to="/cart"
                    className="btn btn-outline-secondary w-50 mt-3 ms-2"
                  >
                    Back to Cart
                  </Link>

                  <button
                    className="btn btn-success w-50 mt-3"
                    onClick={handlePlaceOrder}
                  >
                    Mock Payment & Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>


  {/*~*~*~*~*~* Order Success Modal *~*~*~*~*~*/}


      {showSuccessModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-backdrop show"></div>

          <div
            className="modal-dialog modal-dialog-centered position-relative"
            style={{ zIndex: 1060 }}
          >
            <div className="modal-content shadow">
              <div className="modal-body text-center p-5">
                <h2 className="mb-3">🌸 Order Placed!</h2>

                <p>Thank you for shopping with Bloom & Petal.</p>

                <p className="small text-muted">
                  This was a mock checkout. No payment was processed.
                </p>

                <button
                  className="btn btn-success rounded-pill mt-3 px-4"
                  onClick={() => {
                    setShowSuccessModal(false);
                    onClearCart();
                    navigate("/shop");
                  }}
                >
                  Return to Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
