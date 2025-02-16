import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Meta = ({ page }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const url = `${window.location.origin}${location.pathname}`;

  // Fetch translated metadata from i18n
  const title = t(`metadata.${page}.title`, t("metadata.default.title"));
  const description = t(
    `metadata.${page}.description`,
    t("metadata.default.description")
  );
  const keywords = t(
    `metadata.${page}.keywords`,
    t("metadata.default.keywords")
  );
  const image = t(`metadata.${page}.image`, t("metadata.default.image"));

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

// Default to "home" if no specific page is provided
Meta.defaultProps = {
  page: "default",
};

export default Meta;
