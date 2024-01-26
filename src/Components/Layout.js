import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from './Login'

const Layout = () => {
  const context = useAuth();
//   useEffect(() => {
//     if (Object.keys(context.currentUser.length === 0)) {
//       navigate("/login");
//     }
//   });
    if (Object.keys(context.currentUser).length === 0) {
          return <Login />
    }
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
