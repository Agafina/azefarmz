import React, { useEffect, useRef } from "react";
import "./CTA.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ctaContents } from "../../assets/data";

const CTA = ({ type, index }) => {
  const { t } = useTranslation();
  const content = ctaContents[type] || ctaContents.default;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className={`cta-section fade-in-up ${isEven ? "" : "light-bg"}`}
    >
      <div className="cta-content">
        <h2 className="slide-in-left">{t(content.title)}</h2>
        <p className="slide-in-right">{t(content.description)}</p>
        <div className="cta-buttons fade-in">
          {content.buttons.map((button, idx) => (
            <Link
              key={idx}
              to={button.link}
              className={`cta-button ${button.style} bounce-on-hover`}
            >
              {t(button.text)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTA;
