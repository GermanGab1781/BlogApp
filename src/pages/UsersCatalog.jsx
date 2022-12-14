import React from 'react'
import { useState,useEffect } from 'react'
import axios from '../api/axios'
import { NavLink } from 'react-router-dom'

export default function UsersCatalog() {
  const [users, setUsers] = useState(undefined)
  useEffect(()=>{
    const endPoint='/api/users'
    axios
      .get(endPoint)
      .then(res=>{
        setUsers(res.data)
        console.log(res.data)
      })
  
  },[setUsers])

  return (
    <div>
      {users === undefined && <div>LOADING users...</div>}
      {(users && users.length === 0) && <div>No users found</div>}
      {users && 
        <div className='bg-blue-600 flex flex-col w-1/2 m-auto gap-y-2'>
          {users.map((user,index)=>{
            const location = "/user/"+user.userID
            return(
              <NavLink to={location} className='bg-blue-700 m-auto' key={index}>
                <span>{user.username}</span>
              </NavLink>
            )
          })}
        </div>}
    </div>
  )
}
