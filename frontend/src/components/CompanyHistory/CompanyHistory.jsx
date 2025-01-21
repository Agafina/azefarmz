import React from "react";
import "./CompanyHistory.css";
import { companyHistory } from "../../assets/data";
import { useTranslation } from "react-i18next"; // Import useTranslation

const CompanyHistory = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="company-history">
      <h2>{t(companyHistory.title)}</h2> {/* Translate the title */}
      {companyHistory.content.map((paragraph, index) => (
        <p key={index}>{t(paragraph)}</p> 
      ))}
    </div>
  );
};

export default CompanyHistory;
