import React from "react";
import { useTranslation } from "react-i18next";
import { sustainability } from "../../assets/data";
import "./Sustainability.css";
import { ChevronRight, DollarSign, Group, TreePine } from "lucide-react";

const Sustainability = () => {
  const { t } = useTranslation();

  const renderIcon = (type) => {
    switch (type) {
      case "environmental":
        return <TreePine size={70} className="mr-2" color="#228b22" />;
      case "social":
        return <Group size={70} className="mr-2" color="#228b22" />;
      case "economic":
        return <DollarSign size={70} className="mr-2" color="#228b22" />;
      default:
        return null;
    }
  };

  return (
    <div className="sustainability-container">
      <div className="sustainability-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>{t(sustainability.title)}</h1>
          <p>{t(sustainability.description)}</p>
        </div>

        {/* Main Sections */}
        <div className="sections-grid">
          {Object.entries(sustainability.sections).map(([key, section]) => (
            <div key={key} className="section-card">
              <div className="card-header">
                {renderIcon(key)}
                <h3>{t(section.title)}</h3>
              </div>
              <ul>
                {section.content.map((item, index) => (
                  <li key={index}>
                    <ChevronRight size={70} className="mr-2" color="#4b5563" />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3>{t("sustainability.benefits.title")}</h3>
          <div className="benefits-grid">
            {sustainability.benefits.list.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-number">{index + 1}</div>
                <p>{t(benefit)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="ct-section">
          <h3>{t(sustainability.cta.title)}</h3>
          <p>{t(sustainability.cta.content)}</p>
          <a href={t(sustainability.contact.website)} className="cta-button">
            {t("sustainability.cta.button")}
            <ChevronRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
