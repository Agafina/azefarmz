import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./LoginPopUp.css";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function LoginPopUp({ setShowLogin }) {
  const {
    login,
    register,
    error,
    logout,
    forgotPassword,
    resendOTP,
    verifyOTP,
  } = useContext(AuthContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
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
      } else if (otpMode) {
        const response = await verifyOTP(data.email, data.otp);
        if (response?.success) {
          setOtpMode(false);
          setShowLogin(true);
        }
      } else if (activeTab === "login") {
        await login(data.email, data.password);
        if (error === "Please verify your email first") {
          setOtpMode(true);
        } else if (!error) {
          setShowLogin(false);
        }
      } else {
        await register(data.name, data.email, data.password);
        setOtpMode(true);
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

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      await resendOTP(data.email);
      setResendTimer(30); // Restart timer
    }
  };

  // Countdown Timer Effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

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

        {!otpMode ? (
          <>
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
                  <button
                    className="link-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setForgotPasswordMode(true);
                    }}
                  >
                    {t("loginpopup.forgotPassword")}
                  </button>
                </div>
              )}

              {activeTab === "signup" && !forgotPasswordMode && (
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    disabled={loading}
                  />
                  <label htmlFor="terms">
                    {t("loginpopup.termsAgreement")}
                    <a href="/terms-and-conditions">{t("loginpopup.terms")}</a>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
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
          </>
        ) : (
          <>
            {/* OTP Verification Form */}
            <h3>{t("loginpopup.verifyOTP")}</h3>
            <form onSubmit={onSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="otp">{t("loginpopup.enterOTP")}</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={data.otp}
                  onChange={onChangeHandler}
                  required
                  maxLength="6"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? t("loginpopup.processing")
                  : t("loginpopup.verifyOTPButton")}
              </button>

              <button
                type="button"
                className="back-button"
                onClick={() => setOtpMode(false)}
                disabled={loading}
              >
                {t("loginpopup.backToLogin")}
              </button>

              <p className="resend-otp">
                {resendTimer > 0 ? (
                  `${t("loginpopup.resendOTPIn")} ${resendTimer}s`
                ) : (
                  <button
                    className="link-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResendOTP();
                    }}
                  >
                    {t("loginpopup.resendOTP")}
                  </button>
                )}
              </p>
            </form>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPopUp;
