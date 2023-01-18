import React from 'react';
import RegisterUser from '../components/RegisterUser';
import LoginUser from '../components/LoginUser';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
  useEffect(()=>{
    Swal.fire({icon:"info",title:"Attention",text:"It may take some time to respond to petitions at first."})
  })
  return (
    <div className='flex flex-col md:h-screen bg-blue-700 -mt-20'>
      <h1 className='text-center text-4xl font-semibold md:m-auto md:my-0 my-6'>Welcome to the Blog page App !!!</h1>
      <div className='flex md:flex-row flex-col place-content-evenly md:my-auto my-5'>
        <LoginUser/>
        <RegisterUser/>
      </div>
    </div>

  );
}

export default Login;
