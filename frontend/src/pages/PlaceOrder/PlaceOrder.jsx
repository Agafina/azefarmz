import "./PlaceOrder.css";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
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
      alert("User not authenticated. Please log in.");
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
      console.log("Response", response)

      if (!response.success) {
        setOrderError("Order Placement Failed");
        setIsProcessing(false);
      } else {
        navigate(`/payment-status/${response.order.paymentData.transId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderError("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={address.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={address.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={address.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={address.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={address.country}
            type="text"
            placeholder="Country"
          />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>XAF {getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>XAF {getTotalCartAmount() === 0 ? 0 : 0.0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                XAF
                {getTotalCartAmount() === 0
                  ? 0
                  : (getTotalCartAmount() + 0.0).toFixed(2)}
              </b>
            </div>
          </div>

          <div className="payment-info">
            <p className="title">Payment Information</p>
            <select
              required
              name="medium"
              onChange={onChangeHandler}
              value={paymentInfo.medium}
            >
              <option value="">Select Payment Method</option>
              <option value="mobile money">Mobile Money</option>
              <option value="orange money">Orange Money</option>
            </select>
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={paymentInfo.phone}
              type="text"
              placeholder="Phone Number"
            />
            <textarea
              name="message"
              onChange={onChangeHandler}
              value={paymentInfo.message}
              placeholder="Message (optional)"
            />
            {orderError && <p className="error">{orderError}</p>}
          </div>

          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
