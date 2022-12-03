import React from 'react'
import axios from 'axios'

export default function BookUpload() {

  const handleBookUpload = e =>{
    e.preventDefault()
    const title = e.target.title.value
    const overview = e.target.overview.value
    const writer = e.target.writer.value
    const sellCount = e.target.sellCount.value
    axios.post('https://librarycommerce-node-api.onrender.com/api/books',{title,overview,sellCount,writer})
  }

  return (
    <div className='bg-slate-400 flex flex-col w-1/2 m-auto gap-y-2 place-items-center'>
      <form className='bg-green-500 flex flex-col' onSubmit={handleBookUpload}>
          <label>Titulo</label>
          <input className='border border-black' type='text' name='title'/>
          <label>Descripcion</label>
          <input className='border border-black' type='text' name='overview'/>
          <label>Autor</label>
          <input className='border border-black' type='text' name='writer'/>
          <label>Ventas Totales</label>
          <input className='border border-black' type='text' name='sellCount'/>
          <button type='submit'>Subir</button>
        </form>
    </div>
  )
}
