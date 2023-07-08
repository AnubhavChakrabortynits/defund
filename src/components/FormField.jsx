import React from 'react'

const FormField = ({label, placeholder, inputType, isTextArea, value, handleChange}) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
    {label && (<span className='font-epilogue w-[fit] font-bold rounded-[5px] font-medium text-[14px] mb-[10px]  px-4 text-white'>{label}</span>)}
    {isTextArea? <textarea required value = {value} onChange={handleChange} type={inputType} step = "0.1" placeholder={placeholder}  className='py-[15px] sm:px-[25px]  outline-none border-[1.5px] bg-transparent border-[#6366f1] px-[15px] font-epilogue text-white text-[14px] placeholder:text-slate-400 rounded-[10px] sm:min-w-[300px]' rows = "1"/>: <input required value = {value} onChange={handleChange} type={inputType} step = "0.1" placeholder={placeholder}
        className='py-[15px] sm:px-[25px] outline-none border-[1.5px] bg-transparent border-[#6366f1] px-[15px] font-epilogue text-white text-[14px] placeholder:text-slate-400  rounded-[10px] sm:min-w-[300px]'
    />}
    </label>
  )
}

export default FormField
