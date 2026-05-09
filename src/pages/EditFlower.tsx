// src/pages/EditFlower.tsx

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Flower } from "../models/Flower";
import { getFlowerById, updateFlower } from "../services/flowerService";
 
export default function EditFlower() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState<Flower>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
  });
 
  // load the flower details when the component mounts
  useEffect(() => {
    async function loadFlower() {
      if (!id) return;

      const data = await getFlowerById(id);
 
      if (data) {
        setFlower(data);
      }
    }
 
    loadFlower();

  }, [id]);
 
  // handle form input changes and update the flower state
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {

    const { name, value } = event.target;
    setFlower({
      ...flower,
      [name]: name === "price" ? Number(value) : value,
    });
  }
 
  // handle form submission to update the flower and navigate back to the shop
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!id) return;
    await updateFlower(id, flower);
    navigate("/admin");
  }
 
  return (
    <main className="container py-5">
      <h1>Edit Flower</h1>
 
    {/* Flower Name */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-3">
            <input
              className="form-control mb-3"
              name="name"
              value={flower.name}
              onChange={handleChange}
              required
            />

    {/* Description */}    
            <textarea
              className="form-control mb-3"
              name="description"
              value={flower.description}
              onChange={handleChange}
              required
            />
    
    {/* Price */}    
            <input
              className="form-control mb-3"
              name="price"
              type="number"
              step="0.01"
              value={flower.price}
              onChange={handleChange}
              required
            />
    
    {/* Image URL */}    
            <input
              className="form-control mb-3"
              name="imageUrl"
              value={flower.imageUrl}
              onChange={handleChange}
              required
            />
    
    {/* Category */}    
            <input
              className="form-control mb-3"
              name="category"
              value={flower.category}
              onChange={handleChange}
              required
            />
    
    {/* Buttons */}    
            <div className="card-footer bg-white d-flex gap-2">
              <Link to="/admin" className="btn btn-secondary w-50 mx-auto d-block">Cancel</Link>              
              <button className="btn btn-success w-50 mx-auto d-block">Update Flower</button>

            </div>
      </form>
    </div>
  </div>
</main>

  );

}
 