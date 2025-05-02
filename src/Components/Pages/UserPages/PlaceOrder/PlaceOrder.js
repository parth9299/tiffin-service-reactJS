import React, { useEffect, useRef, useState } from 'react';
import './PlaceOrder.css';
import { useLocation } from 'react-router-dom';
import { apiRequest } from '../../../../Helper/api';
import { BASE_URL } from '../../../../Helper/BaseURL';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Row } from 'reactstrap';
import axios from 'axios';
const PlaceOrder = () => {
  const [rzp, setRzp] = useState(null);
  const [address, setAddress] = useState("Vastral");
  const { state } = useLocation()
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  // useEffect(async () => {

  //   const options = {
  //     key: "rzp_test_gEREBntUWy5mmQ", // Replace with your actual Razorpay Key
  //     amount: state.totalPrice * 100, // Amount in paise (e.g., 50000 paise = ₹500)
  //     currency: "INR",
  //     name: "Tiffin Service ",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     // order_id: "order_XXXXXXXXXXXX", 
  //     handler: function (response) {
  //       console.log(response, "responseresponse")
  //       alert("Payment ID: " + response.razorpay_payment_id);
  //       alert("Order ID: " + JSON.stringify(response));
  //     },
  //     prefill: {
  //       name: userName,
  //       email: email,

  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office"
  //     },
  //     theme: {
  //       color: "#3399cc"
  //     }
  //   };

  //   const rzpInstance = new window.Razorpay(options);

  //   rzpInstance.on('payment.failed', function (response) {
  //     alert(`Payment Failed: ${response.error.description}`);
  //   });

  //   setRzp(rzpInstance);
  // }, []);

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   if (rzp) {
  //     const url = `${BASE_URL}/createOrder`;
  //     const { success, data } = await apiRequest(url, "POST", {
  //       totalPrice: state.totalPrice,
  //       userId: localStorage.getItem("userId"),
  //       address: address,
  //     });
  //     console.log(data, "data")
  //     rzp.open();
  //   } else {
  //     alert("Payment gateway not initialized");
  //   }
  // };
  const handlePayment = async (e) => {
    e.preventDefault();

    // 1. First hit your backend to create an order
    const url = `${BASE_URL}/createOrder`;
    const { success, data } = await apiRequest(url, "POST", {
      totalPrice: state.totalPrice,
      userId: userId,
      address: address, // sending address from user input
    });
    console.log(data.data, "data")
    if (success) {
      // 2. When backend returns Razorpay order details
      const options = {
        key: "rzp_test_gEREBntUWy5mmQ",
        amount: data.data.amount, // already in paise
        currency: data.data.currency,
        name: "Tiffin Service",
        description: "Tiffin Order Payment",
        image: "https://example.com/your_logo",
        order_id: data.data.orderId, // <-- Important: Pass orderId here
        handler: function (response) {
          // 3. After successful payment you should call another backend API to update your order with payment_id
          const paymentUpdateUrl = `${BASE_URL}/paymentSuccess`;
          apiRequest(paymentUpdateUrl, "POST", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });

          alert("Payment Successful!");
        },
        prefill: {
          name: userName,
          email: email,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on('payment.failed', function (response) {
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzpInstance.open();
    } else {
      alert('Failed to create order. Please try again.');
    }
  };
  return (
    <form className="place-order">
      <DeliveryForm />
      {/* <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className="multi-felids">
          <input type="text" placeholder="First Name" required></input>
          <input type="text" placeholder="Last Name" required></input>
        </div>
        <input type="textarea" placeholder="Address" required></input>
        <input type="text" placeholder="Street" required></input>
        <div className="multi-felids">
          <input type="text" placeholder="City" required></input>
          <input type="text" placeholder="State" required></input>
        </div>
        <div className="multi-felids">
          <input type="text" placeholder="Zip Code" required></input>
          <input type="text" placeholder="Country" required></input>
        </div>
        <input type="text" placeholder="Phone" required />
      </div> */}

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p> {state?.totalPrice || 0}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>0
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p> {state?.totalPrice || 0}
            </div>
          </div>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

const DeliveryForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  };

  const formikRef = useRef(null); // Create a ref to access Formik methods

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get("https://ipapi.co/json/");
        const { city, region, postal, country_name } = res.data;

        // Wait until formikRef is ready
        if (formikRef.current) {
          formikRef.current.setFieldValue("city", city || "");
          formikRef.current.setFieldValue("state", region || "");
          formikRef.current.setFieldValue("zipCode", postal || "");
          formikRef.current.setFieldValue("country", country_name || "");
        }
      } catch (err) {
        console.error("Failed to fetch location", err);
      }
    };

    fetchLocation();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="place-order-left">
        <h2>Delivery Information</h2>

        <Row className="multi-felids">
          <Col>
            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className="text-danger" />
          </Col>
          <Col>
            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className="text-danger" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Field
              as="textarea"
              name="address"
              placeholder="Address"
              style={{
                marginBottom: "15px",
                width: "100%",
                padding: "10px",
                border: "1px solid #c5c5c5",
                borderRadius: "4px",
              }}
            />
            <ErrorMessage name="address" component="div" className="text-danger" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Field type="text" name="street" placeholder="Street" />
            <ErrorMessage name="street" component="div" className="text-danger" />
          </Col>
        </Row>

        <Row className="multi-felids">
          <Col>
            <Field type="text" name="city" placeholder="City" />
            <ErrorMessage name="city" component="div" className="text-danger" />
          </Col>
          <Col>
            <Field type="text" name="state" placeholder="State" />
            <ErrorMessage name="state" component="div" className="text-danger" />
          </Col>
        </Row>

        <Row className="multi-felids">
          <Col>
            <Field type="text" name="zipCode" placeholder="Zip Code" />
            <ErrorMessage name="zipCode" component="div" className="text-danger" />
          </Col>
          <Col>
            <Field type="text" name="country" placeholder="Country" />
            <ErrorMessage name="country" component="div" className="text-danger" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Field type="text" name="phone" placeholder="Phone" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </Col>
        </Row>

        {/* <button type="submit">Submit</button> */}
      </Form>
    </Formik>
  );
};