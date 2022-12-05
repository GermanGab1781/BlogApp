import React from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'

export default function BookUpload() {

  const {userInformation} = useAuthContext();

  const handleBookUpload = e =>{
    e.preventDefault()
    const title = e.target.title.value
    const overview = e.target.overview.value
    const writer = e.target.writer.value
    const sellCount = e.target.sellCount.value
    const userId = userInformation().id
    axios.post('https://librarycommerce-node-api.onrender.com/api/books',{title,overview,sellCount,writer,userId})
  }

  return (
    <div className='bg-blue-600 flex flex-col w-1/2 m-auto gap-y-2 place-items-center text-center'>
      <form className='flex flex-col' onSubmit={handleBookUpload}>
          <label>Titulo</label>
          <input className='border border-black text-center' type='text' name='title'/>
          <label>Descripcion</label>
          <input className='border border-black text-center' type='text' name='overview'/>
          <label>Autor</label>
          <input className='border border-black text-center' type='text' name='writer'/>
          <label>Ventas Totales</label>
          <input className='border border-black text-center' type='number' name='sellCount'/>
          <button type='submit'>Subir</button>
        </form>
    </div>
  )
}
