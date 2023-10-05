import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios'
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const LOGIN_URL = '/api/users/login'
const EMAIL_REGEX = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/


const LoginUser = () => {
  const { setAuth, persist, setPersist } = useAuth()
  const emailInputRef = useRef()
  const errorInputRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [wait, setWait] = useState(false)
  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd])

  const togglePersist = () => {
    if (persist === false) {
      setPersist(true)
    } else {
      setPersist(false)
    }
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (EMAIL_REGEX.test(email)) {
      Swal.fire({ icon: "info", title: "Login you In" })
      try {
        setWait(true)
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({ email: email, password: pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        if (response?.data.error === undefined) {
          const accessToken = response?.data?.accessToken
          const role = response?.data?.Role
          const UserId = response?.data?.UserId
          const username = response?.data?.username
          setAuth({ username, role, accessToken, UserId })
          setEmail('')
          setPwd('')
          Swal.fire({ icon: "success", title: "Login successful" })
        } else {
          Swal.fire({ icon: 'error', title: response.data.error })
          setWait(false)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire({ icon: "error", title: "Enter a valid email please" })
    }

  }

  return (
    <motion.section className='flex flex-col place-items-center group '>
      <p ref={errorInputRef} className={errMsg ? "bg-red-600 border border-red-700 opacity-100" : "opacity-0"} aria-live="assertive">
        {errMsg}
      </p>
      <h1 className='text-3xl group-hover:animate-pulse '>Sign In</h1>
      <form className='flex flex-col gap-y-5 text-center my-auto' onSubmit={handleSubmit}>
        {/* Email */}
        <label htmlFor='Email'>Email</label>
        <input className='text-black p-2 rounded-xl'
          type='text'
          id='Email'
          ref={emailInputRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {/* Password */}
        <label htmlFor='Password'>Password</label>
        <input className='text-black p-2 rounded-xl'
          type='password'
          id='Password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          maxLength='24'
          minLength='8'
        />
        <div>
          <input
            type='checkbox'
            id='persist'
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor='persist'>I trust this device</label>
        </div>
        <button className={wait ? 'bg-slate-300 p-4 text-black rounded-md' : 'bg-blue-500 p-4 text-white rounded-md'} type='submit' disabled={wait ? true : false}>Sign In</button>
      </form>
    </motion.section>
  );
}

export default LoginUser;
