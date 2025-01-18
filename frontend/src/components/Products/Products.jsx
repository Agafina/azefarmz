import React, { useContext, useState } from "react";
import "./Products.css";
import { productCategories, products } from "../../assets/data";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(StoreContext);

  // Filtered products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-section">
      <h2>Our Products</h2>

      <h1>Explore our premium range of farm-fresh and value-added products:</h1>

      <br />

      {/* Categories Filter */}
      <div className="categories">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {productCategories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="details-link">
                  View Details
                </Link>
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Call-to-Action */}
      <div className="products-cta">
        <p>
          Shop online today and enjoy the convenience of having farm-fresh
          goodness delivered to your doorstep!
        </p>
        <Link to="/shop" className="cta-button">
          Shop Online
        </Link>
      </div>
    </div>
  );
};

export default Products;
