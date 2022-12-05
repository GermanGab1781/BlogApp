import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function BooksCatalog() {
  
  const [books,setBooks] = useState(undefined)

  useEffect(()=>{
    const endPoint='https://librarycommerce-node-api.onrender.com/api/books'
    axios
      .get(endPoint)
      .then(res=>{
        setBooks(res.data)
      })
  
  },[setBooks])

  return (
    <div>
      {books === undefined && <div>LOADING BOOKS...</div>}
      {(books && books.length === 0) && <div>No Books found</div>}
      {books && 
        <div className='bg-blue-600 flex flex-col w-1/2 m-auto gap-y-2'>
          {books.map((book,index)=>{
            const location = "/book/"+book.id
            return(
              <NavLink to={location} className='bg-blue-700 hover:bg-indigo-700 m-auto p-10' key={index}>
                <span>{book.title}</span>
              </NavLink>
            )
          })}
        </div>}
    </div>
  )
}
