import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import { OrderContext } from "../../context/OrderContext"; // Import OrderContext
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // Import Stripe hooks

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const { user } = useContext(AuthContext); // Access user data from AuthContext
  const { createOrder } = useContext(OrderContext); // Access createOrder from OrderContext
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null); // To handle Stripe CardElement errors

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

    const orderItems = Object.values(cartItems).map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      user: user._id, // Send user ID
      address,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Including delivery fee
    };

    console.log("Order Data being sent:", orderData); // Log the data to check if it's correct

    try {
      // Use the createOrder function from the OrderContext to place the order
      const response = await createOrder(orderData);

      if (response.success) {
        // Capture the paymentIntentId and clientSecret from the response
        const { paymentIntentId, clientSecret } = response;

        if (!stripe || !elements) {
          console.log("Stripe.js has not yet loaded.");
          return;
        }

        // Confirm the payment on the frontend using the clientSecret
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement), // Get the CardElement
            },
          }
        );

        if (error) {
          setCardError(error.message); // Set the error message to display to the user
          console.error("Payment failed:", error);
        } else {
          if (paymentIntent.status === "succeeded") {
            // If payment is successful, redirect to the payment confirmation page
            window.location.replace("/payment-success"); // You can customize this as needed
          }
        }
      } else {
        alert("Order Placement Failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!user || getTotalCartAmount() === 0) {
      navigate("/cart"); // Redirect to cart if user is not authenticated or cart is empty
    }
  }, [user, navigate, getTotalCartAmount]);

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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
