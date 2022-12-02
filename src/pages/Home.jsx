import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {

  const [books,setBooks] = useState(undefined)

  useEffect(()=>{
    const endPoint='https://librarycommerce-node-api.onrender.com/api/books'
    axios
      .get(endPoint)
      .then(res=>{
        setBooks(res.data)
        console.log(res.data)
      })
  
  },[setBooks])

  const handleBookUpload = e =>{
    e.preventDefault()
    const title = e.target.title.value
    const overview = e.target.overview.value
    const writer = e.target.writer.value
    const sellCount = e.target.sellCount.value
    axios.post('https://librarycommerce-node-api.onrender.com/api/books',{title,overview,sellCount,writer})

  }

  return (
    <div>
      Buenasss
      {books === undefined && <div>LOADING BOOKS...</div>}
      {(books && books.length === 0) && <div>No Books found</div>}
      {books && 
        <div className='bg-slate-400 flex flex-col w-1/2 m-auto gap-y-2'>
          {books.map((book,index)=>{
            const location = "book/"+book.id
            return(
              <NavLink to={location} className='bg-blue-700 m-auto' key={index}>
                <span>{book.title}</span>
              </NavLink>
            )
          })}
          <form className='bg-green-500' onSubmit={handleBookUpload}>
            <label>Titulo</label>
            <input className='border border-black' type='text' name='title'/><br/>
            <label>Descripcion</label>
            <input className='border border-black' type='text' name='overview'/><br/>
            <label>Autor</label>
            <input className='border border-black' type='text' name='writer'/><br/>
            <label>Ventas Totales</label>
            <input className='border border-black' type='text' name='sellCount'/><br/>
            <button type='submit'>Subir</button>
          </form>
        </div>}
    </div>
  );
}

export default Home;
