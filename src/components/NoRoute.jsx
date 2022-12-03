import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';




const NoRoute = () => {
  return  <Navigate to="/">{Swal.fire({icon:"error",title:"Route not found",text:"You have been redirected"})}</Navigate>
}

export default NoRoute;