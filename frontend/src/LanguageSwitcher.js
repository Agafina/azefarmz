import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate(); // Get navigate function from react-router
  const location = useLocation(); // Get the current location (URL) from react-router

  // Function to switch language based on selected language
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language using i18next
    // Update the route to reflect the language change
    navigate(`/${lang}${location.pathname.substring(3)}`); // Retain the rest of the URL after the language part
  };

  // UseEffect to automatically change language when the URL's language part changes
  useEffect(() => {
    const lang = location.pathname.split("/")[1]; // Extract the language from the URL
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang); // Change language if it's different from the current language
    }
  }, [location, i18n]); // Dependency array: trigger effect when location or i18n changes

  return (
    <div className="language-switcher">
      <button onClick={() => switchLanguage("en")} className="language-button">
        English
      </button>
      <button onClick={() => switchLanguage("fr")} className="language-button">
        Français
      </button>
    </div>
  );
}

export default LanguageSwitcher;
