import React from 'react'

const Button = ({type, title, handleClick, styles}) => {
  return (
    <button type = {type} className={`${styles} font-epilogue rounded-[12px] text-[16px] font-bold min-h-[52px] px-6 cursor-pointer py-2 flex flex-row items-center`} onClick = {handleClick}>
      {title}
    </button>
  )
}

export default Button
