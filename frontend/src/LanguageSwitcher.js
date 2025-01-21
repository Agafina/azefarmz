import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Globe } from "lucide-react"; // Import the globe icon from lucide-react
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  // Function to switch language
  const switchLanguage = (lang) => {
    if (lang !== currentLang) {
      i18n.changeLanguage(lang).then(() => {
        setCurrentLang(lang);
        navigate(`/${lang}${location.pathname.substring(3)}`, {
          replace: true,
        });
        setDropdownOpen(false); // Close dropdown after selecting a language
      });
    }
  };

  // Effect to synchronize language with URL
  useEffect(() => {
    const langFromURL = location.pathname.split("/")[1];
    if (langFromURL && langFromURL !== currentLang) {
      i18n.changeLanguage(langFromURL).then(() => setCurrentLang(langFromURL));
    }
  }, [location.pathname, currentLang, i18n]);

  return (
    <div className="language-switcher">
      <div
        className="dropdown-container"
        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
      >
        <Globe className="globe-icon" size={20} />
        <span className="current-lang">{currentLang.toUpperCase()}</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => switchLanguage("en")}
            className={`dropdown-item ${currentLang === "en" ? "active" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => switchLanguage("fr")}
            className={`dropdown-item ${currentLang === "fr" ? "active" : ""}`}
          >
            Français
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
