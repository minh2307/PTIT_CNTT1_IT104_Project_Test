import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
