import React, { useEffect, useContext } from "react";
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
import "./PaymentStatus.css";

const PaymentStatus = () => {
  const { transId } = useParams();
  const navigate = useNavigate();
  const { orders, verifyPayment, error, loading } = useContext(OrderContext);

  // Find the order with matching transaction ID
  const paymentData = orders?.find(
    (order) => order.paymentData.transId === transId
  )?.paymentData;

  useEffect(() => {
    verifyPayment(transId);
  }, []);

  const getStatusContent = () => {
    if (!paymentData) return null;

    const statusConfigs = {
      pending: {
        icon: <Clock className="status-icon pending" />,
        title: "Payment Pending",
        message:
          "Your payment is being processed. Please complete the payment on your device.",
        instructions: [
          "1. Wait for the payment prompt on your phone or Dial",
          "2. Select option 1 for My Account",
          "3. Enter your Mobile Money or Orange Money PIN",
          "4. Select option 1 to approve payment",
          `5. Enter reference: ${transId.slice(-6)}`,
        ],
      },
      created: {
        icon: <Loader2 className="status-icon loading" />,
        title: "Payment Initiated",
        message:
          "Your payment request has been created. Please wait for the payment prompt.",
      },
      success: {
        icon: <CheckCircle2 className="status-icon success" />,
        title: "Payment Successful",
        message:
          "Your payment has been successfully processed. Thank you for your purchase!",
      },
      failed: {
        icon: <XCircle className="status-icon failed" />,
        title: "Payment Failed",
        message:
          "We couldn't process your payment. Please try again or contact support.",
      },
      expired: {
        icon: <AlertCircle className="status-icon expired" />,
        title: "Payment Expired",
        message:
          "This payment request has expired. Please create a new payment.",
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
            <p className="amount">
              Amount: XAF{" "}
              {orders
                .find((order) => order.paymentData.transId === transId)
                ?.amount.toFixed(2)}
            </p>
            {paymentData.medium && (
              <div className="payment-method">
                <span className="method-icon">
                  {paymentData.medium.toLowerCase().includes("mobile") ? (
                    <Smartphone className="method-icon-svg" />
                  ) : (
                    <Phone className="method-icon-svg" />
                  )}
                </span>
                <span>{paymentData.medium}</span>
              </div>
            )}
          </div>
        )}

        {status === "pending" && config.instructions && (
          <div className="payment-instructions">
            <h3>Payment Instructions:</h3>
            <ul>
              {config.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Orders
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="payment-status-container loading">
        <Loader2 className="loading-spinner" />
        <p>Checking payment status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-status-container error">
        <XCircle className="error-icon" />
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Orders
        </button>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="payment-status-container error">
        <AlertCircle className="error-icon" />
        <p className="error-message">Payment not found</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Orders
        </button>
      </div>
    );
  }

  return <div className="payment-status-container">{getStatusContent()}</div>;
};

export default PaymentStatus;
