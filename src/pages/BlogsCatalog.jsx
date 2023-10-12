import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import BlogMiniature from '../components/BlogMiniature'
import { motion } from 'framer-motion'
const BLOGS = '/api/blogs/'

export default function BlogsCatalog() {

  const [blogs, setBlogs] = useState(undefined)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate.get(BLOGS
    ).then(res => {
      setBlogs(res.data)
    })
  }, [setBlogs, axiosPrivate])

  return (
    <div>
      {blogs === undefined && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse'>Loading Blogs...</div>}
      {(blogs && blogs.length === 0) && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>No Blogs found</div>}
      {blogs &&
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className='flex flex-col gap-y-5'>
          <h1 className='text-3xl text-center'>Feed</h1>
          <div className='bg-blue-600 flex flex-row flex-wrap w-10/12 place-content-center m-auto gap-y-6 gap-x-5 p-5 overflow-hidden border'>
            {blogs.map((blog, index) => {
              let path = "/blog/" + blog.id
              let pathProfile = "/user/" + blog.userId
              return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 + index / 10 }} >
                  <BlogMiniature location={path} title={blog.title} key={index} text={blog.text} pathProfile={pathProfile} username={blog.username} />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      }
    </div>
  )
}
