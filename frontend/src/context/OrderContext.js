import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../hooks/useAxios";

// Create the Order Context
export const OrderContext = createContext();

// Order Context Provider
export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { loading, fetchRequest } = useAxios(); // Use the custom useAxios hook

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      const response = await fetchRequest(
        "api/orders/create",
        "POST",
        orderData
      );
      if (response.success) {
        toast.success("Order created successfully");
        return response; // Return order and payment intent details
      } else {
        // Show error message from backend
        throw new Error(response.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.message || "Failed to create order");
      toast.error(error.message || "Failed to create order");
    }
  };

  // Verify payment and update order status
  const verifyPayment = async (transId) => {
    try {
      const response = await fetchRequest(
        `api/orders/verify-payment/${transId}`,
        "GET"
      );
      if (response.success) {
        toast.success("Payment successful and order updated");
        return response;
      } else {
        throw new Error(response.message || "Failed to verify payment");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError(error.message || "Failed to verify payment");
      toast.error(error.message || "Failed to verify payment");
    }
  };

  // Fetch all orders for a user
  const fetchOrders = async (userId) => {
    try {
      const response = await fetchRequest(`api/orders/${userId}`, "GET");
      if (response.success) {
        setOrders(response.orders);
      } else {
        throw new Error(response.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message || "Failed to fetch orders");
      toast.error(error.message || "Failed to fetch orders");
    }
  };

  // Update order status (admin only)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetchRequest("api/orders/update-status", "PUT", {
        orderId,
        status,
      });
      if (response && response.success) {
        toast.success("Order status updated");
        return response; // Return updated order
      } else {
        throw new Error(response?.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(error.message || "Failed to update order status");
      toast.error(error.message || "Failed to update order status");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        verifyPayment,
        fetchOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use OrderContext in components
export const useOrderContext = () => useContext(OrderContext);
