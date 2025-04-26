import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ApiResponseMessage } from "../../../Common/ApiResponse";
import { DANGER, SUCCESS } from "../../../../Helper/constent";
import { apiRequest } from "../../../../Helper/api";
import { BASE_URL } from "../../../../Helper/BaseURL";
import { Col, FormGroup, Row } from "reactstrap";

const AddTiffinModal = ({ showPopup, handleClosePopup, editUser, onSuccess }) => {
    const initialValues = {
        tiffinName: "",
        tiffinType: "",
        tiffinSize: "",
        price: "",
        availabilityStatus: "",
        description: "",
        imageURL: [],
    };

    const validationSchema = Yup.object({
        tiffinName: Yup.string().required("Required"),
        tiffinType: Yup.string().required("Required"),
        tiffinSize: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        availabilityStatus: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const dataToSend = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === "imageURL") {
                value.forEach((file) => dataToSend.append("imageURL", file));
            } else {
                dataToSend.append(key, value);
            }
        });

        const token = localStorage.getItem("token");
        const { success, data } = await apiRequest(
            `${BASE_URL}/addTiffin`,
            "POST",
            dataToSend,
            token,
            true
        );

        if (success) {
            onSuccess();
            ApiResponseMessage(data.message, SUCCESS);
            handleClosePopup();
            resetForm();
        } else {
            ApiResponseMessage(data.message, DANGER);
        }

        setSubmitting(false);
    };

    if (!showPopup) return null;

    return (
        <div className="admin-popup">
            <div className="admin-popup-content">
                <h3>Add New Tiffin</h3>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue, handleChange }) => (
                        <Form>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            name="tiffinName"
                                            placeholder="Tiffin Name"
                                            value={values.tiffinName}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <select
                                            name="tiffinType"
                                            value={values.tiffinType}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Tiffin Type</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Breakfast">Breakfast</option>
                                        </select>
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <select
                                            name="tiffinSize"
                                            value={values.tiffinSize}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Tiffin Size</option>
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            value={values.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <select
                                            name="availabilityStatus"
                                            value={values.availabilityStatus}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Availability</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows={4}
                                />
                            </FormGroup>

                            <FormGroup>
                                <input
                                    type="file"
                                    name="imageURL"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) =>
                                        setFieldValue("imageURL", Array.from(event.currentTarget.files))
                                    }
                                    className="form-control"
                                />
                            </FormGroup>

                            <div className="admin-popup-buttons">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? "Adding..." : "Add"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddTiffinModal;
