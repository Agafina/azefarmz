import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cookie, Check, X, Shield, Info } from "lucide-react";
import "./CookieSettings.css";

const CookieSettings = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasPreferences = localStorage.getItem("cookiePreferences");
    if (!hasPreferences) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveCookiePreferences = (preferences) => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
  };

  const handleClose = (callback) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (callback) callback();
    }, 300);
  };

  const handleAcceptAll = () => {
    const preferences = { necessary: true, analytics: true, marketing: true };
    handleClose(() => saveCookiePreferences(preferences));
  };

  const handleRejectAll = () => {
    const preferences = { necessary: true, analytics: false, marketing: false };
    handleClose(() => saveCookiePreferences(preferences));
  };

  const handleNecessaryOnly = () => {
    const preferences = { necessary: true, analytics: false, marketing: false };
    handleClose(() => saveCookiePreferences(preferences));
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-settings ${isClosing ? "closing" : ""}`}>
      <div className="cookie-backdrop" onClick={() => handleClose()} />
      <div
        className="cookie-content"
        role="dialog"
        aria-labelledby="cookie-title"
      >
        <div className="cookie-header">
          <Cookie className="cookie-icon" size={24} />
          <h2 id="cookie-title">{t("cookies.title")}</h2>
        </div>
        {!isExpanded && (
          <button className="learn-more" onClick={() => setIsExpanded(true)}>
            <Info size={16} /> {t("cookies.buttons.learnMore")}
          </button>
        )}
        {isExpanded && (
          <div className="cookie-categories">
            <div className="cookie-category">
              <h3>{t("cookies.categories.necessary")}</h3>
              <p>{t("cookies.description.necessary")}</p>
            </div>
            <div className="cookie-category">
              <h3>{t("cookies.categories.analytics")}</h3>
              <p>{t("cookies.description.analytics")}</p>
            </div>
            <div className="cookie-category">
              <h3>{t("cookies.categories.marketing")}</h3>
              <p>{t("cookies.description.marketing")}</p>
            </div>
          </div>
        )}
        <div className="cookie-buttons">
          <button className="accept-all" onClick={handleAcceptAll}>
            <Check size={18} /> {t("cookies.buttons.acceptAll")}
          </button>
          <button className="necessary-only" onClick={handleNecessaryOnly}>
            <Shield size={18} /> {t("cookies.buttons.necessaryOnly")}
          </button>
          <button className="reject-all" onClick={handleRejectAll}>
            <X size={18} /> {t("cookies.buttons.rejectAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
