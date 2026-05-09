// src/components/AdminCard.tsx
import { useState } from "react";
import type { Flower } from "../models/Flower";
import { Link } from "react-router-dom";
 
type Props = {
  flower: Flower;
  onDelete: (id: string) => void;
};
 
export default function AdminCard({ flower, onDelete }: Props) {
 const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
  {/* Card */}
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

      {/* Card Footer with Buttons */}
      <div className="card-footer bg-white d-flex gap-2">
        {flower.id && (
          <>
            <Link
              to={`/edit/${flower.id}`}
              className="btn btn-outline-primary w-50"
            >
              Edit
            </Link>

            <button
              className="btn btn-outline-danger w-50"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>

        
{/*~*~*~*~*~*~* Delete Modal *~*~*~*~*~*~*/}

      {showDeleteModal && (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-backdrop show"></div>

            <div className="modal-dialog modal-dialog-centered position-relative" style={{ zIndex: 1060 }}>
            <div className="modal-content shadow">
              <div className="modal-body text-center p-5">
                <h2 className="mb-3">Delete Flower?</h2>

                <p>Are you sure you want to delete this flower?</p>

                <p className="small text-muted">This action cannot be undone.</p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill"
                    onClick={() => setShowDeleteModal(false)} >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill"
                    onClick={() => {
                      if (flower.id) {
                        onDelete(flower.id);
                      }
                      setShowDeleteModal(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      )} 
    </> 
  );
}