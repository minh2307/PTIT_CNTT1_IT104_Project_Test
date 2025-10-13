import { Navigate, Outlet } from "react-router-dom";

type Prop = {
  allowedRoles?: string[];
};

export const PrivateRoute = ({ allowedRoles }: Prop) => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
