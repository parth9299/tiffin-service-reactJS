import React, { useState, useEffect } from "react";
import "./Orders.css";
import { BASE_URL } from "../../../../Helper/BaseURL";
import DataView from "../../../Common/Table/CommonTable";
import Breadcrumb from "../../../Common/Table/Breadcrumb";
import { Button } from "reactstrap";
import AddTiffinModal from "./AddTiffinModal";

const TiffinService = () => {
  const [tiffin, setTiffin] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", username: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL + '/listTiffin');
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setTiffin(data.data.list);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUser({ ...user });
    setShowPopup(true);
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

  const columns = [
    {
      title: 'Tiffin Name',
      dataIndex: 'tiffinName',
      key: 'tiffinName',
      width: 200,
    },
    {
      title: 'Type',
      dataIndex: 'tiffinType',
      key: 'tiffinType',
      width: 150,
    },
    {
      title: 'Size',
      dataIndex: 'tiffinSize',
      key: 'tiffinSize',
      width: 100,
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: 'Availability',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      width: 150,
      render: (url) => (
        <>
          <img src={url} alt="Tiffin" style={{ width: 80, height: 60, objectFit: 'cover' }} />
        </>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (value) => (value ? 'Yes' : 'No'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (tiffin) => (
        <>
          <button className="admin-edit-btn" onClick={() => handleEdit(tiffin)}>
            Edit
          </button>
          <button className="admin-delete-btn" onClick={() => handleDelete(tiffin.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-table-container">
      <Breadcrumb title={'Tiffin'} button={<Button className="admin-add-user-btn" color="primary" onClick={() => setShowPopup(true)}>+ Add User</Button>} />
      <DataView
        columns={columns}
        data={tiffin?.length > 0 ? tiffin : []}
      />
      {/* {showPopup && (
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
      )} */}

      {showPopup && (
        <AddTiffinModal
          showPopup={showPopup}
          handleClosePopup={handleClosePopup}
          editUser={editUser}
          onSuccess={fetchUsers} // callback to reload users after add/edit
        />
      )}

    </div>
  );
};

export default TiffinService;
