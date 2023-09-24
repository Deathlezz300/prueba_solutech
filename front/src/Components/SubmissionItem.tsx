import { VendorContext } from '@/Context/VendorContext'
import React,{FC, useContext} from 'react'
import { Loader } from './Loader';
import { AuthContext } from '@/Context/AuthContext';

interface props{
    id:number,
    price:number,
    paid:boolean,
    description:string
}

export const SubmissionItem:FC<props> = ({id,price,paid,description}) => {
  
   const {statusPay,idActive,PaySubmission}=useContext(VendorContext);
  
   const {user}=useContext(AuthContext);

    return (
    <div className='w-[90%] flex items-center justify-between cursor-pointer bg-white shadow-md rounded-lg p-3'>
        <h2 className='font-poppin text-[#353849] font-bold'>{description}</h2>
        <div className='flex gap-3 items-center'>
            {user.type!='supplier' ? <p className='font-poppin font-semibold text-[#353849]'>Precio:${price}</p> :'' }
            {
                user.type==='supplier'  ? <p className={`font-poppin font-semibold text-red-600`}>Sin pagar ${price}</p> 
                : <button disabled={statusPay==='loading' && idActive===id ? true :false} onClick={()=>PaySubmission(id,price)} className='py-2 px-4 font-poppin text-white font-bold bg-[#026DA6] rounded-lg shadow-sm flex items-center justify-center'>
                {
                    statusPay==='loading' ? <Loader width='w-[20px]' height='h-[20px]'/> : 'Pagar'
                }
                </button>
            }
        </div>
    </div>
  )
}
