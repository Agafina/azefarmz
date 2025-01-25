import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { navbar } from "../../assets/data";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import LanguageSwitcher from "../../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItemCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" ref={menuRef}>
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="logo" alt="Aze Farms Logo" />
      </Link>

      {/* Menu Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        {navbar.items.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${menu === item.id ? "active" : ""}`}
            onClick={() => {
              setMenu(item.id);
              if (item.external) {
                window.location.href = item.path;
              } else {
                navigate(item.path);
              }
            }}
          >
            {t(item.name)}
          </li>
        ))}
        <li className="language-switcher">
          <LanguageSwitcher />
        </li>
      </ul>

      {/* Navbar Right Section */}
      <div className="navbar-right">
        <LanguageSwitcher />
        <div className="search-bar">
          <input type="text" placeholder={t("search.placeholder", "Search...")} />
          <Search size={20} className="search-icon" />
        </div>
        <button
          onClick={() => (token ? logout() : setShowLogin(true))}
          className="auth-button"
        >
          {token ? t("profile.logout") : t("auth.signIn")}
        </button>
      </div>

      {/* Always Visible Cart */}
      <div className="navbar-cart">
        <Link to="/cart">
          <ShoppingCart size={35} />
        </Link>
        {getTotalItemCount() > 0 && (
          <div className="dot">{getTotalItemCount()}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
