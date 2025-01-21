import React from "react";
import "./Footer.css";
import { footer } from "../../assets/data"; // Import footer data
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Aze Farms Logo" />
          <p>{t(footer.description)}</p> {/* Translated description */}
          <div className="footer-social-icons">
            <h2>{t(footer.titles.followUs)}</h2> {/* Translated "Follow Us" */}
            <ul>
              {footer.socialMediaLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                  >
                    {social.icon}{" "}
                    {/* This will be a placeholder for social media icon */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>{t(footer.titles.company)}</h2> {/* Translated "Company" */}
          <ul>
            {footer.footerLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{t(link.name)}</a>{" "}
                {/* Translated footer links */}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>{t(footer.titles.getInTouch)}</h2>{" "}
          {/* Translated "Get in Touch" */}
          <ul>
            {footer.contact.map((item) => (
              <li key={item.type}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.icon} {t(item.label)}: {item.value}{" "}
                  {/* Translated contact labels */}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; Aze Farms. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
