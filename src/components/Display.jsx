import React from 'react'
import { useNavigate } from 'react-router-dom'
import CampaignCard from './CampaignCard';
import Loader from './Loader';

const Display = ({title, loading, campaigns, ownerCampaigns}) => {
    const navigate = useNavigate()

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`,{state: campaign})
    }
  return ( 
    <div>
      <h1 className='font-epilogue text-[28px] font-bold text-white text-left'>{title}- {campaigns?.length}</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {loading && (
          <Loader msg1 = {"Processing"} msg2 = {"Please Bare With Us"} />
        )}
        {!loading && campaigns?.length === 0 && (
            <p className='font-semibold text-[18px] text-white'>No Created Campaign Yet</p>
        )}

        {!loading && campaigns?.length > 0 && campaigns.map((campaign) => (
            <CampaignCard key={campaign.pid} ownerCampaigns = {ownerCampaigns} {...campaign} handleClick = {() => handleNavigate(campaign)}/>
        ))}
      </div>
    </div>
  )
}

export default Display
