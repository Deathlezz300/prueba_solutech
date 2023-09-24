import { AgreementItem } from '@/Components/AgreementItem';
import { VendorContext } from '@/Context/VendorContext';
import { MainLayout } from '@/Layout/MainLayout';
import React,{useContext, useEffect} from 'react'

const HomePage = () => {

  const {setAgreements,Agreements,status}=useContext(VendorContext);

  useEffect(()=>{
    setAgreements();
  },[]);


  if(status==='loading'){
    return <h1>Cargando...</h1>
  }

  return (
    <MainLayout title='Agreements' description='Agreements page'>
        <section  className='w-[100%] gap-2 flex items-center pt-5 flex-grow flex-col bg-[#E8E8E8] pb-3'>
            <h1 className='w-[90%] font-poppin font-extrabold text-3xl text-[#026DA6] text-left'>Agreements</h1>
            {
              status!='loading' ? 
              Agreements.map((Agreement,index)=>{
                return <AgreementItem key={index} id={Agreement.id} terms={Agreement.terms} status={Agreement.status}/>
              })
              :''
            }
        </section>
    </MainLayout>
  )
}

export default HomePage;



