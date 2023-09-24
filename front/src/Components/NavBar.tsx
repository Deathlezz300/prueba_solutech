import { AuthContext } from '@/Context/AuthContext'
import React,{useContext} from 'react'
import Link from 'next/link';

export const NavBar = () => {
 
  const {user,OnLogout}=useContext(AuthContext);  

  return (
    <header className='w-[100%] flex p-4 items-center bg-white'>
        <h2 className='font-poppin text-[#353849] font-bold'>{user.firstName+' '+user.lastName}</h2>
        <div className='flex-1'></div>
        <div className='flex gap-3'>
            <Link className='font-poppin text-[#026DA6] font-semibold' href='/'>Agreements</Link>
            <Link className='font-poppin text-[#026DA6] font-semibold' href='/submissions'>Submission</Link>
            {user.type!='supplier' ? <Link className='font-poppin text-[#026DA6] font-semibold' href='/deposit'>Deposit</Link> : ''}
            <Link className='font-poppin text-[#026DA6] font-semibold' href='/admin'>Admin</Link>
            <button type='button' onClick={()=>OnLogout()} className='font-poppin text-red-600 font-semibold'>Logout</button>
        </div>
    </header>
  )
}
