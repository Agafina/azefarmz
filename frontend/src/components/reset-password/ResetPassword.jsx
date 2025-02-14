import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import "./ResetPassword.css"; // Import the CSS file

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, error } = useContext(AuthContext); // Get resetPassword from context

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t("resetpassword.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, password);
      if (response.success) {
        setSuccessMessage(t("resetpassword.success"));
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>{t("resetpassword.title")}</h2>
      {successMessage ? (
        <p className="success-message">{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">{t("resetpassword.newPassword")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              {t("resetpassword.confirmPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading
              ? t("resetpassword.processing")
              : t("resetpassword.submit")}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
