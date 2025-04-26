import React, { useState, useEffect } from "react";
import "./Feedback.css";
import { BASE_URL } from '../../../../Helper/BaseURL';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editFeedback, setEditFeedback] = useState(null);
    const [newFeedback, setNewFeedback] = useState({
        ratings: "",
        feedback_text: "",
        isActive: true
    });

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`${BASE_URL}/listFeedback`);
            if (!response.ok) throw new Error("Failed to fetch feedback data");

            const data = await response.json();
            setFeedbacks(data?.data?.list || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (editFeedback) {
            setEditFeedback((prev) => ({
                ...prev,
                [name]: name === "isActive" ? value === "true" : value
            }));
        } else {
            setNewFeedback((prev) => ({
                ...prev,
                [name]: name === "isActive" ? value === "true" : value
            }));
        }
    };

    const handleAddFeedback = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/addFeedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFeedback),
            });

            if (!response.ok) throw new Error("Failed to add feedback");

            fetchFeedbacks();
            closeModal();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleUpdateFeedback = async (e) => {
        e.preventDefault();

        if (!editFeedback) return;

        try {
            const response = await fetch(`${BASE_URL}/updateFeedback/${editFeedback.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFeedback),
            });

            if (!response.ok) throw new Error("Failed to update feedback");

            fetchFeedbacks();
            closeModal();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            const response = await fetch(`${BASE_URL}/deleteFeedback/${id}`, {
                method: "POST",
            });

            if (!response.ok) throw new Error("Failed to delete feedback");

            setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditFeedback(null);
        setNewFeedback({ ratings: "", feedback_text: "", isActive: true });
    };

    return (
        <div className="admin-feedback-container">
            <h2>Feedback List</h2>
            <button className="admin-add-btn" onClick={() => setShowModal(true)}>+ Add Feedback</button>

            {loading && <p>Loading feedback...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && feedbacks.length === 0 ? (
                <p>No feedback found</p>
            ) : (
                <table className="admin-feedback-table">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Ratings</th>
                            <th>Feedback</th>
                            {/* <th>Is Active</th> */}
                            <th>Created At</th>
                            {/* <th>Updated At</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                {/* <td>{feedback.id}</td> */}
                                <td>{feedback.ratings}</td>
                                <td>{feedback.feedback_text}</td>
                                {/* <td>{feedback.isActive ? "True" : "False"}</td> */}
                                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                                {/* <td>{new Date(feedback.updatedAt).toLocaleString()}</td> */}
                                <td>
                                    <button
                                        className="admin-edit-btn"
                                        onClick={() => { setEditFeedback(feedback); setShowModal(true); }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="admin-delete-btn"
                                        onClick={() => handleDeleteFeedback(feedback.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="admin-modal">
                    <div className="admin-modal-content">
                        <h2>{editFeedback ? "Edit Feedback" : "Add Feedback"}</h2>
                        <form onSubmit={editFeedback ? handleUpdateFeedback : handleAddFeedback}>
                        {/* <input type="number" name="id" placeholder="ID" value={editFeedback ? editFeedback.id : newFeedback.id} onChange={handleChange} required /> */}
                            <input
                                type="number"
                                name="ratings"
                                placeholder="Rating (1-5)"
                                value={editFeedback ? editFeedback.ratings : newFeedback.ratings}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="feedback_text"
                                placeholder="Feedback"
                                value={editFeedback ? editFeedback.feedback_text : newFeedback.feedback_text}
                                onChange={handleChange}
                                required
                            />
                            {/* <select
                                name="isActive"
                                value={editFeedback ? editFeedback.isActive : newFeedback.isActive}
                                onChange={handleChange}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select> */}
                            <div className="admin-modal-buttons">
                                <button type="submit" className="admin-save-btn">
                                    {editFeedback ? "Update" : "Save"}
                                </button>
                                <button type="button" className="admin-close-btn" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;


