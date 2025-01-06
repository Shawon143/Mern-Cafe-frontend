import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout(navigate); // Pass the navigate function to logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const CartBadge = () => (
    <span
      className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 ${
        totalItems === 0 ? "hidden" : ""
      }`}
    >
      {totalItems}
    </span>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          CafeName
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-red-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-red-500 transition">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500 transition">
              Contact
            </Link>
          </li>
          {userRole === "admin" && (
            <li>
              <Link
                to="/admin-dashboard"
                className="hover:text-red-500 transition"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          {userRole === "user" && (
            <li>
              <Link
                to="/user-dashboard"
                className="hover:text-red-500 transition"
              >
                User Dashboard
              </Link>
            </li>
          )}
          {!userRole ? (
            <li>
              <Link to="/login" className="hover:text-red-500 transition">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </li>
          )}
          <li>
            <Link to="/cart" className="relative hover:text-red-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13.1M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <CartBadge />
            </Link>
          </li>
        </ul>
        <button
          className="md:hidden text-red-500 focus:outline-none"
          aria-label="Open Menu"
          onClick={toggleMenu}
        >
          <svg
            className={`w-6 h-6 transition-transform ${
              isMenuOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
