import React from 'react'
import { NavLink } from 'react-router-dom'


export default function BlogMiniature({ title, text, location, pathProfile, username, delay }) {
  return (

    <div className='group text-center border border-indigo-200 border-opacity-0 hover:border-opacity-100 delay-75 transition-all ease-in-out'>
      <NavLink to={location} className=''>
        <div className='flex flex-col bg-blue-700 w-48 h-64'>
          <span className='m-auto group-hover:font-bold delay-75 font-semibold  transition-all ease-in-out'>
            {title}
          </span>
          <span className='bg-indigo-700 w-48 h-48 relative text-center group-hover:bg-slate-200 group-hover:bg-opacity-90 px-2 overflow-hidden transition-all ease-in-out duration-150'>
            <span className='group-hover:opacity-50'>{text}</span>
            <span className='absolute opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 text-black text-xl font-semibold w-full'>Click to Read</span>
          </span>
        </div>
      </NavLink>
      {(pathProfile !== undefined || username !== undefined) &&
        <div className='bg-indigo-900 p-1 border border-indigo-700 flex flex-col'>
          <span>By: <NavLink to={pathProfile} className='underline hover:text-indigo-200'>{username}</NavLink></span>
        </div>
      }

    </div>
  )
}
