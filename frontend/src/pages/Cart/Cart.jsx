import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Cart = () => {
  const { t } = useTranslation();
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    addToCart,
    clearCart,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      {/* Cart Items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="itemName">{t("cart.items")}</p>
          <p>{t("cart.title")}</p>
          <p>{t("cart.price")}</p>
          <p>{t("cart.quantity")}</p>
          <p>{t("cart.total")}</p>
          <p>{t("cart.adjust")}</p>
        </div>
        <br />
        <hr />
        {Object.values(cartItems).map((item) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img src={`${backendUrl}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>XAF {item.price.toFixed(2)}</p>
              <p>{item.quantity}</p>
              <p>XAF {(item.price * item.quantity).toFixed(2)}</p>
              <div className="cart-adjust">
                <span
                  onClick={() => removeFromCart(item._id, 1)}
                  className="adjust-btn adjust-minus"
                >
                  -
                </span>
                <span
                  onClick={() => addToCart(item, 1)}
                  className="adjust-btn adjust-plus"
                >
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
          <h2>{t("cart.cartTotal")}</h2>
          <div className="">
            <div className="cart-total-details">
              <p>{t("cart.subtotal")}</p>
              <p>XAF {getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("cart.deliveryFee")}</p>
              <p>XAF {getTotalCartAmount() === 0 ? 0 : 0.0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>{t("cart.total")}</b>
              <b>
                XAF
                {getTotalCartAmount() === 0
                  ? 0
                  : (getTotalCartAmount() + 0.0).toFixed(2)}
              </b>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="cart-buttons">
            <button
              onClick={() => navigate("/order")}
              disabled={getTotalCartAmount() === 0}
            >
              {t("cart.proceedToCheckout")}
            </button>
            <button
              onClick={clearCart}
              className="clear-cart-button"
              disabled={getTotalCartAmount() === 0}
            >
              {t("cart.clearCart")}
            </button>
          </div>
        </div>
        {/* Promo Code Section 
        <div className="cart-promocode">
          <div className="">
            <p>{t("cart.promoCodeMessage")}</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder={t("cart.promoCodePlaceholder")} />
              <button>{t("cart.submit")}</button>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default Cart;
