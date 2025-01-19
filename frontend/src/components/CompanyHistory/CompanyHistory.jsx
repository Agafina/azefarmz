import React from "react";
import "./CompanyHistory.css";
import { companyHistory } from "../../assets/data";

const CompanyHistory = () => {
  return (
    <div className="company-history">
      <h2>{companyHistory.title}</h2>
      {companyHistory.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      
    </div>
  );
};

export default CompanyHistory;
