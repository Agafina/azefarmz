import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  TruckIcon,
  Search,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

const OrdersPage = () => {
  const { orders, loading, fetchOrders, updateOrderStatus } = useOrderContext();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, search, statusFilter, dateRange, sortConfig]);

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentData.status === statusFilter);
    }

    // Date range filter
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        return (
          orderDate >= new Date(dateRange.from) &&
          orderDate <= new Date(dateRange.to)
        );
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortConfig.key === "total") {
        return sortConfig.direction === "asc"
          ? a.total - b.total
          : b.total - a.total;
      }
      return 0;
    });

    setFilteredOrders(filtered);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      successful: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock size={16} />,
      processing: <Package size={16} />,
      shipped: <TruckIcon size={16} />,
      delivered: <CheckCircle2 size={16} />,
      successful: <CheckCircle2 size={16} />,
      cancelled: <XCircle size={16} />,
      failed: <XCircle size={16} />,
    };
    return icons[status] || <Package size={16} />;
  };

  const handleStatusUpdate = async (newStatus) => {
    if (selectedOrder) {
      await updateOrderStatus(selectedOrder.orderId, newStatus);
      setShowStatusDialog(false);
      setSelectedOrder(null);
      fetchOrders(); // Refresh orders
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <input
                type="date"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort("date")}
                  >
                    <span>Order Details</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort("total")}
                  >
                    <span>Total</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Order #{order.orderId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Calendar size={12} className="mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.paymentData.status.toLowerCase()
                      )}`}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.paymentData.status.toLowerCase())}
                        {order.paymentData.status.charAt(0).toUpperCase() +
                          order.paymentData.status.slice(1)}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    XAF {order.amount.toFixed()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowStatusDialog(true);
                      }}
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Select the new status for Order #{selectedOrder?.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleStatusUpdate("processing")}
                className={`flex items-center gap-2 ${
                  selectedOrder?.status === "processing"
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <Package size={16} />
                Processing
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusUpdate("shipped")}
                className={`flex items-center gap-2 ${
                  selectedOrder?.status === "shipped"
                    ? "ring-2 ring-purple-500"
                    : ""
                }`}
              >
                <TruckIcon size={16} />
                Shipped
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusUpdate("delivered")}
                className={`flex items-center gap-2 ${
                  selectedOrder?.status === "delivered"
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
              >
                <CheckCircle2 size={16} />
                Delivered
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusUpdate("cancelled")}
                className={`flex items-center gap-2 ${
                  selectedOrder?.status === "cancelled"
                    ? "ring-2 ring-red-500"
                    : ""
                }`}
              >
                <XCircle size={16} />
                Cancelled
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
