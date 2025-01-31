import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";

// import i18n (needs to be bundled ;))
import "./i18n";
import { AuthContextProvider } from "./context/AuthContext";
import { OrderContextProvider } from "./context/OrderContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "sk_test_51PI9O8DVsIqfAtOn8rl9nsa907dp9BFissmVOfaSICyJTU1wYRJax66O6MXqP1ivpO7TQNyHocbZQqtlLt11rRpm00RxDgLi7Z"
);  

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <StoreContextProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </StoreContextProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
