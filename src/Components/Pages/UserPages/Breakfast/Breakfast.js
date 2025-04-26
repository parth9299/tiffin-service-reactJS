import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../../../Assets/Images/assets';
import './Breakfast.css';

const Breakfast = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const dishes = [
        { day: "SUNDAY", name: "Bataka Pawa", img: assets.batakapawva, price: "₹ 40", description: 'Bataka Pawa is a spiced potato and flattened rice dish.' },
        { day: "MONDAY", name: "Dahi Vada", img: assets.daivada, price: "₹ 50", description: 'Dahi Vada is a lentil fritter soaked in yogurt and topped with chutneys.'},
        { day: "TUESDAY", name: "Idli Sambhar", img: assets.idlishambhar, price: "₹ 40", description: 'Idli Sambar is steamed rice cakes served with spicy lentil stew.' },
        { day: "WEDNESDAY", name: "Kachori", img: assets.kachori, price: "₹ 30", description: 'Kachori is a crispy, spicy stuffed pastry.' },
        { day: "THURSDAY", name: "Ragada Paties", img: assets.ragadapaties, price: "₹ 40", description: 'Ragada Patties are potato patties with spiced pea curry.'},
        { day: "FRIDAY", name: "Puttu And Curry", img: assets.puttu_and_curry, price: "₹ 60", description: 'Puttu and Curry is steamed rice cakes with spicy chickpea curry.'},
        { day: "SATURDAY", name: "Samosa", img: assets.samosa, price: "₹ 30", description: 'Samosa is a crispy pastry stuffed with spiced potatoes.'}
    ];

    const openModal = (dish) => {
        setSelectedDish(dish);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDish(null);
    };

    const handleSubscribe = () => {
        navigate('/subscriptionplan'); // Redirect to subscription page
    };

    return (
        <>
            <div className="menu-container">
                <h2>BREAKFAST</h2>
                <div className="breakfast-menu-grid">
                    {dishes.map((dish) => (
                        <div className="menu-item" key={dish.day} onClick={() => openModal(dish)}>
                            <img src={dish.img} alt={dish.name} />
                            <div className="day">{dish.day}</div>
                            <div className="dish">{dish.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedDish && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>✖</button>
                        <div className="modal-left">
                            <img src={selectedDish.img} alt='' />
                            <h3>{selectedDish.name}</h3>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                        <div className="modal-right">
                            <h4>Description:</h4>
                            <p>{selectedDish.description}</p>
                            <img src={assets.rating_stars} alt='' />
                            <h4>Price: {selectedDish.price}</h4>
                            <button className="modal-subscribe" onClick={handleSubscribe}>Subscribe</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Breakfast;
