import React from 'react'

const CountBox = ({title, value}) => {
  return (
    <div className='flex text-white flex-col items-center w-[150px] mt-3'>
      <h4 className='font-bold rounded-t-[10px] text-white truncate font-epilogue w-full text-center bg-[#6366f1]'> {value} {title?.search("ETH")!==-1?"ETH":""}</h4>
      <p className='font-epilogue font-semibold text-[16px] px-3 text-white py-2 w-full rounded-b-[10px] text-center bg-[#818cf8]'>{title}</p>
    </div>
  )
}

export default CountBox;
