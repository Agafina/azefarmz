import "./Products.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useTranslation } from "react-i18next";
import { useProductContext } from "../../context/ProductContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(StoreContext);
  const { products, categories } = useProductContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const productCategories = categories;
  const { t } = useTranslation();

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
      <div className="products-header">
        <h2>{t("products.maintitle")}</h2>
        <h3>{t("products.subtitle")}</h3>
      </div>

      {/* Categories Filter */}
      <div className="categories-container">
        <div className="categories">
          <button
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            {t("All")}
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
      </div>

      {/* Search Bar */}
      <div className="product-search-bar">
        <input
          type="text"
          placeholder={t("products.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="products-grid-container">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={`${backendUrl}/images/${product.image}`}
                    alt={product.name}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="price">
                    {product.price} XAF / {product.unit}
                  </p>
                </div>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="details-link">
                    {t("products.viewDetails")}
                  </Link>
                  <button onClick={() => addToCart(product)}>
                    {t("products.addToCart")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">{t("products.noProductsFound")}</p>
        )}
      </div>

      {/* Call-to-Action */}
      <div className="products-cta">
        <p>{t("products.cta.text")}</p>
        <Link to="/shop" className="cta-button">
          {t("products.cta.buttonText")}
        </Link>
      </div>
    </div>
  );
};

export default Products;
