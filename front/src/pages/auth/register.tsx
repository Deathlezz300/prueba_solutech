import { AuthLayout } from '@/Layout/AuthLayout';
import React,{useContext} from 'react'
import {useForm} from 'react-hook-form'
import styles from '../../styles/styles.module.css'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext';
import { Loader } from '@/Components/Loader';

interface DataForm{
    fullName:string,
    profesion:string
}

const RegisterPage = () => {

  const {handleSubmit,formState:{errors},register,getValues}=useForm<DataForm>();

  const {status,startRegister}=useContext(AuthContext);

  const onCreateAccount=(Data:DataForm)=>{
    startRegister(Data.fullName,Data.profesion);
  }

  return (
    <AuthLayout title='Login' description='Pagina de inicio de sesion'>
        <section className='w-[100%] min-h-screen flex justify-center items-center'>
            <form className='w-[90%] lg:w-[40%] sm:w-[50%] p-4 flex flex-col gap-2 bg-[#E8E8E8] rounded-lg shadow-lg justify-center items-center' onSubmit={handleSubmit(onCreateAccount)} >
                <h1 className='font-extrabold font-poppin mb-2 text-3xl md:text-4xl text-[#2587be]'>VendorManager</h1>
                <div className={styles['input-group']}>
                    <input {...register('fullName',{
                    required:'El nombre es obligatorio'
                    })} placeholder=' ' style={{marginBottom:!errors.fullName ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.fullName ? styles.borderRed : ''} font-poppin shadow-sm`}  />
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Nombre Completo</label>
                </div>
                <div className={styles['input-group']}>
                    <input {...register('profesion',{
                    required:'La profesion es obligatoria'
                    })} placeholder=' ' style={{marginBottom:!errors.fullName ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.profesion ? styles.borderRed : ''} font-poppin shadow-sm`} />
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Profesion</label>
                </div>
                <button disabled={status==='loading' ? true : false} className='font-poppin flex justify-center items-center text-lg font-bold text-white bg-[#2587be] w-[100%] p-2 rounded-lg'>
                    {
                        status==='loading' ? <Loader/> : 'Registrarse'
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