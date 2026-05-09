
// src/pages/Shop.tsx

import { useEffect, useState } from "react";
import type { Flower } from "../models/Flower";
import { getFlowers } from "../services/flowerService";
import FlowerCard from "../components/FlowerCard";

type ShopProps = {
  onAddToCart: (flower: Flower) => void;
};

export default function Shop({ onAddToCart }: ShopProps) {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);

  // search for flowers when the component mounts
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = flower.name.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "All" || flower.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // load flowers from the database when the component mounts
  useEffect(() => {
    async function fetchFlowers() {
      try {
        const data = await getFlowers();
        setFlowers(data);
      } catch (error) {
        console.error("Error loading flowers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlowers();
  }, []);
  
  return (
    <main className="container py-5">
      
      {/* Page Header */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="mb-3">🌸 Bloom & Petal Flower Shop</h1>
        <p className="lead mb-4">
          A React, Vite, Bootstrap, and Firebase flower shop application.
        </p>
        
        {/* Search and filter controls */}
        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search flowers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Plant">Plant</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Spring">Spring</option>
              <option value="Gift Box">Gift Box</option>
              <option value="Bouquet">Bouquet</option>
              <option value="Flower">Flower</option>
            </select>
          </div>
        </div>
      </div>
 
    {/* Flower Cards */}
    
      {loading && <p>Loading flowers...</p>}
 
      <div className="row g-4">

        {filteredFlowers.map((flower) => (
          <div className="col-md-3" key={flower.id}>
            <FlowerCard flower={flower} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </main>
  );
}
 