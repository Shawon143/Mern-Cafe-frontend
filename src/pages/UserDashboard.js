import React, { useEffect, useState } from "react";
import { FaUser, FaHistory } from "react-icons/fa";
import axios from "axios";

const UserDashboard = () => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(data);
      setEditedProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/order/history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateProfile = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/profile",
        { username: editedProfile.username, email: editedProfile.email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProfile(data.user);
      setIsEditing(false);
      alert(data.message);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-4 py-2 rounded transition ${
              activeTab === "profile" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <FaUser className="mr-3" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center px-4 py-2 rounded transition ${
              activeTab === "orders" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <FaHistory className="mr-3" />
            Order History
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            {isEditing ? (
              <div className="bg-white shadow p-6 rounded">
                <input
                  type="text"
                  value={editedProfile.username}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      username: e.target.value,
                    })
                  }
                  placeholder="Username"
                  className="w-full mb-4 p-2 border rounded"
                />
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                  className="w-full mb-4 p-2 border rounded"
                />
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="bg-white shadow p-6 rounded">
                <p className="mb-2">
                  <strong>Username:</strong> {profile.username}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {profile.email}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-600">
              Order History
            </h2>
            {orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-lg rounded-lg border p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <p className="text-lg font-bold text-gray-800">
                        Order ID:{" "}
                        <span className="text-blue-600">{order._id}</span>
                      </p>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-medium ${
                            order.status === "Delivered"
                              ? "text-green-600"
                              : order.status === "Pending"
                              ? "text-yellow-600"
                              : order.status === "Processing"
                              ? "text-blue-600"
                              : order.status === "Out for Delivery"
                              ? "text-cyan-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                      <p>
                        <strong>Order Name:</strong> {order.customerName}
                      </p>
                      <p>
                        <strong>Number:</strong> {order.customerPhone}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.customerAddress}
                      </p>
                      <p>
                        <strong>Total:</strong>{" "}
                        <span className="text-blue-600 font-semibold">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        Items Ordered:
                      </h3>
                      <ul className="list-disc pl-6 text-gray-600">
                        {order.items.map((item) => (
                          <li key={item.itemId._id} className="mb-1">
                            {item.itemId.name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
