// src/services/flowerService.ts
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";
 
import { db } from "../firebase/firebaseConfig";
import type { Flower } from "../models/Flower";
 
const flowersCollection = collection(db, "flowers");
 
export async function getFlowers(): Promise<Flower[]> {
  const snapshot = await getDocs(flowersCollection);
 
  // Map the Firestore documents to Flower objects
  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  })) as Flower[];
}
 
// Get a single flower by its ID
export async function getFlowerById(id: string): Promise<Flower | null> {
  const flowerDoc = doc(db, "flowers", id);
  const snapshot = await getDoc(flowerDoc);
 
  // If the document doesn't exist, return null
  if (!snapshot.exists()) return null;
 
  // return the flower data
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Flower;
}
 
// Add a new flower to the collection
export async function addFlower(flower: Flower) {
  return await addDoc(flowersCollection, flower);
}
 
// Update an existing flower by its ID
export async function updateFlower(id: string, flower: Flower) {
  const flowerDoc = doc(db, "flowers", id);
 
  // Update the document with the new flower data
  return await updateDoc(flowerDoc, {
    name: flower.name,
    description: flower.description,
    price: flower.price,
    imageUrl: flower.imageUrl,
    category: flower.category,
  });
}
 
// Delete a flower by its ID
export async function deleteFlower(id: string) {
  const flowerDoc = doc(db, "flowers", id);
  return await deleteDoc(flowerDoc);
}