import { SubmissionItem } from '@/Components/SubmissionItem';
import { AuthContext } from '@/Context/AuthContext';
import { VendorContext } from '@/Context/VendorContext';
import { MainLayout } from '@/Layout/MainLayout';
import React,{useContext, useEffect} from 'react';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SubmissionsPage = () => {

  const {status,setSubmissions,Submissions,statusPay,error,idActive}=useContext(VendorContext);

  const {user}=useContext(AuthContext);

  useEffect(()=>{
    setSubmissions();
  },[])

  useEffect(()=>{
    if(statusPay!='loading' && error!='' && idActive===0){
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
    }else if(idActive!=0 && statusPay!='loading' && error===''){
      toast.success('Pagado correctamente', {
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
 },[statusPay,error,idActive])

  return (
    <MainLayout title='Submissions' description='Pagina de submissions'>
        <ToastContainer/>
        <section className='w-[100%] pt-4 flex flex-col gap-2 justify-center items-center'>
            
            <div className='flex w-[90%] items-center justify-between'>
                <h1 className='font-poppin text-[#026DA6] font-bold text-2xl'>Submissions</h1>
                <p className='font-poppin font-semibold text-[#026DA6]'>Tu balance:${user.balance}</p>
            </div>
            {
                status!='loading' ? 
                Submissions.map((submission,index)=>{
                    return <SubmissionItem key={index} id={submission.id} description={submission.description} paid={submission.paid}
                    price={submission.price}/>
                })
                :''
            }
        </section>
    </MainLayout>
  )
}

export default SubmissionsPage;
