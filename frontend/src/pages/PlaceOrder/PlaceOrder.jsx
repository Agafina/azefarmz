import "./PlaceOrder.css";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const { user } = useContext(AuthContext);
  const { createOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!user || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [user, navigate, getTotalCartAmount]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found.");
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
      amount: getTotalCartAmount() + 2, // Including delivery fee
    };

    setIsProcessing(true);
    try {
      const response = await createOrder(orderData);

      if (response.success) {
        const { clientSecret } = response;

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        if (error) {
          setCardError(error.message);
          console.error("Payment failed:", error);
          setIsProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
          // Use current language from URL for redirection
          const currentLang = location.pathname.split("/")[1] || "en";
          // Navigate with language parameter and payment intent ID
          navigate(
            `/${currentLang}/payment-status?payment_intent=${paymentIntent.id}`
          );
        }
      } else {
        alert("Order Placement Failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    } finally {
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
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2.0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                $
                {getTotalCartAmount() === 0
                  ? 0
                  : (getTotalCartAmount() + 2.0).toFixed(2)}
              </b>
            </div>
          </div>

          <div className="card-payment">
            <p>Enter Payment Details</p>
            <CardElement />
            {cardError && <p className="error">{cardError}</p>}
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
