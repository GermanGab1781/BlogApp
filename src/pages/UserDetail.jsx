import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogMiniature from '../components/BlogMiniature';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'


const UserDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const params = useParams()
  const [user, setUser] = useState(undefined)
  const [userBlogs, setUserBlogs] = useState(undefined)
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  useEffect(() => {
    const userId = params.id
    const endPoint = `/api/users/userProfile/${userId}`
    axios.get(endPoint)
      .then((res) => {
        setUser(res.data)
      })
    const endPoint2 = `/api/blogs/userBlogs/${userId}`
    axiosPrivate.get(endPoint2)
      .then((res) => {
        setUserBlogs(res.data)
      })

  }, [setUser, params, axiosPrivate])

  return (
    <motion.div className=''>
      {(user === undefined && userBlogs === undefined) && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Loading profile...</div>}
      {user && user.error !== undefined && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>NO USER WITH THAT ID</div>}
      {(user && user.error === undefined) && (userBlogs !== undefined) &&
        <div className='flex flex-col place-items-center'>
          {/* User Info */}
          <motion.div initial={isMobile ? { y: "30vh", scale: 1 } : { y: "30vh", scale: 1.6, width: "50%" }} animate={{ y: 0, scale: 1, width: "100%" }} transition={{ delay: 0.5, duration: 2, width: { delay: 0.6, duration: 3 } }} className='text-center border-b-2 pb-3 mb-5'>
            <span className='text-5xl'>{user.username}</span>
          </motion.div>

          {/* User Blogs */}
          {userBlogs.length > 0 &&
            <motion.div className=' text-center flex flex-row flex-wrap gap-x-10 gap-y-6 place-content-center'>
              {userBlogs.map((blog, index) => {
                let path = '/blog/' + blog.id
                return (
                  <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2 + index / 10 }} >
                    <BlogMiniature delay={index * 0.1} location={path} title={blog.title} key={index} text={blog.text} />
                  </motion.div>
                )
              })}
            </motion.div>}
          {userBlogs.length === 0 && <div className='text-3xl h-48 w-scren relative'>
            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>No blogs uploaded yet :)</span>
          </div>}
        </div>
      }
    </motion.div>
  );
}

export default UserDetail;
