import React from "react";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { banner } from "../../assets/data";

const Header = () => {
  const { t } = useTranslation(); // useTranslation hook for translations

  return (
    <div className="header">
      <div
        className="header-background"
        style={{
          backgroundImage: `url(${banner.image})`,
        }}
      >
        <div className="header-overlay"></div>
      </div>
      <div className="header-contents">
        <h1 className="header-title">{t(banner.title)}</h1>{" "}
        {/* Translated title */}
        <p className="header-description">{t(banner.description)}</p>{" "}
        {/* Translated description */}
        <div className="header-buttons">
          {banner.buttons.map((button) => (
            <a
              key={button.text}
              href={button.link}
              className={`header-button ${
                button.text === "banner.buttons.getStarted"
                  ? "get-started-button"
                  : "explore-button"
              }`}
            >
              {t(button.text)} {/* Translated button text */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
