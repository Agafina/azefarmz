import React from "react";
import "./bottom.css";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="cta-section">
      <div className="cta-content">
        <h2>Enjoy Easy Checkout and Secure Payment Options</h2>
        <p>
          Shop now to experience the goodness of farm-fresh products delivered
          with care.
        </p>
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default CTA;
