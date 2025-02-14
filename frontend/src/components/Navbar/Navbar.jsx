import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { navbar } from "../../assets/data";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "../../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalItemCount } = useContext(StoreContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuRef = useRef(null);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setDropdownOpen(false);
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
          <input
            type="text"
            placeholder={t("search.placeholder", "Search...")}
          />
          <Search size={20} className="search-icon" />
        </div>
        {/* Username Dropdown */}
        {user ? (
          <div className="user-dropdown">
            <button
              className="user-dropdown-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name} <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/myorders" className="dropdown-item">
                  {t("usernav.myOrders")}
                </Link>
                <Link to="/settings" className="dropdown-item">
                  {t("usernav.settings")}
                </Link>
                <button onClick={logout} className="dropdown-item">
                  {t("usernav.logout")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className="auth-button">
            {t("auth.signIn")}
          </button>
        )}
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
