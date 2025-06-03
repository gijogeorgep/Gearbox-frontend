import React from "react";
import UserContext from "../context/UserContext";

import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/adminlogin" />;
};

const SellerProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/sellerlogin" />;
};

export default ProtectedRoute;
export { SellerProtectRoute };
