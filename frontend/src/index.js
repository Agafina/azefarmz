import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import "./i18n";
import { AuthContextProvider } from "./context/AuthContext";
import { OrderContextProvider } from "./context/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
