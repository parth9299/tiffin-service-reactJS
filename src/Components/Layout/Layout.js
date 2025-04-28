import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../UserComponents/Header/Header';
import Footer from '../UserComponents/Footer/Footer';
import Login from '../UserComponents/Login/Login';

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      setShowLogin(true)
    }
  }, [token])
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} token={token} />}
      <Header setShowLogin={setShowLogin} />
      <div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
