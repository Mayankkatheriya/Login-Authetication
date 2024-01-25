import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const context = useAuth();
  const navigate = useNavigate();
//   useEffect(() => {
//     if (Object.keys(context.currentUser.length === 0)) {
//       navigate("/login");
//     }
//   });
    if (Object.keys(context.currentUser.length === 0)) {
      <Navigate to = "/login" />
    }
  return (
    <>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default Layout;
