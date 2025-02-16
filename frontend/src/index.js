import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import "./i18n";
import { AuthContextProvider } from "./context/AuthContext";
import { OrderContextProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <OrderContextProvider>
          <StoreContextProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </StoreContextProvider>
        </OrderContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </HelmetProvider>
);
