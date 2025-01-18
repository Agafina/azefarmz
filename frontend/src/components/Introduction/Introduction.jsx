import React from "react";
import "./Introduction.css";
import { introduction } from "../../assets/data";

const Introduction = () => {
  return (
    <div className="introduction-section">
      {/* Introduction Text and Image */}
      <div className="introduction-main">
        <div className="introduction-content">
          <h2>{introduction.title}</h2>
          <p className="introduction-mission">{introduction.mission}</p>
        </div>
        <div className="introduction-image">
          <img src={introduction.image} alt="Aze Farms" />
        </div>
      </div>

      {/* Values Section */}
      <div className="introduction-values">
        <h3>Our Core Values</h3>
        <div className="values-grid">
          {introduction.values.map((value, index) => (
            <div key={index} className="value-card">
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
