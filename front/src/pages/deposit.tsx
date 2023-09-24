import { VendorContext } from '@/Context/VendorContext';
import { MainLayout } from '@/Layout/MainLayout';
import React,{useContext,useMemo,useEffect} from 'react'
import styles from '../styles/styles.module.css'
import {useForm} from 'react-hook-form'
import { AuthContext } from '@/Context/AuthContext';
import {toast,ToastContainer} from 'react-toastify'
import { Loader } from '@/Components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

interface formData{
    monto:number
}

const DepostiPage = () => {

  const {setSubmissions,Submissions,error,status,first,changeFirst,onAddMonto}=useContext(VendorContext)

  const {user}=useContext(AuthContext);

  const {register,formState:{errors},getValues,handleSubmit}=useForm<formData>();

  const [submitForm,SetSubmitForm]=useState<boolean>(false);

  useEffect(()=>{
    if(Submissions.length<=0){
        setSubmissions();

    }
  },[])

  useEffect(()=>{
    if(status===null && error!='' && submitForm){
      toast.error(`${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
    }else if(status===null && error==='' && submitForm){
      toast.success('Monto agregado correctamente', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
      }); 
    }
    changeFirst();
 },[error,status])

  const sumaDeudas=useMemo(()=>{
     return Submissions.reduce((total,submission)=>{
        return total+submission.price;
     },0)
  },[Submissions])

  const onUpdateMonto=(Data:formData)=>{
    SetSubmitForm(true);
    onAddMonto(Data.monto)
  }

  return (
    <MainLayout title='Deposit' description='Pagina deposito de dinero'>
        <ToastContainer/>
        <section className='w-[100%] flex flex-col justify-center items-center flex-grow'>
            <form onSubmit={handleSubmit(onUpdateMonto)} className='w-[45%] bg-white p-8 flex flex-col gap-4 rounded-lg shadow-lg'>
                <h1 className='font-poppin font-bold text-2xl text-[#026DA6] w-[100%] text-center'>Deposita dinero en tu cuenta</h1>
                <h2 className='font-poppin font-semibold'>Tu balance:${user.balance}</h2>
                <div className='flex items-center gap-1'>
                    <p className='font-poppin font-semibold'>Tope maximo deposito 10% deudas:</p>
                    <p className='font-poppin font-semibold'>${(sumaDeudas*0.1).toFixed(0)}</p>
                </div>
                <div className={styles['input-group']}>
                        <input {...register('monto',{
                            required:'El monto es obligatorio'
                        })} placeholder=' '  style={{marginBottom:!errors.monto ? '.9rem' : ''}} type="number" className={`${styles['input-form']} ${errors.monto ? 'border-red-600' : ''} font-poppin shadow-sm`}/>
                        <label className={`${styles['label-input']} font-poppin font-normal`}>Monto</label>
                </div>
                <button type='submit' disabled={status==='loading' ? true : false} className='w-[100%] rounded-lg text-white font-poppin flex justify-center items-center py-2 bg-[#026DA6]
                font-semibold text-lg'>{
                    status!='loading' ? 'Depositar': <Loader width='w-[25px]' height='h-[25px]'/> 
                }</button>
            </form>
        </section>
    </MainLayout>
  )
}

export default DepostiPage;
