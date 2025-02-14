import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPopUp.css";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function LoginPopUp({ setShowLogin }) {
  const { login, register, error, logout, forgotPassword } =
    useContext(AuthContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (forgotPasswordMode) {
        await forgotPassword(data.email);
      } else if (activeTab === "login") {
        await login(data.email, data.password);
      } else {
        await register(data.name, data.email, data.password);
      }
      if (!error) {
        setShowLogin(false);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup-container">
        <button
          className="close-button"
          onClick={() => setShowLogin(false)}
          disabled={loading}
        >
          <X />
        </button>

        <div className="tabs">
          {!forgotPasswordMode && (
            <>
              <button
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
                disabled={loading}
              >
                {t("loginpopup.login")}
              </button>
              <button
                className={`tab ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
                disabled={loading}
              >
                {t("loginpopup.signup")}
              </button>
            </>
          )}
        </div>

        <form onSubmit={onSubmit} className="login-form">
          {!forgotPasswordMode && activeTab === "signup" && (
            <div className="form-group">
              <label htmlFor="name">{t("loginpopup.fullName")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{t("loginpopup.email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
              disabled={loading}
            />
          </div>

          {!forgotPasswordMode && (
            <div className="form-group">
              <label htmlFor="password">{t("loginpopup.password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                required
                disabled={loading}
              />
            </div>
          )}

          {activeTab === "login" && !forgotPasswordMode && (
            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPasswordMode(true);
                }}
              >
                {t("loginpopup.forgotPassword")}
              </a>
            </div>
          )}

          {activeTab === "signup" && !forgotPasswordMode && (
            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required disabled={loading} />
              <label htmlFor="terms">
                {t("loginpopup.termsAgreement")}
                <a href="#">{t("loginpopup.terms")}</a>
              </label>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading
              ? t("loginpopup.processing")
              : forgotPasswordMode
              ? t("loginpopup.resetPassword") // Translation for Reset Password
              : activeTab === "login"
              ? t("loginpopup.loginButton")
              : t("loginpopup.createAccount")}
          </button>

          {forgotPasswordMode && (
            <button
              type="button"
              className="back-button"
              onClick={() => setForgotPasswordMode(false)}
              disabled={loading}
            >
              {t("loginpopup.backToLogin")}
            </button>
          )}
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPopUp;
