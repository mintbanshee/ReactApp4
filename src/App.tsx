// src/App.tsx
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { logoutUser } from "./services/authService";
 
import type { Flower } from "./models/Flower";
import type { CartItem } from "./models/CartItem";
 
import Shop from "./pages/Shop";
import AdminDashboard from "./pages/AdminDashboard";
import EditFlower from "./pages/EditFlower";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddFlower from "./pages/AddFlower";
import Home from "./pages/Home";
 
export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const adminEmails = ["email@emailme.com"]; // add admin accounts here
  const isAdmin = currentUser ? adminEmails.includes(currentUser.email || "") : false;
  const [cart, setCart] = useState<CartItem[]>([]);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
 
    return () => unsubscribe();
  }, []);
 
  function addToCart(flower: Flower) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === flower.id);
 
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
 
      return [...currentCart, { ...flower, quantity: 1 }];
    });
  }
 
  function removeFromCart(id: string) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }
 
  function increaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
 
  function decreaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
 
  function clearCart() {
    setCart([]);
  }
 
  async function handleLogout() {
    await logoutUser();
  }
 
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
 
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🌸 Bloom & Petal
          </Link>

          {/* Navigation Links */}
          <div className="d-flex align-items-center gap-2">

          {/* Only users see cart button */}
            {!isAdmin && (
              <Link className="btn btn-warning btn-sm" to="/cart">
                Cart ({cartCount})
              </Link>
            )}
 
          {/* Show user email */}
            {currentUser ? (
              <>
                <span className="text-white small">
                  Hello, {currentUser.email}
                </span>

            {/* Only admins see admin button */}
              {isAdmin && (
                <Link className="btn btn-light btn-sm" to="/admin">
                  Admin
                </Link>
              )}
  
              {/* Logout/Login */}
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-light btn-sm" to="/login">
                  Login
                </Link>
 
              {/* Signup */}
                <Link className="btn btn-outline-light btn-sm" to="/register">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
 
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Shop onAddToCart={addToCart} />} />
        <Route path="/add-flower" element={<AddFlower />} />
        <Route path="/edit/:id" element={<EditFlower />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
            />
          }
        />
 
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              userEmail={currentUser?.email}
              onClearCart={clearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}