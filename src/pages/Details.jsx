import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Button, CountBox, Loader } from '../components'
import { useStateContext } from '../context'
import { calculateBarPercentage, daysLeft } from '../utils'
import profile from "../assets/profile.png"

const Details = () => {
  const {state} = useLocation();
  const {contract, address, Fund, getFunds} = useStateContext()
  const [loading, setLoading] = useState(false)
  const [amount,setAmount] = useState('')
  const [funders, setFunders] = useState([])
  const colors = ["bg-[#1e293b]","bg-[#374151]"]

  const remainingDays = daysLeft(state.deadline);

  const handleFund = async() => {
   setLoading(true)
   await Fund(state?.pid, amount)
   setLoading(false)
  }

  const fetchFunders = async() => {
    const data = await getFunds(state?.pid);
    console.log(data,state)
    setFunders(data)
  }

  useEffect(() => {
    if(contract){
      fetchFunders()
    }
  },[contract, address])
  return (
    <div>
    {loading && <Loader msg1 = {"Processing..."} msg2 = {"Please Bare With Us"} />}
    <div className='w-full md:flex-row flex flex-row-reverse flex-col gap-[30px] mt-10'>
    <div className='flex-1 flex-col'>
    <img src={state.image} alt="campaignimg" className='rounded-xl grayscale-[30%] w-full h-[450px] object-cover' />
    <div className='relative w-full h-[5px] bg-[#52525b] mt-2 rounded-xl'>
    <div className='absolute h-full bg-[#818cf8] text-white' style={{width: `${calculateBarPercentage(state.target,state.currentAmount)}%`,maxWidth:'100%'}}></div>
    </div>
    </div>
    <div className='flex md:w-[150px] w-full flex-row flex-wrap text-white justify-between gap-[30px]'>
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox title={`Raised of ${state.target} ETH`} value={state.currentAmount} />
        <CountBox title="Total Funders" value={funders?.length} />
    </div>
    </div>

    <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
    <div className='flex-[2] flex flex-col gap-[40px]'>
      <div>
        <h4 className='font-bold rounded-t-[10px] text-white text-[20px] font-epilogue uppercase'>Creator</h4>
        <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
          <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#4f46e5] cursor-pointer'>
          <img src={profile} alt="blockchain" className='w-[60%] h-[60%] object-contain invert' />
          </div>
          <div>
            <h4 className='font-epilogue break-all font-bold text-white text-[14px]'>{state.owner}</h4>
            <p className='mt-[4px] font-epilogue font-semibold text-slate-300 text-[12px]'>{funders[0]?.ownerCampaigns?.length} <span>Campaigns</span></p>
          </div>
        </div>
      </div>


      <div>
        <h4 className='font-bold rounded-t-[10px] text-white text-[20px] font-epilogue uppercase'>Description</h4>
        <div className='mt-[20px]'>
        <p className=' font-epilogue font-semibold text-slate-300 text-[16px] text-jusify'>{state.description}</p>
        </div>
      </div>
      <div>
        <h4 className='font-bold rounded-t-[10px] text-white text-[20px] font-epilogue uppercase'>Funders</h4>
        <div  className='flex flex-col mt-[20px]'>
        {funders?.length > 0?funders.map((item,index) => (
          <div key={index} className={`flex justify-between py-[10px] px-2 rounded-lg items-center gap-4 ${colors[index%(colors.length)]}`}>
          <p className='text-slate-200 break-all'>{index + 1} - {item.funder}</p>
          <p className='text-white font-epilogue font-bold'>{item.fund} ETH</p>
          </div>
        )):
        (<p className='font-epilogue font-semibold text-slate-300 text-[16px] text-jusify'>
        No Funders Yet
        </p>) 
        }
        </div>
      </div>
    </div>

    <div className='flex-1'>
    <h4 className='font-bold rounded-t-[10px] text-white text-[20px] font-epilogue uppercase'>Fund</h4>
    <div className='mt-[20px] flex flex-col p-4 bg-[#818cf8] rounded-[10px]'>
      <p className='font-medium font-epilogue text-[20px] leading-[30px] text-center text-white'>
        Fund This Campaign
      </p>
      <div className='mt-[30px]'>
      <input type="number" value={amount} placeholder='ETH' step="0.01" className='w-full py-[10px] sm:px-[10px] px-[15px] outline-none rounded-[10px] border-[2px]  bg-[#c7d2fe] border-[#4f46e5]' onChange={(e) => {setAmount(e.target.value)}} />
      <div className='mt-[20px] p-4 bg-[#4f46e5] rounded-[10px]'>
        <h4 className='text-white font-bold'>Please Help Me Achieve My Target</h4>
        <p className='text-[#c7d2fe] font-semibold text-[14px]'>Any Amount of ETH Will Be Of Help To Me </p>
      </div>
      <div>
        <Button type = "button" title = "Fund Campaign" styles={"w-full bg-[#9333ea] mt-[20px] flex justify-center text-white"} handleClick={handleFund}/>
      </div>
      </div>
    </div>
    </div>
    </div>
    

    </div>
  )
}

export default Details
