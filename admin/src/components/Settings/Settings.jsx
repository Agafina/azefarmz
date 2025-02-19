import React, { useState } from "react";
import { Edit, Check, X } from "lucide-react";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "My E-commerce Store",
    email: "admin@store.com",
    currency: "USD",
    language: "English",
    timezone: "GMT",
    theme: "light",
    notifications: true,
    shippingMethod: "Standard",
    paymentMethod: "Stripe",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would save the form data to the server
    console.log("Settings saved", formData);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Account Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Theme Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Notification Settings
          </h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={(e) =>
                setFormData({ ...formData, notifications: e.target.checked })
              }
              className="mr-2"
              disabled={!isEditing}
            />
            <label className="text-sm text-gray-700">
              Enable notifications
            </label>
          </div>
        </div>

        {/* Shipping Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Preferences
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Method
            </label>
            <select
              name="shippingMethod"
              value={formData.shippingMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Payment Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="Stripe">Stripe</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            General Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!isEditing}
            >
              <option value="GMT">GMT</option>
              <option value="PST">PST</option>
              <option value="CST">CST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mt-6 flex justify-end">
        {isEditing ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveChanges}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              <Check size={16} className="mr-2" />
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Edit size={16} className="mr-2" />
            Edit Settings
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
