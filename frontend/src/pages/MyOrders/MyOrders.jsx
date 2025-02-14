import React, { useContext, useState } from "react";
import "./MyOrders.css";
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const { t } = useTranslation();
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
      created: "status-pending",
      pending: "status-pending",
      processing: "status-processing",
      successful: "status-delivered",
      accepted: "status-delivered",
      expired: "status-cancelled",
      failed: "status-cancelled",
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
        <p>{t("myorders.loadingOrders")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{t(error)}</p>
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
          <h1 className="orders-title">{t("myorders.myOrders")}</h1>
          <p className="orders-subtitle">{t("myorders.viewAndTrackOrders")}</p>
        </div>
        <button
          className={`refresh-button ${isFetching ? "loading" : ""}`}
          onClick={handleFetchOrders}
          disabled={isFetching}
        >
          {isFetching ? t("myorders.refreshing") : t("myorders.refreshOrders")}
        </button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>{t("myorders.orderId")}</th>
                <th>{t("myorders.status")}</th>
                <th className="hide-mobile">{t("myorders.items")}</th>
                <th>{t("myorders.amount")}</th>
                <th className="hide-tablet">{t("myorders.deliveryAddress")}</th>
                <th>{t("myorders.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="order-row">
                    <td>#{order._id.slice(-6)}</td>
                    <td>
                      <span
                        className={getStatusClass(order.paymentData.status)}
                      >
                        {t(order.paymentData.status)}
                      </span>
                    </td>
                    <td className="hide-mobile">
                      {order.items.length} {t("myorders.items")}
                    </td>
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
                          ? t("myorders.hideDetails")
                          : t("myorders.viewDetails")}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr className="order-details">
                      <td colSpan="6">
                        <div className="details-content">
                          <div className="details-section">
                            <h4>{t("myorders.deliveryAddress")}</h4>
                            <p>{order.deliveryAddress.street}</p>
                            <p>
                              {order.deliveryAddress.city},{" "}
                              {order.deliveryAddress.state}
                            </p>
                            <p>{order.deliveryAddress.country}</p>
                          </div>
                          <div className="details-section">
                            <h4>{t("myorders.paymentInformation")}</h4>
                            <div className="payment-info">
                              <p>
                                <span className="label">
                                  {t("myorders.paymentStatus")}:
                                </span>
                                <span
                                  className={getStatusClass(
                                    order.paymentData.status
                                  )}
                                >
                                  {t(order.paymentData.status)}
                                </span>
                              </p>
                              {order.paymentData.medium && (
                                <p>
                                  <span className="label">
                                    {t("myorders.paymentMethod")}:
                                  </span>
                                  {order.paymentData.medium}
                                </p>
                              )}
                              {order.paymentData.transId && (
                                <p>
                                  <span className="label">
                                    {t("myorders.transactionId")}:
                                  </span>
                                  <span
                                    className="transaction-link"
                                    onClick={() =>
                                      handlePaymentStatusClick(
                                        order.paymentData.transId
                                      )
                                    }
                                    title={t(
                                      "myorders.clickToCheckPaymentStatus"
                                    )}
                                  >
                                    {order.paymentData.transId}
                                    <div className="tooltip">
                                      {t("myorders.clickToCheckPaymentStatus")}
                                    </div>
                                  </span>
                                </p>
                              )}
                              {order.paymentData.dateInitiated && (
                                <p>
                                  <span className="label">
                                    {t("myorders.paymentDate")}:
                                  </span>
                                  {formatDate(order.paymentData.dateInitiated)}
                                </p>
                              )}
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
          <h3>{t("myorders.noOrdersFound")}</h3>
          <p>
            {t("myorders.firstOrderMessage")}{" "}
            <a href="/products" className="transaction-link">
              {t("myorders.firstOrderLink")}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
