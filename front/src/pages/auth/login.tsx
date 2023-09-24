import { AuthLayout } from '@/Layout/AuthLayout';
import React,{useContext} from 'react'
import {useForm} from 'react-hook-form'
import styles from '../../styles/styles.module.css'
import Link from 'next/link';
import { AuthContext } from '@/Context/AuthContext';
import { Loader } from '@/Components/Loader';

interface DataForm{
    fullName:string
}

const LoginPage = () => {

  const {handleSubmit,formState:{errors},register,getValues}=useForm<DataForm>();

  const {status,startLogin}=useContext(AuthContext);

  const onSubmitLogin=(Data:DataForm)=>{
    startLogin(Data.fullName);
  }

  return (
    <AuthLayout title='Login' description='Pagina de inicio de sesion'>
        <section className='w-[100%] min-h-screen flex justify-center items-center'>
            <form className='w-[90%] lg:w-[40%] sm:w-[50%] p-4 flex flex-col gap-2 bg-[#E8E8E8] rounded-lg shadow-lg justify-center items-center' onSubmit={handleSubmit(onSubmitLogin)} >
                <h1 className='font-extrabold font-poppin mb-2 text-3xl md:text-4xl text-[#2587be]'>VendorManager</h1>
                <div className={styles['input-group']}>
                    <input {...register('fullName',{
                        required:'El nombre es obligatorio'
                    })} placeholder=' ' style={{marginBottom:!errors.fullName ? '.9rem' : ''}} type="text" className={`${styles['input-form']} ${errors.fullName ? 'border-red-600' : ''} font-poppin shadow-sm`}/>
                    <label className={`${styles['label-input']} font-poppin font-normal`}>Nombre</label>
                </div>
                <button disabled={status==='loading' ? true : false} type='submit' className='font-poppin text-lg font-bold flex justify-center items-center text-white bg-[#2587be] w-[100%] p-2 rounded-lg'>
                    {status==='loading' ? <Loader width='w-[30px]' height='h-[30px]'/> : 'Login'}</button>
                <div className='flex w-[100%] gap-1 mt-2 justify-end items-center'>
                    <p className='font-poppin'>¿No tienes cuenta?</p>
                    <Link className={`font-poppin text-[#026DA6] font-semibold relative ${styles.linkAuth}`} href={`/auth/register`}>Registrarse</Link>
                </div>
            </form>
        </section>
    </AuthLayout>
  )
}

export default LoginPage;
