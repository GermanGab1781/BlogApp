import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const BlogDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const params = useParams()
  const [blog, setBlog] = useState(undefined)
  const [pathProfile, setPathProfile] = useState(undefined)

  useEffect(() => {
    const blogId = params.id
    const endPoint = `api/blogs/${blogId}`
    axiosPrivate.get(endPoint)
      .then((res) => {
        setBlog(res.data)
        setPathProfile(`/user/${res.data.userId}`)
        console.log(res.data)
      })

  }, [setBlog, setPathProfile, params, axiosPrivate])

  return (
    <div className=''>
      {blog === undefined && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>LOADING BLOG...</div>}
      {(blog && blog.error !== undefined) && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>NO BLOG WITH THAT ID</div>}
      {(blog && blog.error === undefined) &&
        <div className='md:py-0 py-6'>
          {/* Title */}
          <div className='grid grid-cols-3 mb-10 text-center place-items-center'>
            <h1 className='col-start-1 md:col-span-2 col-span-3 text-5xl'>{blog.title}</h1>
            {/* Buttons */}
            <div className='md:col-start-3 col-start-2 md:row-start-1 row-start-2 flex flex-row gap-x-4 md:mt-auto mt-5 text-xl w-full'>
              <span className='border p-1 bg-indigo-800 hover:border-indigo-500 hover:text-indigo-200 cursor-pointer'>Follow </span>
              <NavLink to={pathProfile} className='border p-1 bg-indigo-800 hover:border-indigo-500 hover:text-indigo-200'>Profile</NavLink>
            </div>
          </div>
          {/* Text */}
          <div className='flex border border-white w-full h-full text-2xl p-10 place-items-start place-content-center text-justify bg-violet-800'>
            <span className=' text-'>{blog.text}</span>
          </div>
          {/* More Buttons */}
          <div className='flex flex-col text-center place-content-center text-2xl mt-5'>
            <span>By: <NavLink to={pathProfile} className='underline hover:text-indigo-200'>{blog.username}</NavLink></span>
          </div>
        </div>
      }


    </div>
  );
}

export default BlogDetail;
