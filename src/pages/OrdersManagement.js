import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const apiEndpoint = "http://localhost:5000/order";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${apiEndpoint}/${id}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      await axios.put(`${apiEndpoint}/${order._id}`, {
        ...order,
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <div>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded">
                <h3 className="text-lg font-bold">{order.customerName}</h3>
                <p>customer ID: {order.customerId}</p>
                <p>Order ID: {order._id}</p>
                <p>Phone: {order.customerPhone}</p>
                <p>Address: {order.customerAddress}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Status: {order.status}</p>
                <div className="flex justify-between mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
