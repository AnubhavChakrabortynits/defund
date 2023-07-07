import React from 'react'
import blockchain from "../assets/blockchain.png"
import profile from "../assets/profile.png";
import { daysLeft } from '../utils'

const CampaignCard = ({owner, title, description,currentAmount, target, deadline, image, handleClick}) => {
    const remainingDays = daysLeft(deadline)
  return (
    <div className='sm:w-[288px] w-full cursor-pointer rounded-[15px] relative bg-transparent text-white ring-[#4f46e5] ring-1 ring-offset-2  ring-offset-[#4f46e5]  shadow-[#4f46e5]' onClick={handleClick}>
      <img src={image} alt="img" className='w-full grayscale-[25%] h-[168px] rounded-[15px] object-cover drop-shadow-xl duration-700' />
      <div className='flex flex-col p-4'>
      <div className='flex flex-row mb-[18px] items-center'>
        <img src={blockchain} alt="tag" className='w-[20px] h-[20px] invert object-contain' />
        <div className='ml-[12px] mt-[2px] font-medium text-[12px] '>Category</div>
      </div>
      <div className='block'>
        <h3 className='font-bold text-left text-[16px] truncate underline'>{title}</h3>
        <p className='font-semibold text-left text-[12px] truncate'>{description}</p>
      </div>
      <div className='flex justify-between mt-[15px] gap-2 flex-wrap'>
      <div className='flex flex-col'>
        <h4 className='font-bold text-[14px] text-[#4f46e5]'>{currentAmount} ETH</h4>
        <p className='mt-[3px] font-semibold font-normal font-epilogue text-[12px] sm:max-w-[120px] truncate'>Out Of {target} ETH</p>
      </div>
      <div className='flex flex-col'>
        <h4 className='font-bold text-[14px] text-[#4f46e5]'>{remainingDays}</h4>
        <p className='mt-[3px] font-semibold font-normal font-epilogue text-[12px] sm:max-w-[120px] truncate'>More Days Left</p>
      </div>
      </div>
      <div className='flex items-center mt-[15px] gap-[12px]'>
      <img src={profile} alt="owner" className='w-[25px] h-[25px] invert object-contain' />
      <p className='flex-1 font-semibold font-epilogue text-white truncate'>Owner - <span className='font-bold text-[#4f46e5]'>{owner}</span></p>
      </div>
      </div>
    </div>
  )
}

export default CampaignCard
