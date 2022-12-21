import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import BlogMiniature from '../components/BlogMiniature'

export default function BlogsCatalog() {
  
  const [blogs,setBlogs] = useState(undefined)

  useEffect(()=>{
    const endPoint='https://librarycommerce-node-api.onrender.com/api/blogs'
    axios
      .get(endPoint)
      .then(res=>{
        setBlogs(res.data)
      })
  },[setBlogs])

  return (
    <div>
      {blogs === undefined && <div>LOADING BLOGS...</div>}
      {(blogs && blogs.length === 0) && <div>No Blogs found</div>}
      {blogs && 
        <div className='bg-blue-600 flex flex-row flex-wrap w-10/12 place-content-evenly m-auto gap-y-6 py-5 overflow-hidden'>
          {blogs.map((blog,index)=>{
            let path = "/blog/"+blog.id
            return(
              <BlogMiniature location={path} title={blog.title} key={index} />
            )
          })}
        </div>}
    </div>
  )
}
