import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Navbar = () => {
  const {isLogged, logout} = useAuthContext()
  return (
    <div>
      {isLogged() === true && 
        <div className='fixed flex flex-row place-content-between w-screen top-0 bg-black text-white p-2'>
          <NavLink to="/home">Home</NavLink>
          <button className='' onClick={logout}>Logout</button>         
        </div>
      }
    </div>
  );
}

export default Navbar;
