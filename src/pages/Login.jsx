import React from 'react';
import RegisterUser from '../components/RegisterUser';
import LoginUser from '../components/LoginUser';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Login = () => {
  useEffect(() => {
    Swal.fire({ icon: "info", title: "Attention", text: "It may take some time to respond to petitions at first." })
  })
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className='flex flex-col md:h-screen bg-blue-700 -mt-20'>
      <motion.h1 initial={{ y: "-50%" }} animate={{ y: "20%" }} transition={{ duration: 0.8 }} className='text-center text-4xl font-semibold md:m-auto md:my-0 my-6'>Welcome to the Blog page App !!!</motion.h1>
      <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1 }} className='flex md:flex-row flex-col place-content-evenly md:my-auto my-5'>
        <LoginUser />
        <RegisterUser />
      </motion.div>
    </motion.div>

  );
}

export default Login;
