import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    // Fetch menu items from the backend
    axios
      .get("http://localhost:5000/menu") // Adjust the URL to match your backend route
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.itemId === item._id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.itemId === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { itemId: item._id, name: item.name, price: item.price, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerName || !customerPhone) {
      alert("Please provide customer details");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotal(),
      customerName,
      customerPhone,
    };

    axios
      .post("http://localhost:5000/order", orderData)
      .then(() => {
        alert("Order placed successfully!");
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-500 font-bold">${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item.itemId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-lg font-bold mt-4">
              Total: ${calculateTotal().toFixed(2)}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              />
              <input
                type="text"
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
