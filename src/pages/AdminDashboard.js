import React, { useState } from "react";
import { FaList, FaUtensils, FaRegUser } from "react-icons/fa";
import OrdersManagement from "./OrdersManagement";
import MenuManagement from "./MenuManagement";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <div className="text-2xl font-bold mb-6">Admin Dashboard</div>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "orders" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <FaList className="mr-2" />
            Orders
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "menu" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <FaUtensils className="mr-2" />
            Menu
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "users" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <FaRegUser className="mr-2" />
            Users
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "orders" && <OrdersManagement />}
        {activeTab === "menu" && <MenuManagement />}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
