// src/pages/AdminDashboard.tsx

import { useEffect, useState } from "react";
import type { Flower } from "../models/Flower";
import { getFlowers, deleteFlower } from "../services/flowerService";
import AdminCard from "../components/AdminCard";
import { Link } from "react-router";

// Admin dashboard page for managing flowers
export default function AdminDashboard() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);

 

  // search for flowers when the component mounts
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // filter flowers based on search term and category
  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = flower.name.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "All" || flower.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // load flowers when the component mounts
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

  // handle deleting a flower and refreshing the list
  async function handleDelete(id: string) {
    await deleteFlower(id);

    const data = await getFlowers();
    setFlowers(data);
  }
  
  return (
    <main className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">

        {/* Page Title */}
        <h1 className="mb-3">🌸 Admin Dashboard</h1>
        <p className="lead mb-4">
          Manage the flower inventory by adding, editing, or deleting flowers.
        </p>
        <Link to="/add-flower" className="btn btn-outline-primary btn-md mb-4">
          Add New Flower
        </Link>
        <p className="text-muted mb-4">
          Use the search and filter options to quickly find specific flowers.
        </p>
        
        {/* Search and filter controls */}
        <div className="row mb-2">
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
            <AdminCard flower={flower} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </main>
  );
}
 