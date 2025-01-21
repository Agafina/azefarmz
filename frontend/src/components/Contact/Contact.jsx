import React from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import { contactInfo } from "../../assets/data";

const ContactPage = () => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <h1>{t(contactInfo.header.title)}</h1>
      <p>{t(contactInfo.header.description)}</p>

      {/* Contact Information */}
      <div className="contact-info">
        <div className="contact-details">
          <h2>{t("contact.phone.label")}</h2>
          <p>{t(contactInfo.phone)}</p>
          <h2>{t("contact.email.label")}</h2>
          <p>
            Email:{" "}
            <a href={`mailto:${t(contactInfo.email)}`}>
              {t(contactInfo.email)}
            </a>
          </p>
          <h2>{t("contact.address.label")}</h2>
          <p>{t(contactInfo.address)}</p>
        </div>
        <div className="social-links">
          <h2>{t("contact.followUs")}</h2>
          {contactInfo.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>{t("contact.form.name")}</h2>
        <form>
          {contactInfo.formInputs.map((input, index) =>
            input.type === "textarea" ? (
              <textarea
                key={index}
                placeholder={t(input.placeholder)}
                rows={input.rows}
                required={input.required}
              ></textarea>
            ) : (
              <input
                key={index}
                type={input.type}
                placeholder={t(input.placeholder)}
                required={input.required}
              />
            )
          )}
          <button type="submit">{t("contact.form.submit")}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
