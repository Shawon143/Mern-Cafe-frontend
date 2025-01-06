import React from "react";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We will process it shortly.
      </p>
      <Link to="/menu" className="bg-blue-500 text-white py-2 px-4 rounded">
        Back to Menu
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
