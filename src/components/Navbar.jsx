import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hamburger from "../assets/hamburger.png";
import blockchain from "../assets/blockchain.png";
import search from "../assets/search.png";
import Button from './Button';
import { navlinks } from '../constants';
import { useStateContext } from '../context';
const Navbar = () => {
  const {connect, address} = useStateContext();
  const [active, setActive] = useState('dashboard');
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate()
  return (
    <div className='flex md:flex-row flex-col-reverse justify-between gap-6 mb-[35px]'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#818cf8] rounded-[70px]'>
      <input type="text" placeholder='Search Campaigns' className='flex font-normal w-full text-[16px] placeholder:text-[#e5e7eb] text-black bg-transparent pl-4 outline-none'  />
        <div className='w-[72px] h-full rounded-[20px] bg-[#6366f1] flex justify-center items-center cursor-pointer'>
          <img className='w-[25px] h-[25px] invert' src={search} alt="searchicon" />
        </div>
      </div>
      <div className='sm:flex hidden flex-row justify-start gap-4'>
      <Button type="button" address = {address} title ={address?"Create Campaign":"Connect"} styles ={address?"bg-[#ec4899] text-white":"bg-[#4f46e5] text-white"}
        handleClick = {() => {
          if(address){
            navigate('create-campaign')
          }else{
            connect()
          }
        }}
      />
      <Link to = "/profile">
      <div className='w-[52px] h-[52px] invert'>
        <img src={blockchain} alt="account" />
      </div>
      <div>
      </div>
      </Link>
      </div>
      <div className='sm:hidden flex justify-between items-center relative'>
        <img src={blockchain} alt="account" className='invert' />
      <div>
      <img src={hamburger} alt="menu" className='w-[34px] h-[34px] cursor-pointer invert' onClick={() => {setToggle(!toggle)}} />
      <div className={`absolute top-[60px] w-full right-0 left-0 z-10 shadow-secondary bg-[#171717] py-4  ${!toggle?'translate-x-[100vw]':'translate-x-0'} transition-all duration-800`}>
      <ul className='mb-4'>
        {navlinks.map((item) => (
          <li key = {item.name} className={`flex text-black rounded-[20px] p-4 ${active === item.name && 'bg-[#6366f1]'}`} onClick={() => {setActive(item.name)
          setToggle(false);
          navigate(item.link)
          }}>
          <img src={item.imgUrl} className={`w-[34px] invert ${active === item.name}`} alt={item.name} />
          <p className={`ml-[25px] font-bold text-white font-serif ${active === item.name}`}>{item.name}</p>
          </li>
        ))}
      </ul>
      <div className='flex mx-4'>
      <Button type="button" address = {address} title ={address?"Create Campaign":"Connect"} styles ={address?"bg-[#ec4899] text-white":"bg-[#4f46e5] text-white"}
        handleClick = {() => {
          if(address){
            navigate('create-campaign')
          }else{
            connect()
          }
        }}
      />
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
