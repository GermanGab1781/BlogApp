import React from 'react'
import Swal from 'sweetalert2';
import { axiosPrivate } from '../api/axios';
const UPLOAD_URL = '/api/blogs/'

export default function BlogUpload() {


  const handleBlogUpload = async (e) =>{
    e.preventDefault()
    const title = e.target.title.value
    const overview = e.target.overview.value
    const writer = e.target.writer.value
    const sellCount = e.target.sellCount.value
    const userId = 1
    Swal.fire({title:'Uploading blog...',icon:'question'})
    try {
      const response = await axiosPrivate.post(UPLOAD_URL,
        JSON.stringify({title,overview,sellCount,writer,userId}),
      )
      if (response?.data){
        Swal.fire({title:'Success',icon:'success'})
      }
    } catch (err) {
      console.log(err)
    }
    /* axios.post(UPLOAD_URL,{title,overview,sellCount,writer,userId})
      .then(()=>{
        Swal.fire({title:'Blog uploaded',icon:'success',showConfirmButton:false,timer:1300})
      }) */
  }

  return (
    <div className='bg-blue-600 flex flex-col w-1/2 m-auto gap-y-2 place-items-center text-center'>
      <form className='flex flex-col' onSubmit={handleBlogUpload}>
          <label>Titulo</label>
          <input className='border border-black text-center text-black' type='text' name='title'/>
          <label>Descripcion</label>
          <input className='border border-black text-center text-black' type='text' name='overview'/>
          <label>Autor</label>
          <input className='border border-black text-center text-black' type='text' name='writer'/>
          <label>Ventas Totales</label>
          <input className='border border-black text-center text-black' type='number' name='sellCount'/>
          <button type='submit'>Subir</button>
        </form>
    </div>
  )
}
