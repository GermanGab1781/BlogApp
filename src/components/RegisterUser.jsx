import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from '../api/axios';
import Swal from 'sweetalert2'

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{8,24}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/
const EMAIL_REGEX = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
const REGISTER_URL = '/api/users/register'


export default function RegisterUser() {
  const userInputRef = useRef()
  const errorInputRef = useRef()
  const emailInputRef = useRef()


  /* User */
  const [user, setUser] = useState('')
  const [validUser, setValidUser] = useState(false)
  const [userFocus, setUserFocus] = useState(false)
  /* Email */
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  /* Password */
  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  /* Match */
  const [match, setMatch] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const [wait, setWait] = useState(false)

  useEffect(() => {
    userInputRef.current.focus()
  }, [])

  useEffect(() => {
    /* Check username validation */
    const result = USER_REGEX.test(user);
    setValidUser(result)
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    /* Check password validation */
    const result = PASSWORD_REGEX.test(pwd);
    setValidPwd(result);
    const matchResult = pwd === match;
    setValidMatch(matchResult)
  }, [pwd, match])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, match])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return;
    }
    try {
      setWait(true)
      Swal.fire({ icon: 'info', title: 'Please wait...' })
      const response = await axios.post(REGISTER_URL, JSON.stringify({ username: user, email: email, password: pwd }),
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true
        })
      setSuccess(true)
      Swal.fire({ icon: 'success', title: 'Register complete!' })
    } catch (error) {
      setWait(false)
      if (!error?.response) {
        Swal.fire({ title: 'Error!', text: 'No Server response', icon: 'error' })
      } else if (error.response?.status === 409) {
        Swal.fire({ title: 'Error!', text: `${error.response.data.error}`, icon: 'error' })
      } else {
        Swal.fire({ title: 'Error!', text: 'Registration failed', icon: 'error' })
      }
      errorInputRef.current.focus()
    }

  }

  return (
    <>{!success ?
      <section className=' flex flex-col gap-y-5 text-center'>
        <p ref={errorInputRef} className={errMsg ? "bg-red-600 border border-red-700 opacity-100" : "opacity-0"} aria-live="assertive">
          {errMsg}
        </p>
        <h1 className='text-3xl'>Register</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 m-auto'>
          {/* Username */}
          <div className='relative flex flex-col place-items-center'>
            <label className='relative mb-3' htmlFor='username'>
              Username
              <span className='absolute -right-5 text-black'>
                <span className={validUser ? "visible absolute" : "invisible absolute"}>&#9745;</span>
                <span className={validUser || !user ? "invisible absolute" : " bg-red-700 visible absolute"}>&#9746;</span>
              </span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="username"
              ref={userInputRef}
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validUser ? "bg-red-500" : "bg-blue-500"}
              aria-describedby="uidnote"
              onFocus={() => { setUserFocus(true) }}
              onBlur={() => { setUserFocus(false) }}
              className="text-black"
              maxLength='20'
              minLength='8'
            />
            <p id="uidnote" className={userFocus && user && !validUser ? "absolute md:top-1/2 md:bottom-auto bottom-full left-1/2 transform md:translate-x-1/2 -translate-x-1/2 md:-translate-y-1/2 bg-red-500 border border-red-700" : "absolute invisible"}>
              Minimum 8 characters<br />
              Max 20 characters<br />
              At least one letter and one number<br />
              Letters,underscores,numbers are allowed
            </p>
          </div>
          {/* Email */}
          <div className='relative flex flex-col place-items-center'>
            <label className='relative mb-3' htmlFor='Email'>
              Email
              <span className='absolute -right-5 text-black'>
                <span className={validEmail ? "visible absolute" : "invisible absolute"}>&#9745;</span>
                <span className={validEmail || !email ? "invisible absolute" : "bg-red-700 visible absolute"}>&#9746;</span>
              </span>
            </label>
            <input
              autoComplete="off"
              type="email"
              id="Email"
              ref={emailInputRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "bg-red-500" : "bg-blue-500"}
              aria-describedby="emailnote"
              onFocus={() => { setEmailFocus(true) }}
              onBlur={() => { setEmailFocus(false) }}
              className="text-black"
            />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "absolute md:top-1/2 md:bottom-auto bottom-1/2 left-1/2 transform md:translate-x-full -translate-x-1/2 -translate-y-1/2 opacity-100 bg-red-500 border border-red-700" : "absolute invisible bg-red-500"}>
              Must be a valid email!
            </p>
          </div>
          {/* Password */}
          <div className='relative flex flex-col place-items-center'>
            <label className='relative mb-3' htmlFor='Password'>
              Password
              <span className='absolute -right-5 text-black'>
                <span className={validPwd ? "visible absolute" : "invisible absolute"}>&#9745;</span>
                <span className={validPwd || !pwd ? "invisible absolute" : "bg-red-700 visible absolute"}>&#9746;</span>
              </span>
            </label>
            <input
              autoComplete="off"
              type="password"
              id="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "bg-red-500" : "bg-blue-500"}
              aria-describedby="pwdnote"
              onFocus={() => { setPwdFocus(true) }}
              onBlur={() => { setPwdFocus(false) }}
              className="text-black"
              maxLength='24'
              minLength='8'
            />
            <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "absolute md:top-1/2 md:bottom-auto bottom-full left-1/2 transform md:translate-x-full -translate-x-1/2 md:-translate-y-1/2 bg-red-500 border border-red-700" : "absolute invisible bg-red-500"}>
              8-24 Characters <br />
              Must include letters and a number
            </p>
          </div>
          {/* Confirm Password */}
          <div className='flex flex-col place-items-center'>
            <label className='relative mb-3' htmlFor='Match'>
              Confirm Password
              <span className='absolute right-1 text-black'>
                <span className={validMatch && (match !== '') ? "visible absolute -right-8" : "absolute invisible"}>&#9745;</span>
                <span className={validMatch || !match ? "absolute invisible" : "bg-red-700 visible absolute -right-8"}>&#9746;</span>
              </span>
            </label>
            <input
              autoComplete="off"
              type="password"
              id="Match"
              onChange={(e) => setMatch(e.target.value)}
              required
              aria-invalid={validMatch ? "border" : "bg-blue-500"}
              aria-describedby="matchnote"
              onFocus={() => { setMatchFocus(true) }}
              onBlur={() => { setMatchFocus(false) }}
              className="text-black"
              maxLength='24'
              minLength='8'
            />
            <p className='relative text-center text-black' id="matchnote">
              <span className={match && !validMatch && matchFocus && pwd !== '' ? "visible absolute md:top-1/2 md:bottom-auto bottom-full left-1/2 transform md:translate-x-full -translate-x-1/2 -translate-y-1/2 bg-red-500 border border-red-700" : "invisible absolute"} >Passwords are different!!</span><br />
              <span className={pwd === '' && match ? "visible absolute md:top-1/2 md:bottom-auto bottom-full left-1/2 transform md:translate-x-full -translate-x-1/2 -translate-y-1/2 bg-red-500 border border-red-700" : "invisible absolute"}>Password field is empty</span>
            </p>
          </div>
          <button type='submit' className={!validUser || !validEmail || !validPwd || !validMatch || wait ? 'bg-slate-300 p-4 text-black' : 'bg-blue-500 p-4 text-white'} disabled={!validUser || !validEmail || !validPwd || !validMatch || wait ? true : false}>Register!</button>
        </form>
      </section>
      : <div className='text-white'>Registration done!!</div>}
    </>
  )
}
