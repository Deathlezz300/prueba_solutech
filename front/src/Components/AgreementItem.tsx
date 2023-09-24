import React,{FC} from 'react'

interface props{
    id:number,
    status:string,
    terms:string
}

export const AgreementItem:FC<props> = ({id,status,terms}) => {
  return (
    <div className='w-[90%] flex items-center justify-between cursor-pointer bg-white shadow-md rounded-lg p-3'>
        <h2 className='font-poppin text-[#353849] font-bold'>{terms}</h2>
        <p className={`font-poppin font-bold ${status==='new' ? 'text-green-600' : 'text-[#026DA6]'}`}>
            {status}</p>
    </div>
  )
}
