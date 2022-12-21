import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from '../api/axios';
import Swal from 'sweetalert2'

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,24}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/  
const EMAIL_REGEX = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
const REGISTER_URL='/api/users/register'


export default function RegisterUser() {
  const userInputRef = useRef()
  const errorInputRef = useRef()
  const emailInputRef = useRef()


  /* User */
  const [user,setUser] = useState('')
  const [validUser,setValidUser] = useState(false)
  const [userFocus,setUserFocus] =useState(false)
  /* Email */
  const [email,setEmail] = useState('')
  const [validEmail,setValidEmail] = useState(false)
  const [emailFocus,setEmailFocus] =useState(false)
  /* Password */
  const [pwd,setPwd] = useState('')
  const [validPwd,setValidPwd] = useState(false)
  const [pwdFocus,setPwdFocus] =useState(false)
  /* Match */
  const [match,setMatch] = useState('')
  const [validMatch,setValidMatch] = useState(false)
  const [matchFocus,setMatchFocus] =useState(false)

  const[errMsg,setErrMsg] =useState('')
  const[success,setSuccess] =useState(false)
  
  
  useEffect(()=>{
    userInputRef.current.focus()
  },[])

  useEffect(()=>{
    /* Check username validation */
    const result = USER_REGEX.test(user);
    setValidUser(result)
  },[user])

  useEffect(()=>{
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  },[email])

  useEffect(()=>{
    /* Check password validation */
    const result = PASSWORD_REGEX.test(pwd);
    setValidPwd(result);
    const matchResult = pwd === match;
    setValidMatch(matchResult)
  },[pwd,match])

  useEffect(()=>{
    setErrMsg('')
  },[user,pwd,match])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(pwd);
    if(!v1 || !v2){
      setErrMsg("Invalid Entry")
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({username:user,email:email,password:pwd}),
      {
        headers:{'Content-type': 'application/json'},
        withCredentials:true
      })
      console.log(response.data)
      console.log(response.accessToken)
      setSuccess(true)
      Swal.fire({icon:'success',title:'Registracion completa'})
    } catch (error) {
      console.log(error)
      if(!error?.response){
        Swal.fire({title:'Error!',text:'No Server response',icon:'error'})
      }else if(error.response?.status === 409){ 
        Swal.fire({title:'Error!',text:'Username Taken',icon:'error'})
      }else{
        Swal.fire({title:'Error!',text:'Registration failed',icon:'error'})
      }
      errorInputRef.current.focus()
    }
    
  }

  return (
    <>{!success ? 
    <section className='text-black flex flex-col gap-y-5 border place-items-center'>
      <p ref={errorInputRef} className={errMsg ? "bg-red-600 border border-red-700 opacity-100" : "opacity-0"} aria-live="assertive">
        {errMsg}
      </p>
      <h1 className='text-3xl'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col text-center'>
        {/* Username */}
        <div className='flex flex-col border'>        
        <label htmlFor='username'>
          Username
          <span className={validUser ? "p-3 bg-green-700 visible": "invisible"}>ok</span>
          <span className={validUser || !user ?  "invisible": "p-3 bg-red-700 visible"}>not ok</span>
        </label>
        <input
          type="text"
          id="username"
          ref={userInputRef}
          autoComplete="off"
          onChange={(e)=>setUser(e.target.value)}
          required
          aria-invalid={validUser ? "bg-red-500" : "bg-blue-500"}
          aria-describedby="uidnote"
          onFocus={()=>{setUserFocus(true)}}
          onBlur={()=>{setUserFocus(false)}}
        />
        <p id="uidnote" className={userFocus && user && !validUser ? " bg-red-500" : "absolute invisible bg-red-500"}>
          Minimum eight characters<br/>
          At least one letter and one number<br/>
          Letters,underscores,numbers are allowed
        </p>
        </div>
        {/* Email */}
        <div className='flex flex-col border'>        
        <label htmlFor='Email'>
          Email
          <span className={validEmail ? "p-3 bg-green-700 visible": "invisible"}>ok</span>
          <span className={validEmail || !email ?  "invisible": "p-3 bg-red-700 visible"}>not ok</span>
        </label>
        <input
          type="email"
          id="Email"
          ref={emailInputRef}
          autoComplete="off"
          onChange={(e)=>setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "bg-red-500" : "bg-blue-500"}
          aria-describedby="emailnote"
          onFocus={()=>{setEmailFocus(true)}}
          onBlur={()=>{setEmailFocus(false)}}
        />
        <p id="emailnote" className={emailFocus && email && !validEmail ? " bg-red-500" : "absolute invisible bg-red-500"}>
          Must be a valid email!
        </p>
        </div>
        {/* Password */}
        <div className='flex flex-col border'>
        <label htmlFor='Password'>
          Password
          <span className={validPwd ? "p-3 bg-green-700 visible": "invisible"}>ok</span>
          <span className={validPwd || !pwd ?  "invisible": "p-3 bg-red-700 visible"}>not ok</span>
        </label>
        <input
          type="password"
          id="Password"
          onChange={(e)=>setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "bg-red-500" : "bg-blue-500"}
          aria-describedby="pwdnote"
          onFocus={()=>{setPwdFocus(true)}}
          onBlur={()=>{setPwdFocus(false)}}
        />
        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "opacity-100 bg-red-500" : "opacity-0 bg-red-500"}>
          8-24 Characters <br/>
          Must include uppercase and lowercase letters and a number
        </p> 
        </div>
        {/* Confirm Password */}
        <div className='flex flex-col border'>        
        <label htmlFor='Match'>
          Password
          <span className={validMatch && (match !=='') ? "p-3 bg-green-700 visible": "invisible"}>ok</span>
          <span className={validMatch || !match ?  "invisible": "p-3 bg-red-700 visible"}>not ok</span>
        </label>
        <input
          type="password"
          id="Match"
          onChange={(e)=>setMatch(e.target.value)}
          required
          aria-invalid={validMatch ? "border" : "bg-blue-500"}
          aria-describedby="matchnote"
          onFocus={()=>{setMatchFocus(true)}}
          onBlur={()=>{setMatchFocus(false)}}
        />
        <p id="matchnote">        
           <span className={match && !validMatch && matchFocus && pwd !== '' ? "opacity-100 bg-red-500" : "opacity-0"} >Passwords are different!!</span>
           <span className='invisible'>or</span>
           <span className={pwd=== '' && match ?"opacity-100" :"opacity-0"}>Password field is empty</span>
        </p>
        </div>
        <button type='submit' className='border bg-red-700 hover:bg-red-900 border-red-900 p-5' disabled={!validUser || !validEmail || !validPwd || !validMatch ? true : false}>Register!</button>
      </form>
      <span>Already registered?</span>
      <NavLink to="/login">Sign in instead</NavLink>
    </section>
    : <div className='text-black'>Registration done<NavLink to="/login">Sign in instead</NavLink></div>}
    </>
  )
}
