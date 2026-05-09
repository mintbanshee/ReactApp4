// src/services/orderService.ts

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { CartItem } from '../models/CartItem';

// Create a new order in Firestore
export async function createOrder(
  cart: CartItem[], 
  userEmail: string | null | undefined
) {

  // Calculate subtotal, tax, and total
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  // Add the order to Firestore
  return await addDoc(collection(db, 'orders'), {
    userEmail: userEmail ?? "guest",
    items: cart,
    subtotal, tax, 
    total,
    createdAt: serverTimestamp(),
  });
}
