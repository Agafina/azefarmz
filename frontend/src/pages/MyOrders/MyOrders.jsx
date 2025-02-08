import React, { useContext, useState } from "react";
import "./MyOrders.css";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { orders, fetchOrders, loading, error } = useContext(OrderContext);
  const [isFetching, setIsFetching] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  const handleFetchOrders = async () => {
    if (user) {
      setIsFetching(true);
      await fetchOrders(user._id);
      setIsFetching(false);
    }
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: "status-pending",
      processing: "status-processing",
      delivered: "status-delivered",
      cancelled: "status-cancelled",
    };
    return `status-badge ${
      statusClasses[status.toLowerCase()] || "status-default"
    }`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  const handlePaymentStatusClick = (transId) => {
    navigate(`/payment-status/${transId}`);
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">
            View and track all your orders in one place
          </p>
        </div>
        <button
          className={`refresh-button ${isFetching ? "loading" : ""}`}
          onClick={handleFetchOrders}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh Orders"}
        </button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th className="hide-mobile">Items</th>
                <th>Amount</th>
                <th className="hide-tablet">Delivery Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="order-row">
                    <td>#{order._id.slice(-6)}</td>
                    <td>
                      <span className={getStatusClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="hide-mobile">{order.items.length} items</td>
                    <td>XAF {order.amount.toFixed(2)}</td>
                    <td className="hide-tablet">
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.country}
                    </td>
                    <td>
                      <button
                        className="details-button"
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                      >
                        {expandedOrder === order._id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr className="order-details">
                      <td colSpan="6">
                        <div className="details-content">
                          <div className="details-section">
                            <h4>Delivery Address</h4>
                            <p>{order.deliveryAddress.street}</p>
                            <p>
                              {order.deliveryAddress.city},{" "}
                              {order.deliveryAddress.state}
                            </p>
                            <p>{order.deliveryAddress.country}</p>
                          </div>
                          <div className="details-section">
                            <h4>Payment Information</h4>
                            <div className="payment-info">
                              <p>
                                <span className="label">Payment Status:</span>
                                <span
                                  className={getStatusClass(
                                    order.paymentData.status
                                  )}
                                >
                                  {order.paymentData.status}
                                </span>
                              </p>
                              {order.paymentData.medium && (
                                <p>
                                  <span className="label">Payment Method:</span>
                                  {order.paymentData.medium}
                                </p>
                              )}
                              {order.paymentData.transId && (
                                <p>
                                  <span className="label">Transaction ID:</span>
                                  <span
                                    className="transaction-link"
                                    onClick={() =>
                                      handlePaymentStatusClick(
                                        order.paymentData.transId
                                      )
                                    }
                                    title="Click to check payment status"
                                  >
                                    {order.paymentData.transId}
                                    <div className="tooltip">
                                      Click to check payment status
                                    </div>
                                  </span>
                                </p>
                              )}
                              {order.paymentData.dateInitiated && (
                                <p>
                                  <span className="label">Payment Date:</span>
                                  {formatDate(order.paymentData.dateInitiated)}
                                </p>
                              )}
                              <p>
                                <span className="label">Payment Status:</span>
                                {order.paid ? "Paid" : "Not Paid"}
                              </p>
                            </div>
                          </div>
                          <div className="details-section">
                            <h4>Order Items</h4>
                            <div className="items-list">
                              {order.items.map((item) => (
                                <div key={item.productId} className="item">
                                  <span>{item._id}</span>
                                  <span>x {item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <h3>No orders found</h3>
          <p>When you make your first order, it will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
