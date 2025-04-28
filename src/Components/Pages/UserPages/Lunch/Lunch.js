import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lunch.css';
import { BASE_URL } from '../../../../Helper/BaseURL';
import Quentity from '../../../Common/Quentity';
import { apiRequest } from '../../../../Helper/api';
import { ApiResponseMessage } from '../../../Common/ApiResponse';
import { DANGER, SUCCESS } from '../../../../Helper/constent';

const Lunch = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const navigate = useNavigate(); // Hook for navigation
    const [dishes, setDishes] = useState([])
    const [quantity, setQuantity] = useState(1);
    const openModal = (dish) => {
        setSelectedDish(dish);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDish(null);
        setQuantity(1)
    };

    const handleSubscribe = () => {
        navigate('/subscriptionplan');
    };
    const fatchData = async () => {
        try {
            const response = await apiRequest(BASE_URL + '/tiffins', "POST", { type: "Lunch" });
            if (!response.success) throw new Error("Failed to fetch users.");
            setDishes(response.data.data.list);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        fatchData()
    }, [])
    const addToCart = async () => {
        try {
            const url = `${BASE_URL}/addCart`;
            const { success, data } = await apiRequest(url, "POST", { user_id: localStorage.getItem("userId"), tiffin_id: selectedDish.id, quantity });
            if (success) {
                ApiResponseMessage(data.message, SUCCESS);
            } else {
                ApiResponseMessage(data.message, DANGER);
            }
        } catch (error) {
            console.log(error, "error")
        }
    }

    return (
        <>
            <div className="menu-container">
                <h2>LUNCH</h2>
                <div className="breakfast-menu-grid">
                    {dishes.map((dish) => (
                        <div className="menu-item" key={dish.day} onClick={() => openModal(dish)}>
                            <img src={dish.imageURL} alt={dish.tiffinName} />
                            <div className="day">{dish.tiffinName}</div>
                            {/* <div className="dish">{dish.tiffinName}</div> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedDish && (
                <div className="modal-overlay bg-light">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>✖</button>
                        <div className="modal-left">
                            <img src={selectedDish.imageURL} alt='' />
                            <h3>{selectedDish.tiffinName}</h3>
                            <span className={selectedDish.availabilityStatus === 'In Stock' ? "text-success fw-bold" : 'fw-bold text-danger'}>{selectedDish.availabilityStatus}</span>
                            <Quentity quantity={quantity} setQuantity={setQuantity} />
                            <button disabled={selectedDish.availabilityStatus === "Out of Stock"} onClick={addToCart} className="add-to-cart">Add to Cart</button>
                        </div>
                        <div className="modal-right">
                            <h4>Description:</h4>
                            <p>{selectedDish.description}</p>
                            {/* <img src={assets.rating_stars} alt='' /> */}
                            <h4>Price: {selectedDish.price}</h4>
                            <button className="modal-subscribe" onClick={handleSubscribe}>Subscribe</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Lunch;
