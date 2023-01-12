import React from 'react'
import Swal from 'sweetalert2';
import UseAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const UPLOAD_URL = '/api/blogs/'

export default function BlogUpload() {
  const axiosPrivate = useAxiosPrivate()
  const { auth } = UseAuth();

  const handleBlogUpload = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const text = e.target.text.value
    const userId = auth.UserId
    const username = auth.username

    Swal.fire({ title: 'Uploading blog...', icon: 'question' })
    if (title !== '' && text !== '') {
      try {
        const response = await axiosPrivate.post(UPLOAD_URL,
          JSON.stringify({ title, text,  userId, username }),
        )
        if (response?.data) {
          Swal.fire({ title: 'Success', icon: 'success' })
        }
      } catch (err) {
      }
    }else{
      Swal.fire({title:'Complete all fields please',icon:'error'})
    }
  }

  return (
    <div className='bg-blue-600 flex flex-col w-full m-auto gap-y-2 text-2xl'>
      <form className='flex flex-col w-full place-items-center' onSubmit={handleBlogUpload}>
        <label>Title </label>
        <span className='text-xl text-black'>(max 30 characters)</span>
        <input className='border border-black text-center text-black w-1/3' maxLength='30' required='true' type='text' name='title' />
        <label>Text</label>
        <span className='text-xl text-black'>(max 600 characters)</span>
        <textarea className='border border-black text-center text-black w-1/2' maxLength='600' rows="7" required='true' type='text' name='text' ></textarea>
        <button className='p-2 m-2 bg-indigo-800 border border-indigo-400' type='submit'>Upload</button>
      </form>
    </div>
  )
}
