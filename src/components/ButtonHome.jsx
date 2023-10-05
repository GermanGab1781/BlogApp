import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonHome = ({ text, path, delay }) => {

  const item = {
    hidden: { opacity: 0, translateY: -50, translateX: -50 },
    show: { opacity: 1, translateY: 0, translateX: 0 }
  }

  return (
    <motion.div variants={item} initial="hidden" animate="show" transition={{ duration: 0.3, delay: delay }} className='cursor-pointer group'>
      <NavLink className='flex p-10 bg-red-800 hover:bg-indigo-700 border border-blue-500 hover:border-slate-50 w-56 group-hover:scale-110 group-hover:rounded-2xl rounded-md transition-all ease-in-out duration-100 delay-[45ms]' to={path}>
        <span className='m-auto font-semibold group-hover:font-bold'>{text}</span>
      </NavLink>
    </motion.div>
  );
}

export default ButtonHome;
