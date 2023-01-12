import React from 'react'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import BlogMiniature from '../components/BlogMiniature'
const BLOGS = '/api/blogs/'

export default function BlogsCatalog() {

  const [blogs, setBlogs] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate.get(BLOGS
    ).then(res => {
      setBlogs(res.data)
    })
  }, [setBlogs, axiosPrivate])

  return (
    <div>
      {blogs === undefined && <div>LOADING BLOGS...</div>}
      {(blogs && blogs.length === 0) && <div>No Blogs found</div>}
      {blogs &&
        <div className='flex flex-col gap-y-5'>
          <h1 className='text-3xl text-center'>Feed</h1>
          <div className='bg-blue-600 flex flex-row flex-wrap w-10/12 place-content-evenly m-auto gap-y-6 py-5 mb-5 overflow-hidden'>
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
