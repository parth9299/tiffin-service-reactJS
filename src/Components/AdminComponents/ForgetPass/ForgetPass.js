import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { assets } from "../../../Assets/Images/assets";
import "./ForgetPass.css";
import { FormGroup } from "reactstrap";
import { DANGER, SUCCESS } from "../../../Helper/constent";
import { ApiResponseMessage } from "../../Common/ApiResponse";
import { apiRequest } from "../../../Helper/api";
import { BASE_URL } from "../../../Helper/BaseURL";
import { useNavigate, useParams } from "react-router-dom";

const ForgetPass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Reset Password Form Values:", values);
    const url = `${BASE_URL}/adminForgot`;
    const { success, data } = await apiRequest(url, "POST", { username: values.email });

    if (success) {
      ApiResponseMessage(data.message, SUCCESS);
      resetForm();
      navigate("/admin/login");
    } else {
      ApiResponseMessage(data.message, DANGER);
    }
    setSubmitting(false);
  };

  return (
    <div className="forget-password">
      <div className="forget-left-container" align="center">
        <div className="left-title">
          <h1>Tiffin Viffin</h1>
          <img src={assets.loginlogo} alt="Logo" />
          <h2>Forgot Password</h2>
          <h3>Signup to create, discover and connect with the global community</h3>
        </div>
      </div>

      <div className="forget-password-right-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <div className="forget-password-title">
                <h1>Forgot Password</h1>
              </div>

              <FormGroup>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  className="form-control"
                />
                <ErrorMessage name="email" component="span" className="text-danger error" />
              </FormGroup>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPass;
