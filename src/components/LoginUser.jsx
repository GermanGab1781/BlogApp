import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import UseAuth from '../hooks/useAuth';
import { axiosPrivate } from '../api/axios';
import Swal from 'sweetalert2';
import useRefreshToken from '../hooks/useRefreshToken';
const LOGIN_URL = '/api/users/login' 



const LoginUser = () => {
  const refresh = useRefreshToken()
  const { auth, setAuth, persist ,setPersist } = UseAuth()
  const emailInputRef = useRef()
  const errorInputRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

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
      const response = await axiosPrivate.post(LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
      );
      if (response?.data !== undefined) {
        const accessToken = response?.data?.accessToken
        const role = response?.data?.Role
        setAuth({ email, pwd, accessToken, role })
        setEmail('')
        setPwd('')
        setSuccess(true)
        Swal.fire({ icon: "success", title: "Login successful" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex flex-col place-items-center'>
      {success && <div>bruh</div>}
      <p ref={errorInputRef} className={errMsg ? "bg-red-600 border border-red-700 opacity-100" : "opacity-0"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form className='flex flex-col text-center place-items-center' onSubmit={handleSubmit}>
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
        <button type='submit'>Sign In</button>
        <div>
          <input 
            type ='checkbox'
            id='persist'
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor='persist'>I trust this device</label>
        </div>
      </form>
      <p>
        Not registered?<br />
        <NavLink className='underline' to="/home">Sign Up</NavLink><br />
        <button onClick={() => { console.log(auth) }}>Auth token</button><br />
        <button onClick={() => refresh()}>refresh</button><br />
      </p>
    </section>
  );
}

export default LoginUser;
