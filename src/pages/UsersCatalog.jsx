import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { NavLink } from 'react-router-dom'

export default function UsersCatalog() {
  const [users, setUsers] = useState(undefined)
  useEffect(() => {
    const endPoint = '/api/users'
    axios
      .get(endPoint)
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
  }, [setUsers])

  return (
    <div>
      {users === undefined && <div>LOADING users...</div>}
      {(users && users.length === 0) && <div>No users found</div>}
      {users &&
        <div>
          <h1 className='text-center text-3xl my-5'>&#10084;Our Users&#10084;</h1>
          <div className='bg-blue-600 flex flex-row flex-wrap place-content-evenly w-10/12 m-auto gap-5 p-5'>
            {users.map((user, index) => {
              const location = "/user/" + user.userID
              return (
                <NavLink to={location} className='relative flex  bg-blue-700 h-40 w-40 place-items-center place-content-center group  hover:border-indigo-300 hover:border transition ease-in-out' key={index}>
                  <span className='text-xl font-semibold'>{user.username}</span>
                  <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-black md:opacity-0 opacity-100 md:bg-transparent bg-slate-200 group-hover:opacity-100 group-hover:bg-slate-200 text-center font-semibold'>Check Profile</span>
                </NavLink>
              )
            })}
          </div>
        </div>
      }
    </div>
  )
}
