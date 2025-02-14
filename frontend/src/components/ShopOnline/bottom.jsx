import React from "react";
import "./bottom.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const CTA = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="cta-section">
      <div className="cta-content">
        <h2>{t("cta.shopCTA.title")}</h2> {/* Translate title */}
        <p>{t("cta.shopCTA.description")}</p> {/* Translate description */}
        <Link to="/products" className="ca-button">
          {t("cta.shopCTA.buttonText")} {/* Translate button text */}
        </Link>
      </div>
    </div>
  );
};

export default CTA;
