import React, { useEffect, useState } from 'react'
import { TableRow, Loader, CountBox } from '../components'
import { useStateContext } from '../context'

const Payments = () => {
    const [transactions, setTransaction] = useState([])
    const [totalFunded, setTotalFunded] = useState(0)
    const [loading, setLoading] = useState(false)
    const {address, getUserTransactions, contract} = useStateContext()
    
    const getTransactions = async() => {
        setLoading(true)
        const data = await getUserTransactions()
        //console.log(data)
        if(data){
        
        setTotalFunded(data.totalFund)
        setTransaction(data.transactions)
        setLoading(false)
        console.log(data.totalFund)
        }
    }
    useEffect(() => {
        getTransactions()
    },[address, contract])
  return (
    <div className='text-white font-bold font-epilogue text-[24px]'>
    <div>Your Payments</div>
    <div className='flex md:justify-end md:px-12 justify-between px-[0]'>
    <div className='mx-[10px]'>
      <CountBox title = {"Total ETH Spent"} value = {totalFunded}/>
    </div>  
    <div className='mx-[10px]'>
      <CountBox title = {"Total Payments"} value = {transactions?.length}/>
    </div>  
    </div>
    {loading && (
          <Loader msg1 = {"Processing"} msg2 = {"Please Bare With Us"} />
        )}
      <div className="md:px-12 py-8 w-full">
  <div className="shadow overflow-x-auto rounded">
    <table className="min-w-full">
      <thead className="bg-[#818cf8] text-white">
        <tr>
          <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Campaign Title</th>
          <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Campaign Owner</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Your Address</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ETH Amount</th>
        </tr>
      </thead>
    <tbody>
      {address && transactions &&  transactions.map((item,index) => <TableRow key = {index} index = {index} transactions = {item} address = {address} />)}
    </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default Payments
