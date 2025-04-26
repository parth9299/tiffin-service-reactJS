import React from 'react';
import Navbar from '../AdminComponents/Navbar/Navbar';
import Sidebar from '../AdminComponents/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom'; // Import Outlet

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
};

export default AdminLayout;
