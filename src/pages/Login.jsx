import axios from 'axios';
import React from 'react';
import { useAuthContext } from '../context/authContext';

const Login = () => {
  const {isLogged,login,userInformation} = useAuthContext();
  
  console.log(isLogged())
  const handleLogin = e =>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log('sent')
    axios.post('https://librarycommerce-node-api.onrender.com/api/users/login',{email,password})
      .then((res)=>{
        console.log(res.data)
        console.log(res.data.username,res.data.userID,res.data.email)
        login(res.data.username,res.data.userID,res.data.email)
        console.log(userInformation())
      })
  }

  const handleRegister = e =>{
    e.preventDefault()
    const email = e.target.email.value
    const username = e.target.username.value
    const password = e.target.password.value
    axios.post('https://librarycommerce-node-api.onrender.com/api/users/register',{username,email,password})
      .then((res)=>{
        console.log(res)
      })
  }

  return (
    <div className='flex flex-col gap-y-10'>
      <form onSubmit={handleLogin} className='m-auto flex flex-col w-1/2 text-center'>
        <label>Email</label>
        <input type="email" name='email' className='border border-black'/>
        <label>Contraseña</label>
        <input type="password" name='password' className='border border-black'/>
        <button className='border border-black w-fit m-auto mt-5 p-2 hover:bg-black hover:text-white' type='submit'>Log in</button>
      </form>

      <form onSubmit={handleRegister} className='m-auto flex flex-col w-1/2 text-center'>
        <label>Email</label>
        <input type="email" name='email' className='border border-black'/>
        <label>Usuario</label>
        <input type="text" name='username' className='border border-black'/>
        <label>Contraseña</label>
        <input type="password" name='password' className='border border-black'/>
        <button className='border border-black w-fit m-auto mt-5 p-2 hover:bg-black hover:text-white' type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Login;
