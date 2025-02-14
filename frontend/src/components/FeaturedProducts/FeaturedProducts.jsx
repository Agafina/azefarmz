import React from "react";
import "./FeaturedProducts.css";
import { featuredProducts } from "../../assets/data";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="featured-products">
      <h2>{t("products.title")}</h2> {/* Translate the title */}
      <div className="products-grid">
        {featuredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={t(product.name)} />{" "}
            {/* Translate product name in alt text */}
            <h3>{t(product.name)}</h3> {/* Translate product name */}
            <p>{t(product.description)}</p>{" "}
            {/* Translate product description */}
            <Link to={"/products"} className="product-link">
              {t("cta.exploreNow")} {/* Translate "Explore Now" CTA */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
