import React from 'react'
import Swal from 'sweetalert2';
import UseAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const UPLOAD_URL = '/api/blogs/'

export default function BlogUpload() {
  const axiosPrivate = useAxiosPrivate()
  const {auth} = UseAuth();

  const handleBlogUpload = async (e) =>{
    e.preventDefault()
    const title = e.target.title.value
    const text = e.target.text.value
    const writer = e.target.writer.value
    const sellCount = e.target.sellCount.value
    const userId = auth.userId
    Swal.fire({title:'Uploading blog...',icon:'question'})
    try {
      const response = await axiosPrivate.post(UPLOAD_URL,
        JSON.stringify({title,text,sellCount,writer,userId}),
      )
      if (response?.data){
        Swal.fire({title:'Success',icon:'success'})
      }
    } catch (err) {
    }
  }

  return (
    <div className='bg-blue-600 flex flex-col w-1/2 m-auto gap-y-2 place-items-center text-center'>
      <form className='flex flex-col' onSubmit={handleBlogUpload}>
          <label>Titulo</label>
          <input className='border border-black text-center text-black' type='text' name='title'/>
          <label>Descripcion</label>
          <input className='border border-black text-center text-black' type='text' name='text'/>
          <label>Autor</label>
          <input className='border border-black text-center text-black' type='text' name='writer'/>
          <label>Ventas Totales</label>
          <input className='border border-black text-center text-black' type='number' name='sellCount'/>
          <button type='submit'>Subir</button>
        </form>
    </div>
  )
}
