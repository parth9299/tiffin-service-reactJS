import React, { useState, useEffect } from "react";
import "./tiffin.css";
import { BASE_URL } from "../../../../Helper/BaseURL";
import DataView from "../../../Common/Table/CommonTable";
import Breadcrumb from "../../../Common/Table/Breadcrumb";
import { Button, FormGroup, Input, Label } from "reactstrap";
import AddTiffinModal from "./AddTiffinModal";
import { DeleteSvg, EditSvg } from "../../../../Helper/iconHelper";
import { ApiResponseMessage, commonConfirmBox } from "../../../Common/ApiResponse";
import { DANGER, SUCCESS } from "../../../../Helper/constent";
import { apiRequest } from "../../../../Helper/api";
import CommonPagination from "../../../Common/Pagination"
const TiffinService = () => {
  const [tiffin, setTiffin] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    fetchUsers();
  }, [currentPage,dataPerPage,searchData]);

  const dispatchData = {
    searchText: searchData,
    pagination: {
      limit: dataPerPage,
      page: currentPage,
      orderKey: "createdDate",
      orderBy: "ASC",
    },
  };
  const fetchUsers = async () => {
    try {
      const response = await apiRequest(BASE_URL + '/listTiffin', "POST", dispatchData);
      if (!response.success) throw new Error("Failed to fetch users.");
      setTiffin(response.data.data.list);
      setTotalRecords(response.data.data.totalRecords)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEdit(user);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const message = "Are you sure you want to delete this tiffin?"

    const response = await commonConfirmBox(message);

    if (response) {
      const url = `${BASE_URL}/deleteTiffin/${id}`;
      const { success, data } = await apiRequest(url, "POST");
      if (success) {
        fetchUsers();
        ApiResponseMessage(data.message, SUCCESS);
      } else {
        ApiResponseMessage(data.message, DANGER);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEdit(null);
  };
  const handleUpdateStatus = async (value) => {

    const message = value.availabilityStatus === "Out of Stock"
      ? "The tiffin is currently out of stock. Would you like to mark it as available?"
      : "The tiffin is currently available. Would you like to mark it as out of stock?";

    const response = await commonConfirmBox(message);

    if (response) {
      const newStatus = value.availabilityStatus === "Out of Stock" ? "In Stock" : "Out of Stock";
      const url = `${BASE_URL}/temporaryUnavailable`;
      const { success, data } = await apiRequest(url, "POST", {
        id: value.id,
        temporaryUnavailable: newStatus === "Out of Stock" ? false : true
      });
      if (success) {
        fetchUsers();
        ApiResponseMessage(data.message, SUCCESS);
      } else {
        ApiResponseMessage(data.message, DANGER);
      }
    }
  };


  const columns = [

    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      width: 150,
      render: (url) => (
        <>
          <img src={url} alt="Tiffin" style={{ width: 80, height: 60, objectFit: 'cover' }} />
        </>
      ),
    }, {
      title: 'Tiffin Name',
      dataIndex: 'tiffinName',
      key: 'tiffinName',
      width: 200,
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: text => (
        <div className="tiffin-desc">
          {text}
        </div>
      )
    },

    {
      title: 'Type',
      dataIndex: 'tiffinType',
      key: 'tiffinType',
      width: 150,
    },
    {
      title: 'Size',
      dataIndex: 'tiffinSize',
      key: 'tiffinSize',
      width: 100,
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    // {
    //   title: 'Availability',
    //   dataIndex: 'availabilityStatus',
    //   key: 'availabilityStatus',
    //   width: 150,
    // },
    {
      title: 'Availability',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      width: 100,
      render: (value, row) => <>
        <div className="switch">
          <input
            type="checkbox"
            checked={value === "In Stock"}
            readOnly
          />
          <label
            className="switch-check"
            onClick={() => {
              handleUpdateStatus(row);
            }}
          >
            <div className={`switch-btn ${value !== "In Stock" ? 'de-active' : ''}`}></div>
            <div className={`active-switch ${value === "In Stock" ? 'active' : ''}`}>
              In Stock
            </div>
            <div className={`deactive-switch ${value !== "In Stock" ? 'deactive' : ''}`}>
              Out of Stock
            </div>
          </label>
        </div>
      </>
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (tiffin) => (
        <>

          <button className="admin-edit-btn" onClick={() => handleEdit(tiffin)}>
            <EditSvg />
          </button>
          <button className="admin-delete-btn" onClick={() => handleDelete(tiffin.id)}>
            <DeleteSvg />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-table-container tiffin">
      <Breadcrumb title={'Tiffin'} button={<Button className="admin-add-user-btn" color="primary" onClick={() => setShowPopup(true)}>+ Add Tiffin</Button>} />
      <DataView
        columns={columns}
        data={tiffin?.length > 0 ? tiffin : []}
      />
      <CommonPagination
        dataPerPage={dataPerPage}
        totalData={totalRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setDataPerPage={setDataPerPage}
      />
      {showPopup && (
        <AddTiffinModal
          showPopup={showPopup}
          handleClosePopup={handleClosePopup}
          editDetails={edit}
          onSuccess={fetchUsers} // callback to reload users after add/edit
        />
      )}

    </div>
  );
};

export default TiffinService;
