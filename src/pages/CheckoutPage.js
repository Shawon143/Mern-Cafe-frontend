import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async () => {
    if (
      !customerDetails.name ||
      !customerDetails.phone ||
      !customerDetails.address
    ) {
      alert("Please fill in all fields to proceed.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      })),
      totalPrice,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerAddress: customerDetails.address,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Order submission failed");
      }

      alert("Order confirmed!");
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <p className="mt-4">
          <a
            href="/menu"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Continue Shopping
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <ul className="divide-y">
            {cart.map((item) => (
              <li
                key={item._id}
                className="py-4 flex justify-between items-center"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <div className="mb-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Your Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Your Address"
              rows="3"
              required
            />
          </div>
          <button
            onClick={handleConfirmOrder}
            className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
