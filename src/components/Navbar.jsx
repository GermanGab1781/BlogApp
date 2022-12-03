import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Navbar = () => {
  const {isLogged, logout} = useAuthContext()
  return (
    <div>
      {isLogged() === true && 
        <div className='fixed flex flex-row place-content-between w-screen top-0 bg-black text-white p-2'>
          <NavLink className='text-xl' to="/home">&#9733;Home&#9733;</NavLink>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <NavLink className='text-xl' to ="/booksCatalog">&#9728; Book Catalog &#9728;</NavLink>       
          </div>
          <div>
            <NavLink className='' to ="/bookUpload">Upload a book &#128214;</NavLink>
            <NavLink className='ml-5' to ="/usersCatalog">Our Users &#10084;</NavLink>      
            <button className='ml-5' onClick={logout}>Logout</button>
          </div>
                 
        </div>
      }
    </div>
  );
}

export default Navbar;
