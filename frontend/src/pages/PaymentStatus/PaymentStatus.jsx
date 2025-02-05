import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import "./PaymentStatus.css";

const PaymentStatus = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment } = useOrderContext();

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");

    if (!paymentIntentId) {
      setStatus("error");
      setMessage("Invalid payment details.");
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await verifyPayment(paymentIntentId);

        if (response.success) {
          setStatus("success");
          setMessage("Payment successful! Your order has been placed.");
        } else {
          setStatus("failed");
          setMessage("Payment failed. Please try again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred while verifying payment.");
      }
    };

    checkPaymentStatus();
  }, [searchParams, verifyPayment]);

  return (
    <div className="payment-status">
      <h1>Payment Status for {searchParams.get("payment_intent")}</h1>
      {status === "loading" && <p>Verifying payment...</p>}
      {status === "success" && (
        <div className="status success">
          <p>{message}</p>
          <button onClick={() => navigate("/orders")}>View Orders</button>
        </div>
      )}
      {status === "failed" && (
        <div className="status failed">
          <p>{message}</p>
          <button onClick={() => navigate("/cart")}>Try Again</button>
        </div>
      )}
      {status === "error" && (
        <div className="status error">
          <p>{message}</p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
