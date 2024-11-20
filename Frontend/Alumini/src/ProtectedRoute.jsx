import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ allowedRoles, redirectPath = -1 }) => {
    const { user } = useContext(UserContext);
    // console.log('User:', user.email); // Debug log
    // console.log('Allowed Roles:', allowedRoles);

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
};


export default ProtectedRoute;
