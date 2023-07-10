/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default LoginProtectedRoute;
