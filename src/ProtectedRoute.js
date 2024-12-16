import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ element: Component, ...rest }) {
  const location = useLocation();
  const authenticated = !!sessionStorage.getItem("authenticated");
  if (!authenticated) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Component {...rest} />;
}

export default ProtectedRoute;
