import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const context = useAuth();
  // const navigate = useNavigate();
//   useEffect(() => {
//     if (Object.keys(context.currentUser.length === 0)) {
//       navigate("/login");
//     }
//   });
    if (Object.keys(context.currentUser).length === 0) {
      <Navigate to = "/login" />
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
