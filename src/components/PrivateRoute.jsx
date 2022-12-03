import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';




const PrivateRoute = ({ children }) => {
    const { isLogged} = useAuthContext()
    return isLogged() === true ? children : <Navigate to="/login"/>
}

export default PrivateRoute;