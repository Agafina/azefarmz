import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 8000 },
];

const Analytics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#10B981" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
