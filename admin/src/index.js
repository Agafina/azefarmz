import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AdminStatsProvider } from "./context/AdminStatsContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderContextProvider } from "./context/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AdminStatsProvider>
      <ProductProvider>
        <OrderContextProvider>
          <App />
        </OrderContextProvider>
      </ProductProvider>
    </AdminStatsProvider>
  </BrowserRouter>
);
