import React, { useState } from 'react'

export default function Quentity({quantity, setQuantity}) {

    const increaseQuantity = () => {
        console.log("object")
        setQuantity(prev => (prev < 10 ? prev + 1 : prev)); 
      };
    
      const decreaseQuantity = () => {
        if (quantity > 1) {
          setQuantity(prev => prev - 1);
        }
      };
    return (
        <>
            <div class="quantity-container">
                <button class="decrease" onClick={decreaseQuantity} >-</button>
                <input type="text" id="quantity" value={quantity} readonly />
                <button class="increase" onClick={increaseQuantity}>+</button>
            </div>
        </>
    )
}
