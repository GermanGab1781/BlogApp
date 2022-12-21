import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BlogMiniature({title,location}) {
  return (
    <NavLink to={location} className='group text-center border border-white border-opacity-0 hover:border-opacity-100 delay-75 p-1 '>
      <div className='flex flex-col bg-blue-700 w-48 h-64 '>
        <span className='bg-indigo-700 w-48 h-48 relative'>
        </span>               
        <span className='m-auto group-hover:scale-105 delay-75'>
          {title}
        </span>                
      </div>
    </NavLink>
  )
}
