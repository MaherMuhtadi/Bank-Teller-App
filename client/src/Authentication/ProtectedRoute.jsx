import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const employeeId = sessionStorage.getItem("employee_id");

    if (!employeeId) {
        return <Navigate to="/sign_in" replace />;
    }

    return children; // Render the child component if authenticated
};

export default ProtectedRoute;
