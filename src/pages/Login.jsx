import React from 'react';
import RegisterUser from '../components/RegisterUser';
import LoginUser from '../components/LoginUser';

const Login = () => {
  return (
    <div className='flex flex-col md:h-screen bg-amber-500 -mt-20'>
      <h1 className='text-center text-4xl font-semibold md:m-auto md:my-0 my-6'>Welcome to the Blog page App !!!</h1>
      <div className='flex md:flex-row flex-col place-content-evenly md:my-auto my-5'>
        <LoginUser/>
        <RegisterUser/>
      </div>
    </div>

  );
}

export default Login;
