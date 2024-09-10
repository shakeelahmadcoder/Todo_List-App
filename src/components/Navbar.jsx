import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-violet-900 flex items-center justify-between py-2 px-8 text-white   w-full'>
        
        <span className='text-xl font-bold'>i Task</span>
        <ul className='flex gap-8 '>
            <a className='font-bold cursor-pointer'>Home</a>
            <a className='font-bold cursor-pointer'>About</a>
        </ul> 
    </div>
  )
}

export default Navbar