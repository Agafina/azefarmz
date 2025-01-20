import React from "react";
import "./Footer.css";
import { socialMediaLinks, contact, footerLinks } from "../../assets/data";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Aze Farms Logo" />
          <p>
            At Aze Farms, we are committed to sustainable and eco-friendly
            agriculture. Our mission is to deliver fresh and nutritious farm
            produce while fostering environmental stewardship and community
            growth.
          </p>
          <div className="footer-social-icons">
            <h2>FOLLOW US</h2>
            <ul>
              {socialMediaLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            {contact.map((item) => (
              <li key={item.type}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.icon} {item.value}
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
