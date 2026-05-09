// src/pages/AddFlower.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addFlower } from '../services/flowerService.ts';

export default function AddFlower() {
  const navigate = useNavigate();
  const [flower, setFlower] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: 'https://images.pexels.com/photos/34789793/pexels-photo-34789793.jpeg',
    category: '',
  });

  // Handle input changes for all form fields
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

    const { name, value } = event.target;
    setFlower({
      ...flower,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  }

  // Handle form submission to add a new flower
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await addFlower(flower);
    navigate('/admin');
  }

  return (
    <div>
      <main className="container py-5">
        <h1 className="mb-4">Add New Flower</h1>

        {/* Flower Name */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-3">
              <input className="form-control mb-3"
                name="name" 
                placeholder='Flower Name'
                value={flower.name} 
                onChange={handleChange} 
                required />

              {/* Description */}
              <textarea className="form-control mb-3"
                name="description" 
                placeholder='Description'
                value={flower.description} 
                onChange={handleChange} 
                required />

              {/* Price */}
              <input className="form-control mb-3"
                name="price" 
                type="number"
                placeholder='Price'
                value={flower.price} 
                onChange={handleChange} 
                required />

              {/* Image URL */}
              <input className="form-control mb-3"
                name="imageUrl" 
                placeholder='Image URL'
                value={flower.imageUrl} 
                onChange={handleChange} 
                required />

              {/* Category */}
              <input className="form-control mb-3"
                name="category" 
                placeholder='Category'
                value={flower.category} 
                onChange={handleChange} 
                required />

        {/* Buttons */}
              <div className="card-footer bg-white d-flex gap-2">
                <Link to="/admin" className="btn btn-secondary w-50 mx-auto d-block">Cancel</Link> 
                <button type="submit" 
                  className="btn btn-success w-50 mx-auto d-block">
                    Save Flower
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}