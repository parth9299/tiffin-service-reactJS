import React, { useState, useEffect } from "react";
import "./Orders.css";
import { BASE_URL } from "../../../../Helper/BaseURL";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", username: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL + '/adminList');
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(data.data.list); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (!newUser.id || !newUser.username || !newUser.email) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await fetch(BASE_URL + '/adminRegister', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        handleClosePopup();
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUser({ ...user }); 
    setShowPopup(true);
  };

  const handleUpdateUser = async () => {
    if (!editUser) return;
    try {
      const response = await fetch(`${BASE_URL}/${editUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        handleClosePopup();
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`${BASE_URL}/adminDelete/${id}`, { method: "POST" });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditUser(null);
    setNewUser({ id: "", username: "", email: "" });
  };

  return (
    <div className="admin-table-container">
      <h2>Order Information</h2>
      <button className="admin-add-user-btn" onClick={() => setShowPopup(true)}>+ Add User</button>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length>0 && users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="admin-edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                <button className="admin-delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="admin-popup">
          <div className="admin-popup-content">
            <h3>{editUser ? "Edit User" : "Add New User"}</h3>
            <input
              type="text"
              name="id"
              placeholder="User ID"
              value={newUser.id}
              onChange={handleChange}
              disabled={!!editUser} 
            />
            <input  
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
            />
            <div className="admin-popup-buttons">
              <button onClick={editUser ? handleUpdateUser : handleAddUser}>
                {editUser ? "Update" : "Add"}
              </button>
              <button className="admin-cancel-btn" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
