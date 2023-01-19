import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonHome = ({text,path}) => {
  return (
    <NavLink className='flex p-10 bg-red-800 hover:bg-indigo-700 border border-blue-500 hover:border-slate-50 w-56 transition-all ease-in-out delay-75' to={path}>
      <span className='m-auto font-semibold'>{text}</span>
    </NavLink>
  );
}

export default ButtonHome;
