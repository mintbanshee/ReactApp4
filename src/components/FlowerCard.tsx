// src/components/FlowerCard.tsx

import type { Flower } from "../models/Flower";
 
type Props = {
  flower: Flower;
  onAddToCart: (flower: Flower) => void;
};
 
export default function FlowerCard({ flower, onAddToCart }: Props) {

  return (
    <div className="card h-100 shadow-sm mb-2">

      {/* Card Image */}
      <img
        src={`${flower.imageUrl}?auto=format&fit=crop&w=600&q=80`}
        className="card-img-top"
        alt={flower.name}
        style={{ height: "220px", objectFit: "cover" }}
        onError ={(e) => {
          e.currentTarget.src = "https://placehold.co/600x400?text=Flower+Image";
        }}
      />
 
      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">{flower.name}</h5>
        <p className="card-text">{flower.description}</p>
        <p className="fw-bold">${flower.price.toFixed(2)}</p>
        <span className="badge bg-success rounded-pill px-4 py-2">{flower.category}</span>
      </div>
 
      {/* Card Footer with Add to Cart Button */}
      <div className="card-footer bg-white">
          <button
            className="btn btn-outline-success w-100 mb-2 mt-2"
            onClick={() => onAddToCart(flower)}
          >
            Add to Cart
          </button>
      </div>
    </div>
  );
}