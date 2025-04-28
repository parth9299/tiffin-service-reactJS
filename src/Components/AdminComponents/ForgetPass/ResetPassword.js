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

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const { token } = useParams();
  const navigate = useNavigate()
  
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Reset Password Form Values:", values);
    const url = `${BASE_URL}/adminReset`;
    const { success, data } = await apiRequest(url, "POST", { newPassword: values.password, token });
    if (success) {
      ApiResponseMessage(data.message, SUCCESS);
      resetForm();
      navigate("/admin/login")
    } else {
      ApiResponseMessage(data.message, DANGER);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="forget-password">
        <div className="forget-left-container" align="center">
          <div className="left-title">
            <h1>Tiffin Viffin</h1>
            <img src={assets.loginlogo} alt="logo" />
            <h2>Reset Password</h2>
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
                  <h1>Reset Password</h1>
                </div>

                <FormGroup >
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={values.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="span" className="text-danger error" />
                </FormGroup>

                <FormGroup >
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <ErrorMessage name="confirmPassword" component="span" className="text-danger error" />
                </FormGroup>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
