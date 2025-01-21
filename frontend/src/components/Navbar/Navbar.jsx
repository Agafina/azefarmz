import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { navbar } from "../../assets/data";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";  // Import useTranslation

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItemCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use translation hook

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} className="logo" alt="Aze Farms Logo" />
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        {navbar.items.map((item) => (
          <li key={item.id}>
            {item.external ? (
              <a
                href={item.path}
                onClick={() => setMenu(item.id)}
                className={menu === item.id ? "active" : ""}
              >
                {t(item.name)}  {/* Use translation here */}
              </a>
            ) : (
              <Link
                to={item.path}
                onClick={() => setMenu(item.id)}
                className={menu === item.id ? "active" : ""}
              >
                {t(item.name)}  {/* Use translation here */}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <Search size={20} className="search-icon" />
        </div>
        <div className="navbar-cart">
          {getTotalItemCount() > 0 && (
            <>
              <Link to="/cart">
                <ShoppingCart size={24} />
              </Link>
              <div className="dot">{getTotalItemCount()}</div>
            </>
          )}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>{t("auth.signIn")}</button> 
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" /> <p>{t("profile.orders")}</p>  {/* Translate "Orders" */}
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> <p>{t("profile.logout")}</p>  {/* Translate "Logout" */}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
