import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {
    const { isAuthenticated, loginRequest } = useSelector((state) => state.auth);

    if (loginRequest) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
