import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const apiEndpoint = "http://localhost:5000/menu";

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    try {
      if (isEditing) {
        await axios.put(`${apiEndpoint}/${form.id}`, form);
        alert("Menu item updated successfully!");
      } else {
        await axios.post(apiEndpoint, form);
        alert("Menu item added successfully!");
      }
      fetchMenuItems();
      setForm({
        id: null,
        name: "",
        category: "",
        price: "",
        description: "",
        imageUrl: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${apiEndpoint}/${id}`);
        fetchMenuItems();
        alert("Menu item deleted successfully!");
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      {/* Form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2>{isEditing ? "Edit Menu Item" : "Add Menu Item"}</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded col-span-2"
          />
          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() =>
                setForm({
                  id: null,
                  name: "",
                  category: "",
                  price: "",
                  description: "",
                  imageUrl: "",
                })
              }
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
      {/* Menu List */}
      <div>
        <h2 className="text-xl font-bold mb-2">Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>{item.category}</p>
              <p>${item.price.toFixed(2)}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
