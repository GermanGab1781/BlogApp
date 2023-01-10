import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const BlogDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const params = useParams()
  const [blog,setBlog]= useState(undefined)
  const [blogUser,setBlogUser] = useState(undefined)

  useEffect(()=>{
    const blogId = params.id
    const endPoint = `api/blogs/${blogId}`
    axiosPrivate.get(endPoint)
      .then((res)=>{
        setBlog(res.data)
        const endPoint2 = `api/users/userProfile/${res.data.userId}`
        axiosPrivate.get(endPoint2)
          .then((res2)=>{
            setBlogUser(res2.data)
          })
      })

  },[setBlog,setBlogUser,params])

  return (
    <div className=''>
      {(blog === undefined && blogUser === undefined) && <div>LOADING BLOG...</div>}
      {(blog && blog.error !== undefined)&&(blogUser && blogUser.error !== undefined) && <div>NO BLOG WITH THAT ID</div>}
      {(blog && blog.error === undefined)&&(blogUser && blogUser.error === undefined) && 
        <div>
          ID:{blog.id}<br/>
          TITLE:{blog.title}<br/>
          Uploaded by user:"{blogUser.username}"
        </div>}

      
    </div>
  );
}

export default BlogDetail;
