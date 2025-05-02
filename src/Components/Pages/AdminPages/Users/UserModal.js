import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../Helper/BaseURL";
import { ApiResponseMessage } from "../../../Common/ApiResponse";
import {DANGER, SUCCESS} from "../../../../Helper/constent"
import { apiRequest } from "../../../../Helper/api";
const UserModal = ({ showPopup, handleClosePopup, editUser, onSuccess }) => {
    const [roleList, setRoleList] = useState([])
    const [formData, setFormData] = useState({
        id: "",
        userName: "",
        email: "",
        phoneNumber: "",
        role: 1, // default to Admin, can be dynamic if needed
    });
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch(BASE_URL + '/roleList');
            if (!response.ok) throw new Error("Failed to fetch users.");
            const data = await response.json();
            setRoleList(data.data.list);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        if (editUser) {
            setFormData({ ...editUser });
        } else {
            setFormData({
                id: "",
                username: "",
                email: "",
                phoneNumber: "",
                roleId: "1",
            });
        }
    }, [editUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const { username, email, phoneNumber, roleId } = formData;
    
        if (!username || !email || !phoneNumber || !roleId) {
            ApiResponseMessage("Please fill in all fields!", DANGER);
            return;
        }
    
        const token = localStorage.getItem("token"); // or wherever your token is stored
        const url = `${BASE_URL}/adminRegister`;
    
        const { success, data } = await apiRequest(url, "POST", formData);
    
        if (success) {
            onSuccess();
            ApiResponseMessage(data.message, SUCCESS);
            handleClosePopup();
        } else {
            ApiResponseMessage(data.message, DANGER);
        }
    };
    

    if (!showPopup) return null;

    return (
        <div className="admin-popup">
            <div className="admin-popup-content">
                <h3>{editUser ? "Edit User" : "Add New User"}</h3>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                >
                    {roleList.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.rolename}
                        </option>
                    ))}
                </select>
                <div className="admin-popup-buttons">
                    <button onClick={handleSubmit}>
                        {editUser ? "Update" : "Add"}
                    </button>
                    <button className="admin-cancel-btn" onClick={handleClosePopup}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
