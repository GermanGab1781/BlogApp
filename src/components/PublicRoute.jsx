import React from 'react';
import { Navigate } from 'react-router-dom';
/* import { useAuthContext } from '../context/authContext'; */

const PublicRoute = ({ children }) => {
    /* const {isLogged} = useAuthContext()
    return isLogged() === false ? children : <Navigate to="/home"/> */
    return children
}

export default PublicRoute;