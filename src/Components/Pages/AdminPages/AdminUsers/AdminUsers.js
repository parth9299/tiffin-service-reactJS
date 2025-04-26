import React, { useState, useEffect } from "react";
import "./Orders.css";
import { BASE_URL } from "../../../../Helper/BaseURL";
import DataView from "../../../Common/Table/CommonTable";
import Breadcrumb from "../../../Common/Table/Breadcrumb";
import { Button } from "reactstrap";
import UserModal from "./UserModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", username: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  console.log({ users });

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

  

  // const handleAddUser = async () => {
  //   if (!newUser.id || !newUser.username || !newUser.email) {
  //     alert("Please fill in all fields!");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(BASE_URL + '/adminRegister', {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newUser),
  //     });
  //     if (response.ok) {
  //       fetchUsers();
  //       handleClosePopup();
  //     } else {
  //       console.error("Failed to add user.");
  //     }
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //   }
  // };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUser({ ...user });
    setShowPopup(true);
  };
  // const handleChange = (e) => {
  //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
  // };
  // const handleUpdateUser = async () => {
  //   if (!editUser) return;
  //   try {
  //     const response = await fetch(`${BASE_URL}/${editUser.id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newUser),
  //     });
  //     if (response.ok) {
  //       fetchUsers();
  //       handleClosePopup();
  //     } else {
  //       console.error("Failed to update user.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };

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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    }, {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
    }, {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 200,
      render: (user) => (<>
        {user.rolename}
      </>)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (user) => (
        <>
          {console.log(user, "user")}
          <button className="admin-edit-btn" onClick={() => handleEdit(user)}>
            Edit
          </button>
          <button className="admin-delete-btn" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-table-container">
      {/* <div className="d-flex justify-content-between">
        <h2> Users</h2>
        <button className="admin-add-user-btn" onClick={() => setShowPopup(true)}>+ Add User</button>
      </div> */}
      <Breadcrumb title={'Users'} button={<Button className="admin-add-user-btn" color="primary" onClick={() => setShowPopup(true)}>+ Add User</Button>} />
      <DataView
        columns={columns}
        data={users?.length > 0 ? users : []}
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
  <UserModal
    showPopup={showPopup}
    handleClosePopup={handleClosePopup}
    editUser={editUser}
    onSuccess={fetchUsers} // callback to reload users after add/edit
  />
)}

    </div>
  );
};

export default AdminUsers;
