import React from "react";
import {
  ShoppingCart,
  Package,
  Leaf,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminStats } from "../../context/AdminStatsContext";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const Home = () => {
  const { stats, loading, error } = useAdminStats();
  if (loading || error) {
    return <>Error or Loading</>
  }
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                XAF {stats.totalRevenue}
              </h3>
              <span className="text-green-500 text-sm flex items-center mt-2">
                <TrendingUp size={16} className="mr-1" /> +12.5%
              </span>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-1">{stats.totalOrders}</h3>
              <span className="text-blue-500 text-sm flex items-center mt-2">
                <Package size={16} className="mr-1" /> Processing {stats.activeOrders}
              </span>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Products in Stock</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-1">{stats.totalProducts}</h3>
              <span className="text-orange-500 text-sm flex items-center mt-2">
                <AlertCircle size={16} className="mr-1" /> {stats.lowStock} Low Stock
              </span>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Leaf className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                {stats.totalUsers}
              </h3>
              <span className="text-purple-500 text-sm flex items-center mt-2">
                <Users size={16} className="mr-1" /> +{stats.percentageIncrease}% This Month
              </span>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Overview
          </h2>
          <select className="border rounded-md px-3 py-1 text-sm text-gray-600">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Order #{Math.floor(Math.random() * 1000)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Organic Fertilizer x2
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">$89.99</p>
                  <p className="text-sm text-gray-500">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Low Stock Alert
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <AlertCircle className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Organic Seeds</p>
                    <p className="text-sm text-gray-500">Only 5 units left</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded-md hover:bg-green-50">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
