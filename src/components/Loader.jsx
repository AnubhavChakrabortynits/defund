import React from 'react'
import ethloader from "../assets/ethloader.gif"
const Loader = ({msg1, msg2}) => {
  return (
    <div className='fixed inset-0 z-10 h-screen flex items-center justify-center after:content-["*"] after:absolute after:w-full after:h-screen after: bg-[#bfdbfe] opacity-75'>
      <img src={ethloader} alt="loader" className='
      w-[100px] h-[100x] object-contain' />
      <p className='mt-[20px] font-epilogue text-black font-bold'>
        {msg1} <br />
        {msg2}
      </p>
    </div>
  )
}

export default Loader
