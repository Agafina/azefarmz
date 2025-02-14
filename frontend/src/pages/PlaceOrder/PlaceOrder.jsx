import "./PlaceOrder.css";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const PlaceOrder = () => {
  const { t } = useTranslation();
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const { user } = useContext(AuthContext);
  const { createOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    medium: "",
    phone: "",
    message: "",
  });

  const [orderError, setOrderError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [user, navigate, getTotalCartAmount]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name in address) {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!user) {
      toast(t("placeorder.userNotAuthenticated"));
      return;
    }

    const orderItems = Object.values(cartItems).map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      user: user._id,
      address,
      items: orderItems,
      amount: getTotalCartAmount(),
      ...paymentInfo,
    };

    setIsProcessing(true);
    try {
      const response = await createOrder(orderData);

      if (!response.success) {
        setOrderError((response.message));
        setIsProcessing(false);
      } else {
        navigate(`/payment-status/${response.order.paymentData.transId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderError(t("placeorder.errorOccurred"));
      setIsProcessing(false);
    }
  };

  const renderInputField = (name, value, placeholder, type = "text") => {
    return (
      <div className="form-floating-field">
        <input
          required
          id={name}
          name={name}
          onChange={onChangeHandler}
          value={value}
          type={type}
          placeholder=" "
        />
        <label htmlFor={name}>{placeholder}</label>
      </div>
    );
  };

  return (
    <div className="place-order-container">
      <h1 className="page-title">{t("placeorder.checkoutTitle")}</h1>

      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <div className="section-card">
            <h2 className="section-title">
              {t("placeorder.deliveryInformation")}
            </h2>

            {renderInputField("street", address.street, t("placeorder.street"))}

            <div className="multi-fields">
              {renderInputField("city", address.city, t("placeorder.city"))}
              {renderInputField("state", address.state, t("placeorder.state"))}
            </div>

            <div className="multi-fields">
              {renderInputField(
                "zipcode",
                address.zipcode,
                t("placeorder.zipcode")
              )}
              {renderInputField(
                "country",
                address.country,
                t("placeorder.country")
              )}
            </div>
          </div>
        </div>

        <div className="place-order-right">
          <div className="section-card cart-total">
            <h2 className="section-title">{t("placeorder.orderSummary")}</h2>

            <div className="cart-total-content">
              <div className="cart-total-details">
                <p>{t("placeorder.subtotal")}</p>
                <p>XAF {getTotalCartAmount().toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>{t("placeorder.deliveryFee")}</p>
                <p>XAF {getTotalCartAmount() === 0 ? 0 : 0.0}</p>
              </div>
              <hr />
              <div className="cart-total-details total-row">
                <p>{t("placeorder.total")}</p>
                <p>
                  XAF{" "}
                  {getTotalCartAmount() === 0
                    ? 0
                    : (getTotalCartAmount() + 0.0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="payment-info">
              <h2 className="section-title">
                {t("placeorder.paymentInformation")}
              </h2>

              <div className="form-floating-field select-field">
                <select
                  required
                  id="medium"
                  name="medium"
                  onChange={onChangeHandler}
                  value={paymentInfo.medium}
                >
                  <option value="" disabled></option>
                  <option value="mobile money">
                    {t("placeorder.mobileMoney")}
                  </option>
                  <option value="orange money">
                    {t("placeorder.orangeMoney")}
                  </option>
                </select>
                <label htmlFor="medium">
                  {t("placeorder.selectPaymentMethod")}
                </label>
              </div>

              {renderInputField(
                "phone",
                paymentInfo.phone,
                t("placeorder.phoneNumber")
              )}

              <div className="form-floating-field textarea-field">
                <textarea
                  id="message"
                  name="message"
                  onChange={onChangeHandler}
                  value={paymentInfo.message}
                  placeholder=" "
                />
                <label htmlFor="message">
                  {t("placeorder.messageOptional")}
                </label>
              </div>

              {orderError && <p className="error">{orderError}</p>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span> {t("placeorder.processing")}
                </>
              ) : (
                t("placeorder.proceedToPayment")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
