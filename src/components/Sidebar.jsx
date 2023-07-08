import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hamburger from "../assets/hamburger.png";
import { navlinks } from '../constants';

const Icon = (
    {styles, name,imgUrl, isActive, disabled, handleClick}) => {;
    return (
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#4f46e5] ring-2 ring-[#a5b4fc]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
          {!isActive ? (<img src = {imgUrl} className='h-1/2 w-1/2 '/>):
          (<img src = {imgUrl} className={`invert h-1/2 w-1/2 ${isActive == name}`}/>)
          }
        </div>
    )
}
const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setActive] = useState('dashboard')
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
    <Link to = "/">
    <Icon styles = "w-[52px] h-[52px] bg-dark-1 invert" imgUrl ={hamburger} isActive = {isActive}/>
    </Link>
    <div className='flex-auto flex flex-col justify-between items-center bg-[#818cf8] rounded-[20px] w-[76px] py-4 mt-12'>
    <div className='flex flex-col justify-center items-center gap-y-3'>
    {navlinks.map((item) => (
      <Icon key = {item.name} {...item} isActive={isActive} handleClick={() => {
        if(!item.disabled){
          setActive(item.name);
          navigate(item.link)
        }
      }}/>
    ))}
    </div>

    </div>
    </div>
  )
}

export default Sidebar
