import React from "react";
import "./CTA.css";
import { ctaContent } from "../../assets/data";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="cta-section">
      <h2>{ctaContent.title}</h2>
      <p>{ctaContent.description}</p>
      <div className="cta-buttons">
        {ctaContent.buttons.map((button, index) => (
          <Link
            key={index}
            to={button.link}
            className={`cta-button ${button.style}`}
          >
            {button.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CTA;
