import React from "react";
import "./Introduction.css";
import { introduction } from "../../assets/data";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Introduction = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="introduction-section">
      {/* Introduction Text and Image */}
      <div className="introduction-main">
        <div className="introduction-content">
          <h2>{t(introduction.title)}</h2> {/* Translated title */}
          <p className="introduction-mission">{t(introduction.mission)}</p>{" "}
          {/* Translated mission */}
        </div>
        <div className="introduction-image">
          <img src={introduction.image} alt="Aze Farms" />
        </div>
      </div>

      {/* Values Section */}
      <div className="introduction-values">
        <h3>{t(introduction.valuesTitle)}</h3> {/* Translated values title */}
        <div className="values-grid">
          {introduction.values.map((value, index) => (
            <div key={index} className="value-card">
              <h4>{t(value.title)}</h4> {/* Translated value title */}
              <p>{t(value.description)}</p> {/* Translated value description */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
