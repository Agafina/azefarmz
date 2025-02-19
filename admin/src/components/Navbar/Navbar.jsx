import React from "react";
import { User, Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-[72px] bg-green-100 border-b border-green-100 px-6 flex items-center shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <Leaf className="text-green-600" size={32} />
          <div>
            <h1 className="text-xl font-semibold text-green-800">AzeFarm</h1>
            <p className="text-sm text-green-600">Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <span className="text-sm text-green-700 mr-2">Welcome, Admin</span>
          </div>
          <div className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors cursor-pointer">
            <User className="text-green-700" size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
