import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { userRole } = useAuth(); // Get login state from AuthContext
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (!userRole) {
      // If not logged in
      alert("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-700">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-700">$0.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-700">Total</span>
                <span className="font-bold text-lg text-gray-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 rounded-md transition"
              >
                Clear Cart
              </button>
              <Link
                to="/menu"
                className="block text-center mt-4 text-red-500 hover:text-red-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              to="/menu"
              className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Browse Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
