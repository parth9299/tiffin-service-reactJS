import React, { useState, useEffect } from "react";
import "./SubManagement.css";
import { BASE_URL } from '../../../../Helper/BaseURL';

const SubManagement = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: "", planName: "", description: "", planType: "", price: "", meals: "",
        createdAt: "", updatedAt: "", createdBy: "", updatedBy: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch(`${BASE_URL}/`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setSubscriptions(data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${BASE_URL}/${formData.id}` : BASE_URL;
        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            fetchSubscriptions();
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} subscription:`, error);
        }
        setFormData({ id: "", planName: "", description: "", planType: "", price: "", meals: "", createdAt: "", updatedAt: "", createdBy: "", updatedBy: "" });
        setIsEditing(false);
        setShowModal(false);
    };

    const handleEdit = (subscription) => {
        setFormData(subscription);
        setIsEditing(true);
        setShowModal(true);
    };

    const deleteSubscription = async (id) => {
        if (!window.confirm("Are you sure you want to delete this plan?")) return;
        try {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            fetchSubscriptions();
        } catch (error) {
            console.error("Error deleting subscription:", error);
        }
    };

    return (
        <div className="admin-subscription-container">
            <h2>Subscription Management</h2>
            <button className="admin-add-btn" onClick={() => setShowModal(true)}>+ Add Subscription</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Plan Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Meals</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 &&
                        subscriptions.map((sub) => (
                            <tr key={sub.id}>
                                <td>{sub.id}</td>
                                <td>{sub.planname}</td>
                                <td>{sub.plandescription}</td>
                                <td>{sub.plantype}</td>
                                <td>{sub.price}</td>
                                <td>{sub.meals_per_day}</td>
                                <td>{sub.createdAt}</td>
                                <td>{sub.updatedAt}</td>
                                <td>
                                    <button className="admin-edit-btn" onClick={() => handleEdit(sub)}>Edit</button>
                                    <button className="admin-delete-btn" onClick={() => deleteSubscription(sub.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {showModal && (
                <div className="admin-modal">
                    <div className="admin-modal-content">
                        <span className="admin-close-modal" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>{isEditing ? "Edit Subscription" : "Add Subscription"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Plan Name" value={formData.planName} onChange={(e) => setFormData({ ...formData, planName: e.target.value })} required />
                            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                            <input type="text" placeholder="Type" value={formData.planType} onChange={(e) => setFormData({ ...formData, planType: e.target.value })} required />
                            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                            <input type="text" placeholder="Meals" value={formData.meals} onChange={(e) => setFormData({ ...formData, meals: e.target.value })} required />
                            <button className="add-sub" type="submit">{isEditing ? "Update" : "Add"} Subscription</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubManagement;
