import React, { useContext, useState } from "react";
import "./Products.css";
import { productCategories, products } from "../../assets/data";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(StoreContext);
  const { t } = useTranslation(); // Initialize the translation hook

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
      <h2>{t("products.maintitle")}</h2> {/* Translate title */}
      <h1>{t("products.subtitle")}</h1> {/* Translate subtitle */}

      <br />

      {/* Categories Filter */}
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

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={t("products.searchPlaceholder")} 
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
              <p className="price">${product.price.toFixed(2)} {" "} {product.unit}</p>
              <div className="product-actions">
               <div> <Link to={`/products/${product.id}`} className="details-link">
                  {t("products.viewDetails")}
                </Link>
                </div>
                <button onClick={() => addToCart(product)}>
                  {t("products.addToCart")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{t("products.noProductsFound")}</p> 
        )}
      </div>

      {/* Call-to-Action */}
      <div className="products-cta">
        <p>{t("products.cta.text")}</p> {/* Translate CTA text */}
        <Link to="/shop" className="cta-button">
          {t("products.cta.buttonText")} {/* Translate CTA button text */}
        </Link>
      </div>
    </div>
  );
};

export default Products;
