import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios'
import Swal from 'sweetalert2';
const LOGIN_URL = '/api/users/login' 



const LoginUser = () => {
  const {setAuth, persist ,setPersist } = useAuth()
  const emailInputRef = useRef()
  const errorInputRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd])

  const togglePersist = () =>{
    setPersist(prev => !prev)
  }
  
  useEffect(()=>{
    localStorage.setItem("persist",persist)
  },[persist])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (response?.data !== undefined) {
        const accessToken = response?.data?.accessToken
        const role = response?.data?.Role
        const userId = response?.data?.UserId
        setAuth({ email, pwd, accessToken, role,userId })
        setEmail('')
        setPwd('')
        Swal.fire({ icon: "success", title: "Login successful" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex flex-col place-items-center text-black'>
      <p ref={errorInputRef} className={errMsg ? "bg-red-600 border border-red-700 opacity-100" : "opacity-0"} aria-live="assertive">
        {errMsg}
      </p>
      <h1 className='text-3xl '>Sign In</h1>
      <form className='flex flex-col gap-y-5 text-center my-auto' onSubmit={handleSubmit}>
        {/* Email */}
        <label htmlFor='Email'>Email</label>
        <input className='text-black'
          type='text'
          id='Email'
          ref={emailInputRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {/* Password */}
        <label htmlFor='Password'>Password</label>
        <input className='text-black'
          type='password'
          id='Password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <div>
          <input 
            type ='checkbox'
            id='persist'
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor='persist'>I trust this device</label>
        </div>
        <button className='bg-blue-500 p-4 text-white' type='submit'>Sign In</button>
      </form>
    </section>
  );
}

export default LoginUser;
