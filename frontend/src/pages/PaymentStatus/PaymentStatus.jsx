import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
  Smartphone,
  Phone,
} from "lucide-react";
import { OrderContext } from "../../context/OrderContext";
import { useTranslation } from "react-i18next";
import "./PaymentStatus.css";

const PaymentStatus = () => {
  const { transId } = useParams();
  const navigate = useNavigate();
  const { verifyPayment, error, loading } = useContext(OrderContext);
  const { t } = useTranslation();
  const [paymentData, setPaymentData] = useState(null);
  const [amount, setAmount] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && transId) {
      hasFetched.current = true;
      const fetchData = async () => {
        const response = await verifyPayment(transId);
        setPaymentData(response.order.paymentData);
        setAmount(response.order.amount);
      };
      fetchData();
    }
  }, [transId, verifyPayment]);

  const getStatusContent = () => {
    if (!paymentData) return null;

    const statusConfigs = {
      pending: {
        icon: <Clock className="status-icon pending" />,
        title: t("payment.pending.title"),
        message: t("payment.pending.message"),
        instructions: t("payment.pending.instructions", {
          ref: transId.slice(-6),
        }).split("\n"),
      },
      created: {
        icon: <Loader2 className="status-icon loading" />,
        title: t("payment.created.title"),
        message: t("payment.created.message"),
      },
      successful: {
        icon: <CheckCircle2 className="status-icon success" />,
        title: t("payment.successful.title"),
        message: t("payment.successful.message"),
      },
      failed: {
        icon: <XCircle className="status-icon failed" />,
        title: t("payment.failed.title"),
        message: t("payment.failed.message"),
      },
      expired: {
        icon: <AlertCircle className="status-icon expired" />,
        title: t("payment.expired.title"),
        message: t("payment.expired.message"),
      },
    };

    const status = paymentData.status.toLowerCase();
    const config = statusConfigs[status];
    if (!config) return null;

    return (
      <div className="status-content">
        {config.icon}
        <h2>{config.title}</h2>
        <p className="status-message">{config.message}</p>

        {(status === "pending" || status === "created") && (
          <div className="payment-details">
            <p className="amount">{t("payment.amount", { amount })}</p>
            {paymentData.medium && (
              <div className="payment-method">
                <span className="method-icon">
                  {paymentData.medium.toLowerCase().includes("mobile") ? (
                    <Smartphone className="method-icon-svg" />
                  ) : (
                    <Phone className="method-icon-svg" />
                  )}
                </span>
                <span>
                  {t("payment.payment_method", { method: paymentData.medium })}
                </span>
              </div>
            )}
          </div>
        )}

        {status === "pending" && config.instructions && (
          <div className="payment-instructions">
            <h3>{t("payment.instructions_title")}</h3>
            <ul>
              {config.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="back-button" onClick={() => navigate("/myorders")}>
          <ArrowLeft size={16} />
          {t("payment.back_to_orders")}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="payment-status-container loading">
        <Loader2 className="loading-spinner" />
        <p>{t("payment.checking_status")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-status-container error">
        <XCircle className="error-icon" />
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate("/myorders")}>
          <ArrowLeft size={16} />
          {t("payment.back_to_orders")}
        </button>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="payment-status-container error">
        <AlertCircle className="error-icon" />
        <p className="error-message">{t("payment.not_found")}</p>
        <button className="back-button" onClick={() => navigate("/myorders")}>
          <ArrowLeft size={16} />
          {t("payment.back_to_orders")}
        </button>
      </div>
    );
  }

  return <div className="payment-status-container">{getStatusContent()}</div>;
};

export default PaymentStatus;
