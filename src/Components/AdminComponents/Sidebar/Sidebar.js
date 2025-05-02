import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('/admin/dashboard');

  const handleNavigate = (path) => {
    navigate(path);
    setActiveItem(path);
  };
  const sidebarItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/user', label: 'User', icon: '🛍️' },
    { path: '/admin/admin-user', label: 'Admin User', icon: '🛍️' },
    { path: '/admin/tiffin', label: 'Tiffin', icon: '🛍️' },
    { path: '/admin/orders', label: 'Order', icon: '🛍️' },
    { path: '/admin/feedback', label: 'Feedback', icon: '💬' },
    { path: '/admin/submanagement', label: 'Subscription Management', icon: '📈' },
    { path: '/admin/subdetails', label: 'Subscription Details', icon: '📊' },
    { path: '/admin/paymentdetails', label: 'Payment Details', icon: '💸' },
    { path: '/admin/reportanalysis', label: 'Report and Analysis', icon: '🎯' },
  ];

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <h1>Tiffin Admin</h1>
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu">
      {sidebarItems.map((item) => (
        <div
          key={item.path}
          onClick={() => handleNavigate(item.path)}
          className={`sidebar-item ${activeItem === item.path ? 'active' : ''}`}
        >
          <span className="sidebar-icon">{item.icon}</span>
          <div className="sidebar-text" >
            {item.label}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;
