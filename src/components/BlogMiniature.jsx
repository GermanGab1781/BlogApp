import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BlogMiniature({ title, text, location, pathProfile, username }) {
  return (
    <div className='group text-center border border-indigo-200 border-opacity-0 hover:border-opacity-100 delay-75 p-1'>
      <NavLink to={location} className=''>
        <div className='flex flex-col bg-blue-700 w-48 h-64 '>
          <span className='m-auto group-hover:scale-105 delay-75'>
            {title}
          </span>
          <span className='bg-indigo-700 w-48 h-48 relative text-center px-2 overflow-hidden'>
            <span>{text}</span>    
          </span>
        </div>
      </NavLink>
      {(pathProfile !== undefined && username !== undefined) &&
        <div className='bg-indigo-900 p-1 border border-indigo-700 flex flex-col'>
          <span>By: <NavLink to={pathProfile} className='underline hover:text-indigo-200'>{username}</NavLink></span>
        </div>
      }

    </div>
  )
}
