import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../UserComponents/Header/Header';
import Footer from '../UserComponents/Footer/Footer';
import Login from '../UserComponents/Login/Login';

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
        <Header setShowLogin={setShowLogin} />
      <div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
