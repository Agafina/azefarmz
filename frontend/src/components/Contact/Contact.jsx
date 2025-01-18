import React from "react";
import "./Contact.css";
import { contactInfo } from "../../assets/data";

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Contact Header */}
      <h1>{contactInfo.header.title}</h1>
      <p>{contactInfo.header.description}</p>

      {/* Contact Information */}
      <div className="contact-info">
        <div className="contact-details">
          <h2>Contact Information</h2>
          <p>Address: {contactInfo.address}</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>
            Email:{" "}
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
        </div>
        <div className="social-links">
          <h2>Follow Us</h2>
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
        <h2>Send Us a Message</h2>
        <form>
          {contactInfo.formInputs.map((input, index) =>
            input.type === "textarea" ? (
              <textarea
                key={index}
                placeholder={input.placeholder}
                rows={input.rows}
                required={input.required}
              ></textarea>
            ) : (
              <input
                key={index}
                type={input.type}
                placeholder={input.placeholder}
                required={input.required}
              />
            )
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
