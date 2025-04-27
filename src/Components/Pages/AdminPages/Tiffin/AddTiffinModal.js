import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ApiResponseMessage } from "../../../Common/ApiResponse";
import { DANGER, SUCCESS } from "../../../../Helper/constent";
import { apiRequest } from "../../../../Helper/api";
import { BASE_URL } from "../../../../Helper/BaseURL";
import { Col, FormGroup, Modal, ModalBody, Row } from "reactstrap";

const AddTiffinModal = ({ showPopup, handleClosePopup, editDetails, onSuccess }, args) => {

    const initialValues = {
        tiffinName: editDetails?.tiffinName || "",
        tiffinType: editDetails?.tiffinType || "",
        tiffinSize: editDetails?.tiffinSize || "",
        price: editDetails?.price || "",
        description: editDetails?.description || "",
        imageURL: [editDetails?.imageURL] || [],
    };

    const validationSchema = Yup.object({
        tiffinName: Yup.string().trim().required("Tiffin name is required"),
        tiffinType: Yup.string().required("Please select a tiffin type"),
        tiffinSize: Yup.string().required("Please select a tiffin size"),
        price: Yup.number().typeError("Price must be a number").positive("Price must be greater than zero").required("Please enter a price"),
        description: Yup.string().trim().required("Please provide a description"),
        imageURL: Yup.array()
        .min(1, "Please upload at least one image")
        .max(5, "You can upload up to 5 images")
        .required("Please upload at least one image"),
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
        const url = editDetails ? `${BASE_URL}/editTiffin/${editDetails.id}` : `${BASE_URL}/addTiffin`;
        const { success, data } = await apiRequest(url, "POST", dataToSend, true);
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
        // <div className="admin-popup modal">
        //     <div className=" modal-dialog modal-dialog-centered modal-dialog-scrollable">
        //         <div className="modal-content modal-lg p-2">
        //             <div className="modal-body">
        <Modal
            {...args}
            isOpen={showPopup}
            toggle={handleClosePopup}
            className={"p-2 tiffin"}
            size="lg"
            centered
        >
            <ModalBody>

                <h3>{editDetails?.id ? "Edit Tiffin" : " Add New Tiffin"}</h3>

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
                                        <ErrorMessage
                                            name="tiffinName"
                                            component="span"
                                            className="text-danger error"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
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
                                        <ErrorMessage
                                            name="tiffinType"
                                            component="span"
                                            className="text-danger error"
                                        />

                                    </FormGroup>
                                </Col>

                                <Col md={4}>
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
                                        <ErrorMessage
                                            name="tiffinSize"
                                            component="span"
                                            className="text-danger error"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            value={values.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="price"
                                            component="span"
                                            className="text-danger error"
                                        />
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
                                />  <ErrorMessage
                                    name="description"
                                    component="span"
                                    className="text-danger error"
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
                                <ErrorMessage
                                    name="imageURL"
                                    component="span"
                                    className="text-danger error"
                                />
                                  {values.imageURL?.length > 0 && (
                                    <div style={{ marginBottom: "15px" }}>
                                        <label>Current Images:</label><br />
                                        {values.imageURL.map((file, idx) => (
                                            <img
                                                key={idx}
                                                src={
                                                    typeof file === 'string'
                                                        ? file
                                                        : URL.createObjectURL(file)
                                                }
                                                alt={`Tiffin ${idx + 1}`}
                                                style={{ width: "100px", height: "80px", objectFit: "cover", margin: "5px" }}
                                            />
                                        ))}
                                    </div>
                                )}

                            </FormGroup>

                            <div className="admin-popup-buttons">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? (editDetails?.id ? "Updating..." : "Adding...")
                                        : (editDetails?.id ? "Update" : "Add")
                                    }
                                </button>

                                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </ModalBody>
            {/* </div>
                </div>
            </div>
        </div> */}
        </Modal>
    );
};

export default AddTiffinModal;
