import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../config/GlobalContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useGlobalContext();

    if (!user.id) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;