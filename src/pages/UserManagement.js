import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserRole = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}/role`, {
        role: newRole,
      });
      alert("User role updated successfully!");
      setEditingUser(null);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>User ID: {user._id}</p>
            <p>Role: {user.role}</p>
            {editingUser === user._id ? (
              <div className="mt-2">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => updateUserRole(user._id)}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="ml-2 px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingUser(user._id);
                  setNewRole(user.role);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded flex items-center space-x-2"
              >
                <FaEdit />
                <span>Edit Role</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
