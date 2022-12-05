import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const params = useParams()
  const [user,setUser]= useState(undefined)

  useEffect(()=>{
    const userId = params.id
    const endPoint = `https://librarycommerce-node-api.onrender.com/api/users/${userId}`
    axios.get(endPoint)
      .then((res)=>{
        setUser(res.data)
      })

  },[setUser,params])

  return (
    <div className=''>
      {user === undefined && <div>LOADING USER...</div>}
      {(user && user.error !== undefined) && <div>NO USER WITH THAT ID</div>}
      {(user && user.error === undefined) && 
        <div>
          ID:{user.userID}<br/>
          USERNAME:{user.username}
        </div>}

      
    </div>
  );
}

export default UserDetail;
