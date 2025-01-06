import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token } = response.data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole = payload.role;

      // Store token in localStorage
      localStorage.setItem("token", token);
      login(userRole); // Update global state

      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-teal-100 to-blue-100 p-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?
          <Link to="/register" className="text-teal-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
