import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogMiniature from '../components/BlogMiniature';

const UserDetail = () => {
  const params = useParams()
  const [user,setUser]= useState(undefined)
  const [userBlogs,setUserBlogs] =useState(undefined)

  useEffect(()=>{
    const userId = params.id
    const endPoint = `https://librarycommerce-node-api.onrender.com/api/users/${userId}`
    axios.get(endPoint)
      .then((res)=>{
        setUser(res.data)
      })
    const endPoint2 =`https://librarycommerce-node-api.onrender.com/api/blogs/userBlogs/${userId}`
    axios.get(endPoint2)
      .then((res)=>{
        setUserBlogs(res.data)
      })
    
  },[setUser,params])

  return (
    <div className=''>
      {(user === undefined && userBlogs === undefined) && <div>LOADING BOOK...</div>}
      {user && user.error !== undefined && <div>NO USER WITH THAT ID</div>}
      {(user && user.error === undefined)&&(userBlogs !== undefined) && 
        <div className='flex flex-col'>
          {/* User Info */}
          <div className='text-center'>
            <span className='text-5xl'>{user.username}</span>
          </div>

          {/* User Blogs */}
          {userBlogs.length > 0 &&
          <div className='border-t-2 text-center flex flex-row flex-wrap place-content-evenly'>
            {userBlogs.map((blog,index)=>{
              let path = '/blog/'+ blog.id
              return(
                <BlogMiniature location={path} title={blog.title} key={index}/>
              )
            })}
          </div>}
          {userBlogs.length === 0 && <div className='border-t-2 text-3xl h-48 w-scren relative'>
            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>No blogs uploaded yet :)</span>
          </div>}
        </div>
      
      }

      
    </div>
  );
}

export default UserDetail;
