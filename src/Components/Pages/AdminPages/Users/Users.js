import React, { useState, useEffect } from "react";
import "./Orders.css";
import { BASE_URL } from "../../../../Helper/BaseURL";
import DataView from "../../../Common/Table/CommonTable";
import Breadcrumb from "../../../Common/Table/Breadcrumb";
import { Button } from "reactstrap";
import UserModal from "./UserModal";
import { ApiResponseMessage, commonConfirmBox } from "../../../Common/ApiResponse";
import { apiRequest } from "../../../../Helper/api";
import { DANGER, SUCCESS } from "../../../../Helper/constent";
import { DeleteSvg, EditSvg } from "../../../../Helper/iconHelper";
import CommonPagination from "../../../Common/Pagination";

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", username: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchData, setSearchData] = useState("");
  
  useEffect(() => {
    fetchUsers();
  }, [currentPage, dataPerPage]);

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
      const { success, data } = await apiRequest(BASE_URL + '/userList', "POST", dispatchData);
      if (!success) throw new Error("Failed to fetch users.");
      setUsers(data.data.list);
      setTotalRecords(data.data.totalRecords)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUser({ ...user });
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const message = "Are you sure you want to delete this user?"
    const response = await commonConfirmBox(message);
    if (response) {
      const url = `${BASE_URL}/adminDelete/${id}`;
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
    setEditUser(null);
    setNewUser({ id: "", username: "", email: "" });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 150,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 180,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 250,
    },
 
  ];
  
  return (
    <div className="admin-table-container">
      <Breadcrumb title={'Users'} button={<Button className="admin-add-user-btn" color="primary" onClick={() => setShowPopup(true)}>+ Add User</Button>} />
      <DataView
        columns={columns}
        data={users?.length > 0 ? users : []}
      />
      <CommonPagination
        dataPerPage={dataPerPage}
        totalData={totalRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setDataPerPage={setDataPerPage}
      />
      {showPopup && (
        <UserModal
          showPopup={showPopup}
          handleClosePopup={handleClosePopup}
          editUser={editUser}
          onSuccess={fetchUsers} // callback to reload users after add/edit
        />
      )}

    </div>
  );
};

export default User;
