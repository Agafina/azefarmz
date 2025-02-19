import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Package,
  BarChart2,
  Settings,
  HelpingHand,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: PlusCircle, label: "Add Products", path: "/add" },
    { icon: List, label: "Product List", path: "/list" },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-white border-r border-green-100 w-64 min-h-screen transition-all duration-300 ease-in-out">
      <div className="py-8 px-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-green-100">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <HelpingHand size={20} />
              <span className="text-sm font-medium">Need Help?</span>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Contact support for assistance with your admin dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
