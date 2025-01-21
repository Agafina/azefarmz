import React from "react";
import "./top.css";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ShopOnlineHeader = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="shop-online-header">
      <h1>{t("shopOnlineHeader.title")}</h1> {/* Translate title */}
      <p>{t("shopOnlineHeader.description")}</p> {/* Translate description */}
    </div>
  );
};

export default ShopOnlineHeader;
