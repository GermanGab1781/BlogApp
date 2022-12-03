import axios from 'axios';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from '../context/authContext';

const Login = () => {
  const {isLogged,login} = useAuthContext();

  useEffect(()=>{
    //Swal.fire({title:'Attention',icon:'info',text:'This page was made with a free database, so it may take some time to react to petitions'})
  },[])
  
  console.log(isLogged())
  const handleLogin = e =>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    Swal.fire({title:"Login you in",text:"Please wait",icon:"question"})
    axios.post('https://librarycommerce-node-api.onrender.com/api/users/login',{email,password})
      .then((res)=>{
        login(res.data.username,res.data.userID,res.data.email)
        Swal.fire({title:"Login successful",icon:"success",timer:1500,showConfirmButton:false})
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
    <div className='flex flex-col h-screen w-screen bg-green-800'>
      <div className='my-auto'>
      <form onSubmit={handleLogin} className='m-auto flex flex-col xl:w-1/4 w-3/4 text-center'>
        <span className='text-3xl font-bond mb-2'>Login</span>
        <label>Email</label>
        <input type="email" name='email' className='border border-black text-center'/>
        <label>Contraseña</label>
        <input type="password" name='password' className='border border-black text-center'/>
        <button className='border border-black w-fit m-auto mt-5 p-2 hover:bg-black bg-slate-600 text-white' type='submit'>Log in</button>
      </form>

      <form onSubmit={handleRegister} className='m-auto mt-10 flex flex-col xl:w-1/4 w-3/4 text-center'>
        <span className='text-3xl font-bond mb-2'>Register</span>
        <label>Email</label>
        <input type="email" name='email' className='border border-black text-center'/>
        <label>Usuario</label>
        <input type="text" name='username' className='border border-black text-center'/>
        <label>Contraseña</label>
        <input type="password" name='password' className='border border-black text-center'/>
        <button className='border border-black w-fit m-auto mt-5 p-2 hover:bg-black bg-slate-600 text-white' type='submit'>Register</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
