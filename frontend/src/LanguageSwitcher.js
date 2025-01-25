import React, { useEffect, useState, useRef } from "react";
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
  const dropdownRef = useRef(null); // Reference to the dropdown menu

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

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to handle dropdown opening and closing
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="language-switcher">
      <div
        className="dropdown-container"
        onClick={toggleDropdown} // Toggle dropdown visibility
        aria-haspopup="true"
        aria-expanded={dropdownOpen ? "true" : "false"}
      >
        <Globe className="globe-icon" size={20} />
        <span className="current-lang">{currentLang.toUpperCase()}</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu" ref={dropdownRef} role="menu">
          <div
            onClick={() => switchLanguage("en")}
            className={`dropdown-item ${currentLang === "en" ? "active" : ""}`}
            role="menuitem"
            aria-selected={currentLang === "en" ? "true" : "false"}
          >
            English
          </div>
          <div
            onClick={() => switchLanguage("fr")}
            className={`dropdown-item ${currentLang === "fr" ? "active" : ""}`}
            role="menuitem"
            aria-selected={currentLang === "fr" ? "true" : "false"}
          >
            Français
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
