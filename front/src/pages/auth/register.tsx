import { AuthLayout } from '@/Layout/AuthLayout';
import React,{useContext, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import styles from '../../styles/styles.module.css'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext';
import { Loader } from '@/Components/Loader';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface DataForm{
    nombre:string,
    apellido:string,
    profesion:string,
    tipo:string
}

const RegisterPage = () => {

  const {handleSubmit,formState:{errors},register,getValues}=useForm<DataForm>({
    defaultValues:{
        nombre:'',
        apellido:'',
        profesion:'',
        tipo:'buyer'
    }
  });

  const {status,startRegister,error}=useContext(AuthContext);


  useEffect(()=>{
    if(error!=''){
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
    }
  },[error])

  const onCreateAccount=(Data:DataForm)=>{
    startRegister(Data.nombre,Data.apellido,Data.profesion,Data.tipo);
  }

  return (
    <AuthLayout title='Register' description='Pagina de registro'>
        <ToastContainer/>
        <section className='w-[100%] min-h-screen flex justify-center items-center'>
            <form className='w-[90%] lg:w-[40%] sm:w-[50%] p-4 flex flex-col gap-2 bg-[#E8E8E8] rounded-lg shadow-lg justify-center items-center' onSubmit={handleSubmit(onCreateAccount)} >
                <h1 className='font-extrabold font-poppin mb-2 text-3xl md:text-4xl text-[#2587be]'>VendorManager</h1>
                <div className={styles['input-group']}>
                    <input {...register('nombre',{
                    required:'El nombre es obligatorio'
                    })} placeholder=' ' style={{marginBottom:!errors.nombre ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.nombre ? styles.borderRed : ''} font-poppin shadow-sm`}  />
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Primer Nombre</label>
                </div>
                <div className={styles['input-group']}>
                    <input {...register('apellido',{
                    required:'El apellido es obligatorio'
                    })} placeholder=' ' style={{marginBottom:!errors.apellido ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.apellido ? styles.borderRed : ''} font-poppin shadow-sm`} />
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Primer Apellido</label>
                </div>
                <div className={styles['input-group']}>
                    <input {...register('profesion',{
                    required:'La profesion es obligatoria'
                    })} placeholder=' ' style={{marginBottom:!errors.profesion ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.profesion ? styles.borderRed : ''} font-poppin shadow-sm`} />
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Profesion</label>
                </div>
                <select className='w-[100%] outline-none p-3 rounded-lg shadow-md font-poppin font-semibold text-[#353849]' {...register('tipo')} defaultValue='buyer'>
                    <option value="buyer">Buyer</option>
                    <option value="Supplier">Supplier</option>
                </select>
                <button disabled={status==='loading' ? true : false} className='font-poppin flex justify-center items-center text-lg font-bold text-white bg-[#2587be] w-[100%] p-2 rounded-lg'>
                    {
                        status==='loading' ? <Loader width='w-[30px]' height='h-[30px]'/> : 'Registrarse'
                    }
                </button>
                <div className='flex w-[100%] gap-1 mt-2 justify-end items-center'>
                    <p className='font-poppin'>¿Ya tienes cuenta?</p>
                    <Link className={`font-poppin text-[#026DA6] font-semibold relative ${styles.linkAuth}`} href={`/auth/login`}>Iniciar sesion</Link>
                </div>
            </form>
        </section>
    </AuthLayout>
  )
}

export default RegisterPage;