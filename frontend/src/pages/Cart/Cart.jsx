import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, addToCart } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      {/* Cart Items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="itemName">Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Adjust</p>
        </div>
        <br />
        <hr />
        {Object.values(cartItems).map((item) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>{item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <div className="cart-adjust">
                <span
                  onClick={() => removeFromCart(item._id, 1)}
                  className="adjust-btn adjust-minus"
                >
                  -
                </span>
                <span onClick={() => addToCart(item, 1)} className="adjust-btn adjust-plus">
                  +
                </span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
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
          <button
            onClick={() => navigate("/order")}
            disabled={getTotalCartAmount() === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="cart-promocode">
          <div className="">
            <p>If you have a promo code, enter it here:</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
