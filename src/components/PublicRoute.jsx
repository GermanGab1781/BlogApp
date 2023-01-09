import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const {auth} = useAuth()
    return auth?.role === ("User" || "Admin") ?<Navigate to="/home"/>  :  children
}

export default PublicRoute;