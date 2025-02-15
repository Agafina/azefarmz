import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./FAQs.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        className="faq-question-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="question-text">{question}</span>
        {isOpen ? (
          <ChevronUp className="faq-icon" size={24} />
        ) : (
          <ChevronDown className="faq-icon" size={24} />
        )}
      </button>
      <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
        <div className="faq-answer">{answer}</div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const { t } = useTranslation();
  const faqItems = t("pages.faqs.questions", { returnObjects: true });

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">{t("pages.faqs.title")}</h2>
      <p className="faqs-description">{t("pages.faqs.description")}</p>
      <div className="faqs-content">
        {faqItems.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
