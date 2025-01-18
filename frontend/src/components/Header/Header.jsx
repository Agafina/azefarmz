import React from "react";
import "./Header.css";
import { banner } from "../../assets/data";

const Header = () => {
  return (
    <div className="header">
      <div
        className="header-background"
        style={{
          backgroundImage: `url(${banner.image})`,
        }}
      >
        <div className="header-overlay"></div>
      </div>
      <div className="header-contents">
        <h1 className="header-title">{banner.title}</h1>
        <p className="header-description">{banner.description}</p>
        <div className="header-buttons">
          {banner.buttons.map((button) => (
            <a
              key={button.text}
              href={button.link}
              className={`header-button ${
                button.text === "Get Started"
                  ? "get-started-button"
                  : "explore-button"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
