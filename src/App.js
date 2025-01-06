import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./context/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { PrivateRoute } from "./context/PrivateRoute";

function App() {
  return (
    <CartProvider>
      {" "}
      <Router>
        <div className="font-sans text-gray-800 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/*     <Route path="/monster" element={<AdminDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} /> */}

              {/* Protect Dashboard Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <PrivateRoute role="user">
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
