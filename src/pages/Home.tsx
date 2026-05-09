// src/pages/Home.tsx

import type { Flower } from "../models/Flower";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/home.css";

type HomeProps = {
  onAddToCart: (flower: Flower) => void;
};

export default function Home({ onAddToCart }: HomeProps) {
  const navigate = useNavigate();

// when click "Buy Now" for Mother's Day special, add the bouquet to cart and navigate to cart page
  function handleMothersDayPurchase() {
    const mothersDayFlower: Flower = {
      id: "mothers-day-special",
      name: "Mother's Day Roses",
      description: "A bouquet of 12 peach roses for Mother's Day.",
      price: 29.99,
      imageUrl:
        "https://images.pexels.com/photos/2014698/pexels-photo-2014698.jpeg",
      category: "Bouquet",
    };

    onAddToCart(mothersDayFlower);
    navigate("/cart");
  }

  // *~*~*~*~*~*~* DISPLAY HOME PAGE *~*~*~*~*~*~*

  return (
    <main className="container py-5">
      {/* background image */}
      <div className="hero-banner rounded-4 text-center text-white d-flex flex-column justify-content-center align-items-center">
        {/* overlay */}
        <div className="hero-overlay rounded-4"></div>

        {/* content */}
        <div className="hero-content position-relative px-4">
          <h1 className="display-4 fw-bold mb-3">Welcome to Bloom & Petal</h1>

          <p className="lead mb-4">
            Discover beautiful flowers and bouquets for every occasion.
          </p>

          {/* shop now button */}
          <Link
            to="/shop"
            className="btn btn-success btn-lg rounded-pill px-5 shop-btn "
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* MOTHER'S DAY SPECIAL */}

      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        {/* background image */}
        <div className="mothers-day-img mb-4 rounded-4">
          {/* overlay */}
          <div className="hero-overlay rounded-4"></div>

          {/* content */}
          <div className="mothers-day-content position-relative px-4">
            <h1 className="display-4 fw-bold mb-3 mt-4 text-white">
              Mother's Day Special
            </h1>
            <p className="lead mb-4 text-white">
              A bouquet of 12 stunning peach roses, perfect for <br /> showing
              your love and appreciation this Mother's Day.
            </p>

            {/* price */}
            <p className="h3 text-white mt-4">Only $29.99</p>

            {/* shop now button */}
            <button
              className="btn btn-danger btn-lg rounded-pill px-5 mt-3 buy-now-btn"
              onClick={handleMothersDayPurchase}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
