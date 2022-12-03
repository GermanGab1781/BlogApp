import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const params = useParams()
  const [book,setBook]= useState(undefined)

  useEffect(()=>{
    const bookId = params.id
    const endPoint = `https://librarycommerce-node-api.onrender.com/api/books/${bookId}`
    axios.get(endPoint)
      .then((res)=>{
        setBook(res.data)
      })

  },[setBook,params])

  return (
    <div>
      {book === undefined && <div>LOADING BOOK...</div>}
      {(book && book.error !== undefined) && <div>NO BOOK WITH THAT ID</div>}
      {(book && book.error === undefined) && 
        <div>
          {book.id}
          {book.title}
        </div>}

      
    </div>
  );
}

export default BookDetail;
