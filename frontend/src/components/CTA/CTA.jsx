import React from "react";
import "./CTA.css";
import { ctaContent } from "../../assets/data";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Link } from "react-router-dom";

const CTA = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="cta-section">
      <h2>{t(ctaContent.title)}</h2> {/* Translate title */}
      <p>{t(ctaContent.description)}</p> {/* Translate description */}
      <div className="cta-buttons">
        {ctaContent.buttons.map((button, index) => (
          <Link
            key={index}
            to={button.link}
            className={`cta-button ${button.style}`}
          >
            {t(button.text)} {/* Translate button text */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CTA;
