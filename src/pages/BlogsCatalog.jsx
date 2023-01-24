import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import BlogMiniature from '../components/BlogMiniature'
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
      {blogs === undefined && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Loading Blogs...</div>}
      {(blogs && blogs.length === 0) && <div className='md:text-3xl text-2xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>No Blogs found</div>}
      {blogs &&
        <div className='flex flex-col gap-y-5'>
          <h1 className='text-3xl text-center'>Feed</h1>
          <div className='bg-blue-600 flex flex-row flex-wrap w-10/12 place-content-center m-auto gap-y-6 gap-x-5 p-5 overflow-hidden border'>
            {blogs.map((blog, index) => {
              let path = "/blog/" + blog.id
              let pathProfile = "/user/" + blog.userId
              return (
                <BlogMiniature location={path} title={blog.title} key={index} text={blog.text} pathProfile={pathProfile} username={blog.username} />
              )
            })}
          </div>
        </div>
      }
    </div>
  )
}
