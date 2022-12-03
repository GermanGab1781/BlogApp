import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function UsersCatalog() {
  const [users, setUsers] = useState(undefined)
  useEffect(()=>{
    const endPoint='https://librarycommerce-node-api.onrender.com/api/users/'
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
        <div className='bg-slate-400 flex flex-col w-1/2 m-auto gap-y-2'>
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
