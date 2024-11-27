// src/routes/ProtectedRoute.js

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { roles } from '../data/rolesPermissions';

const ProtectedRoute = ({ component: Component, requiredPermission, userRoleId, ...rest }) => {
    const userRole = roles.find((role) => role.id === userRoleId);

    // Redirect to Unauthorized Page if the user lacks required permission
    if (!userRole?.permissions.includes(requiredPermission)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
