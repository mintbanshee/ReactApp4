// src/pages/Cart.tsx

import { Link } from "react-router-dom";
import type { CartItem } from "../models/CartItem";

type CartProps = {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
};

export default function Cart({
  cart,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartProps) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0);

    return (
      <main className="container py-5">
        <h1 className="mb-4">🛒 Your Cart</h1>

        {/* Empty Cart Message - Cart Items */}
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="lead">Your cart is empty. Start adding some flowers!</p>
            <Link to="/" className="btn btn-outline-primary">
              Browse Flowers
            </Link>
          </div>

        ) : (

          <div className="row g-5">
            <div className="col-md-4">
              {cart.map((item) => (
                <div key={item.id} className="card mb-3 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${item.imageUrl}?auto=format&fit=crop&w=600&q=80`}
                        className="img-fluid rounded-start"
                        alt={item.name}
                        style={{ height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400?text=Flower+Image";
                        }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column justify-content-between align-items-start h-100 ms-3">
                        <h5 className="card-title mb-3">{item.name}</h5>
                        <p className="card-text">${item.price.toFixed(2)}</p>
                        <div className="d-flex align-items-center mb-3">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => onDecreaseQuantity(item.id!)}
                          >
                            -
                          </button>
                          <span className="mx-4">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => onIncreaseQuantity(item.id!)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm align-self-end"
                          onClick={() => onRemoveFromCart(item.id!)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

              {/* Order Summary */}
            <div className="col-md-6 offset-md-2">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                  <p className="card-text">Tax (13%): ${(subtotal * 0.13).toFixed(2)}</p>
                  <h5 className="card-text">Total: ${(subtotal * 1.13).toFixed(2)}</h5>

                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/shop" className="btn btn-outline-secondary w-50 mt-3 ms-2">
                      Continue Shopping
                    </Link>
                    <Link to="/checkout" className="btn btn-primary w-50 mt-3">
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </main>   

    );
}