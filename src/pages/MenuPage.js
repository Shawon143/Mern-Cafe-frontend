import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]); // Store unique categories
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality

  const { addToCart } = useCart(); // Use addToCart from CartContext

  // Fetch menu items and extract categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        const items = response.data;
        setMenuItems(items);
        setFilteredItems(items);
        setCategories(["All", ...new Set(items.map((item) => item.category))]); // Extract unique categories
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, []);

  // Filter menu items based on selected filters and search query
  const filterItems = () => {
    let filtered = menuItems;

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Price filter
    if (priceFilter !== "All") {
      const priceRange = priceFilter.split("-");
      const minPrice = parseFloat(priceRange[0]);
      const maxPrice = parseFloat(priceRange[1]);

      filtered = filtered.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }

    // Search filter (case-insensitive)
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    filterItems();
  }, [categoryFilter, priceFilter, searchQuery]); // Add searchQuery to dependencies

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter("All");
    setPriceFilter("All");
    setSearchQuery(""); // Reset search query
    setFilteredItems(menuItems); // Reset to all items
  };

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-gray-600">
        Loading menu items...
      </p>
    );
  }

  return (
    <div className="p-6 md:p-12 bg-gradient-to-r from-teal-300 to-purple-600 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">
        Our Menu
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        {/* Search Bar */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
          />
        </div>

        <div className="flex gap-6">
          {/* Category Filter */}
          <select
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 sm:mb-0"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            className="bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 sm:mb-0"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="0-10">$0 - $10</option>
            <option value="10-50">$10 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors mt-4 sm:mt-0"
        >
          Clear Filters
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold text-teal-600">${item.price}</p>

            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
