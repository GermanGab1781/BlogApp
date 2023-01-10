import React from 'react';
import { NavLink } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import UseAuth from '../hooks/useAuth';

const Navbar = () => {
  const {auth} = UseAuth()
  const pathMyProfile = `/user/${auth?.userId}`
  const logout = useLogout()
  const SignOut = async () => {
    await logout()
  }

  return (
    <div className=''>
      {auth?.role === ("User" || "Admin") &&
      <div className='fixed flex flex-row place-content-between w-screen top-0 bg-black text-white p-2 pr-5 z-20'>
        <div>
          <NavLink className='text-xl mr-5' to="/home">&#9733;Home&#9733;</NavLink>
          <NavLink to={pathMyProfile}>My profile</NavLink>
        </div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <NavLink className='text-xl' to="/blogsCatalog">&#9728; Blogs Catalog &#9728;</NavLink>

        </div>
        <div>
          <NavLink className='' to="/blogUpload">Upload a blog &#128214;</NavLink>
          <NavLink className='ml-5' to="/usersCatalog">Our Users &#10084;</NavLink>
          <button className='ml-5' onClick={SignOut}>Logout</button>
        </div>

      </div>
}
    </div>
  );
}

export default Navbar;
