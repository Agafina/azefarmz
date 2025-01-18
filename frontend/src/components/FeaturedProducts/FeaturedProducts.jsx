import React from "react";
import "./FeaturedProducts.css";
import { featuredProducts } from "../../assets/data";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {featuredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Link to={product.link} className="product-link">
              Explore Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
