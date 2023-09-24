import { UserItemAdmin } from '@/Components/UserItemAdmin';
import { VendorContext } from '@/Context/VendorContext';
import { MainLayout } from '@/Layout/MainLayout';
import React,{useState,useEffect, useContext} from 'react'
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const BestBuyers = () => {

  const {fechaMin,status,fechaMax,setFechas,setSuppliers,BestProfession,setBuyers,BestBuyers,statusPay}=useContext(VendorContext);

  useEffect(()=>{
    setFechas();
  },[])


  const [firstDate,SetFirstDate]=useState<Date>();

  const [SecondDate,SetSecondDate]=useState<Date>();

  const [ThirdtDate,SetThirdtDate]=useState<Date>();

  const [FourthDate,SetFourthDate]=useState<Date>();

  const [numberLimit,SetNumberLimit]=useState<string>(); 

  if(status==='loading'){
    return <h1>Cargando...</h1>
  }

  const onSearchSupplier=()=>{
    if(firstDate && SecondDate){
        setSuppliers(firstDate,SecondDate)
    }
  }

  const onSearchBuyers=()=>{
    if(ThirdtDate && FourthDate){
        setBuyers(ThirdtDate,FourthDate,numberLimit as string);
    }
  }

  return (
    <MainLayout title='Best Buyers' description='Page for best buyers'>
        <section className='w-[100%] flex flex-col items-center gap-2 pt-4'>
            <h1 className='w-[100%] text-center font-poppin font-extrabold text-3xl text-[#026DA6]'>Best supplier profession</h1>
            <div className='w-[100%] flex gap-2 items-end justify-center pt-4'>
                <div className='flex flex-col gap-2'>
                    <p className='font-poppin font-semibold text-[#026DA6]'>Primera Fecha</p>
                    <Datepicker minDate={new Date(fechaMin)} maxDate={new Date(fechaMax)} className='font-poppin font-semibold shadow-sm px-1 py-2 rounded-lg' selected={firstDate} onChange={(date:Date)=>SetFirstDate(date)}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-poppin font-semibold text-[#026DA6]'>Segunda Fecha</p>
                    <Datepicker minDate={new Date(fechaMin)} maxDate={new Date(fechaMax)} className='font-poppin shadow-sm font-semibold px-1 py-2 rounded-lg' selected={SecondDate} onChange={(date:Date)=>SetSecondDate(date)}/>
                </div>
                <button disabled={statusPay==='loading' ? true :false} type='button' onClick={onSearchSupplier} className='font-poppin bg-[#026DA6] text-white font-bold px-4 py-2 rounded-lg shadow-sm'>Buscar</button>
                <UserItemAdmin width='w-[45%]' nombre={BestProfession.profession} total={BestProfession.totalSales}/>
            </div>
        </section>
        <section className='w-[100%] flex flex-col items-center gap-2 pt-10'>
            <h1 className='w-[100%] text-center font-poppin font-extrabold text-3xl text-[#026DA6]'>Best Buyers</h1>
            <div className='w-[100%] flex gap-2 items-end justify-center'>
                <div className='flex flex-col gap-2'>
                    <p className='font-poppin font-semibold text-[#026DA6]'>Primera Fecha</p>
                    <Datepicker minDate={new Date(fechaMin)} maxDate={new Date(fechaMax)} className='font-poppin font-semibold shadow-sm px-1 py-2 rounded-lg' selected={ThirdtDate} onChange={(date:Date)=>SetThirdtDate(date)}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-poppin font-semibold text-[#026DA6]'>Segunda Fecha</p>
                    <Datepicker minDate={new Date(fechaMin)} maxDate={new Date(fechaMax)} className='font-poppin shadow-sm font-semibold px-1 py-2 rounded-lg' selected={FourthDate} onChange={(date:Date)=>SetFourthDate(date)}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-poppin font-semibold text-[#026DA6]'>Cantidad</p>
                    <input value={numberLimit} onChange={({target})=>SetNumberLimit(target.value)} type="number" className='px-1 py-2 rounded-lg shadow-sm font-poppin font-semibold' />
                </div>
                <button disabled={statusPay==='loading' ? true :false} type='button' onClick={onSearchBuyers} className='font-poppin bg-[#026DA6] text-white font-bold px-4 py-2 rounded-lg shadow-sm'>Buscar</button>
            </div>
            {
                statusPay!='loading' ? 
                BestBuyers.map((buyer,index)=>{
                    return <UserItemAdmin key={index} width='w-[90%]' nombre={buyer.firstName+' '+buyer.lastName} total={buyer.totalBuys}/>
                })
                :''
            }
        </section>
    </MainLayout>
  )
}


export default BestBuyers;
