import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import UseAuth from '../hooks/useAuth';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

const Navbar = () => {
  const { auth } = UseAuth()
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [navButton, setNavButton] = useState(true);
  const [pathProfile,setPathProfile] =useState(undefined)
  
  const logout = useLogout()
  useEffect(()=>{
    setPathProfile(`/user/${auth.UserId}`)
  },[auth])

  const SignOut = async () => {
    setNavButton(!navButton)
    await logout()
  }

  return (
    <div className=''>
      {auth?.role === ("User" || "Admin") &&
        <>
          {isMobile
            /* Mobile */
            ? <div className={navButton
              ? 'fixed w-screen h-16 top-0 bg-black text-white p-2 z-20 transition-all ease-in-out duration-1000 delay-75'
              : 'fixed w-screen h-screen top-0 bg-black text-white p-2 z-20 transition-all ease-in-out duration-1000 '
            }>
              {/* Items */}
              <div className='flex flex-row place-content-between place-items-center text-3xl font-semibold'>
                <NavLink className='' to='/Home' onClick={()=>setNavButton(true)}>&#9733;Home&#9733;</NavLink>
                <NavLink className='' to='/blogsCatalog' onClick={()=>setNavButton(true)}>&#9728;Feed&#9728;</NavLink>
                {/* Nav Opener */}
                <span className='text-5xl ' onClick={()=>setNavButton(!navButton)}>&#9776;</span>
              </div>
              
              {/* Nav Items */}
              <div className={navButton
                ?'flex flex-col place-items-center pt-14 text-3xl gap-y-10 invisible delay-300'
                :'flex flex-col place-items-center pt-14 text-3xl gap-y-10 visible delay-500 '
              }>
                <NavLink to={pathProfile} onClick={()=>setNavButton(!navButton)}>My profile</NavLink>
                <NavLink className='' to="/blogUpload" onClick={()=>setNavButton(!navButton)}>&#128214;Upload a blog&#128214;</NavLink>
                <NavLink className='' to="/blogsCatalog" onClick={()=>setNavButton(!navButton)}>&#10025;All Blogs&#10025;</NavLink>
                <NavLink className='' to="/usersCatalog" onClick={()=>setNavButton(!navButton)}>&#10084;Our Users&#10084;</NavLink>                
                <button className='' onClick={SignOut}>Logout</button>
              </div>
            </div>
            /* Desktop */
            : <div className='fixed flex flex-row place-content-between w-screen top-0 bg-black text-white p-2 pr-5 z-20'>
              <div>
                <NavLink className='text-2  xl mr-5' to="/home">&#9733;Home&#9733;</NavLink>
                <NavLink to={pathProfile}>My profile</NavLink>
              </div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <NavLink className='text-2  xl' to="/blogsCatalog">&#9728; Feed &#9728;</NavLink>

              </div>
              <div>
                <NavLink className='' to="/blogUpload">Upload a blog &#128214;</NavLink>
                <NavLink className='ml-5' to="/blogsCatalog">&#10025;All Blogs&#10025;</NavLink>
                <NavLink className='ml-5' to="/usersCatalog">Our Users &#10084;</NavLink>
                <button className='ml-5' onClick={SignOut}>Logout</button>
              </div>
            </div>
          }

        </>
      }
    </div>
  );
}

export default Navbar;
