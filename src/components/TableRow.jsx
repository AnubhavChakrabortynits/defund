import React from 'react'

const TableRow = ({index, transactions, address}) => {
    const colors = ["bg-[#171717]", "bg-[#1f2937]"]
  return (
    <tr className={`${colors[index%colors.length]} rounded-xl text-white font-bold text-[14px]`}>
        <td className="w-1/3 text-left py-3 px-4"><div className='max-w-[250px] truncate'>{transactions.campaign}</div></td>
        <td className="w-1/3 text-left py-3 px-4 "><div className='max-w-[250px] truncate'>{transactions.owner}</div></td>
        <td className="text-left py-3 px-4"><div className='max-w-[250px] truncate'>{address}</div></td>
        <td className="text-left py-3 px-4"><div>{transactions.funds}</div></td>
     </tr>
  )
}

export default TableRow
