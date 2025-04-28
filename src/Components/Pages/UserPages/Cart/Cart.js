import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../../Helper/api';
import { BASE_URL } from '../../../../Helper/BaseURL';
import { DeleteSvg } from '../../../../Helper/iconHelper';
import DataView from '../../../Common/Table/CommonTable';
import { ApiResponseMessage, commonConfirmBox } from '../../../Common/ApiResponse';
import { DANGER, SUCCESS } from '../../../../Helper/constent';

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const fatchData = async () => {
    try {
      const response = await apiRequest(BASE_URL + '/cartList', "POST", { userId: localStorage.getItem("userId") });
      if (!response.success) throw new Error("Failed to fetch users.");
      setCartData(response.data.data.list);
      setTotalPrice(response.data.data.totalAmount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(() => {
    fatchData()
  }, [])
  const handleDelete = async (id) => {
    const message = "Are you sure you want to remove this item?"
    const response = await commonConfirmBox(message);
    if (response) {
      const url = `${BASE_URL}/deleteCart/${id}`;
      const { success, data } = await apiRequest(url, "POST");
      if (success) {
        fatchData();
        ApiResponseMessage(data.message, SUCCESS);
      } else {
        ApiResponseMessage(data.message, DANGER);
      }
    }
  };
  const handleQuantityChange = async (tiffinId, id, quantity) => {

    const url = `${BASE_URL}/updateCart/${id}`;
    const { success, data } = await apiRequest(url, "POST", { quantity, tiffin_id: tiffinId });
    if (success) {
      fatchData();
      ApiResponseMessage(data.message, SUCCESS);
    } else {
      ApiResponseMessage(data.message, DANGER);
    }

  };
  const columns = [
    {
      title: 'Image',
      dataIndex: 'Tiffin',
      key: 'image',
      width: 100,
      render: (tiffin) => (
        <img
          src={tiffin?.imageURL}
          alt={tiffin?.tiffinName}
          style={{ width: 80, height: 60, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: ['Tiffin', 'tiffinName'],
      key: 'title',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price) => <>₹{price}</>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (quantity, record) => (
        <div className='quantity-container' style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          {console.log(record, "recordrecord")}
          <button className='decrease' onClick={() => handleQuantityChange(record.tiffinId, record.id, quantity - 1)} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button className='increase' onClick={() => handleQuantityChange(record.tiffinId, record.id, quantity + 1)}>+</button>
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      render: (totalPrice) => <>₹{totalPrice}</>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (data) => (
        <>
          {/* <button className="admin-edit-btn" onClick={() => handleEdit(data)}>
            <EditSvg />
          </button> */}
          <button className="admin-delete-btn"
            onClick={() => handleDelete(data.id)}
          >
            <DeleteSvg />
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="cart">
        {/* <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {cartData?.map((item) => (
            <div className="cart-items-item" key={item.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              alignItems: 'center',
              padding: '10px 0'
            }}>
              <div style={{ width: '100px' }}>
                <img src={item?.Tiffin?.imageURL} alt={item?.Tiffin?.tiffinName} style={{
                  width: '80px',
                  height: '60px',
                  objectFit: 'cover'
                }} />
              </div>
              <p>{item?.Tiffin?.tiffinName}</p>
              <p>₹{item?.price}</p>
              <p>{item?.quantity}</p>
              <p>₹{item?.totalPrice}</p>
              <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}
        </div> */}
        <DataView
          columns={columns}
          data={cartData?.length > 0 ? cartData : []}
        />
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>₹{totalPrice}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹0 </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{totalPrice} </p>
              </div>
            </div>
            <button
              onClick={() =>
                navigate('/placeorder', { state: { totalPrice } })
              }
            >
              Proceed to Checkout
            </button>

          </div>
          {/* <div className="cart-promocode">
            <div>
              <p>If you have Promo Code, Enter Here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
