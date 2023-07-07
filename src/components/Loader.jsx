import React from 'react'
import ethloader from "../assets/ethloader.gif"
const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen invert flex items-center justify-center '>
      <img src={ethloader} alt="loader" className='
      w-[100px] h-[100x] object-contain' />
      <p className='mt-[20px] font-epilogue font-bold'>
        Processing... <br />
        Please Bare With Us
      </p>
    </div>
  )
}

export default Loader
