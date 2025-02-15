import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";
import "./TermsAndConditions.css";

const TermsConditions = () => {
  const { t } = useTranslation();
  const terms = t("pages.termsConditions", { returnObjects: true });
  const scrollRef = useRef(null);

  useEffect(() => {
    // Add fade effect to scroll shadow based on scroll position
    const handleScroll = () => {
      const element = scrollRef.current;
      if (!element) return;

      const hasVerticalScroll = element.scrollHeight > element.clientHeight;
      const isAtTop = element.scrollTop === 0;
      const isAtBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      element.classList.toggle("shadow-top", !isAtTop && hasVerticalScroll);
      element.classList.toggle(
        "shadow-bottom",
        !isAtBottom && hasVerticalScroll
      );
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="terms-container">
      <div className="terms-card">
        <header className="terms-header">
          <div className="terms-title">
            <Shield className="terms-icon" />
            <h1>{terms.title}</h1>
          </div>
          <p className="terms-description">{terms.description}</p>
        </header>

        <div className="terms-content" ref={scrollRef}>
          <div className="terms-sections">
            {terms.sections.map((section, index) => (
              <section key={index} className="terms-section">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
                {index < terms.sections.length - 1 && (
                  <div className="terms-divider" />
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
