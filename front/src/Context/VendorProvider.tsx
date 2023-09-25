import { IAgreement, IAgreementPeticion } from "@/interface/AgreementInterface";
import { VendorReducer, VendorReducerState } from "./Reducer/VendorReducer";
import { VendorContext } from "./VendorContext";
import {FC,useEffect,useReducer,useContext} from 'react'
import VendorApi from "@/Api/VendorApi";
import { ISubmission, ISubmissionPeticion } from "@/interface/SubmissionInterface";
import { AuthContext } from "./AuthContext";
import { IAdminBuyers, IAdminFechas, IAdminSuppliers, IUsersWithBuy } from "@/interface/AdminInterfaces";
import { DateToIso } from "@/Helpers/DateToISOFormat";
import { IProfessionWithSales } from '../interface/AdminInterfaces';

interface props{
    children:JSX.Element | JSX.Element[]
}

const initalState:VendorReducerState={
    Agreements:[] as IAgreement[],
    error:'',
    status:null,
    Submissions:[] as ISubmission[],
    statusPay:null,
    idActive:0,
    first:true,
    fechaMin:'' as any,
    fechaMax:'' as any,
    BestProfession: {} as IProfessionWithSales,
    BestBuyers:[] as IUsersWithBuy[]
}

export const VendorProvider:FC<props> =({children})=>{
    
    const [state,dispatch]=useReducer(VendorReducer,initalState);

    const {changeBalance,user,addBalance}=useContext(AuthContext);

    const setAgreements=async()=>{
        dispatch({type:'SET-STATUS',payload:'loading'});
        try{

            const {data}=await VendorApi.get<IAgreementPeticion>('/agreements');

            if(data.ok){
                dispatch({type:'SET-AGREEMENTS',payload:data.agreements})
                
            }

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message})
        }

    }

    const setSubmissions=async()=>{
        dispatch({type:'SET-STATUS',payload:'loading'});

        try{

            const {data}=await VendorApi.get<ISubmissionPeticion>('/submissions/unpaid');

            if(data.ok){
                dispatch({type:'SET-SUBMISSIONS',payload:data.submissions});
            }

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message})
        }
    }

    const PaySubmission=async(idSubmission:number,price:number)=>{

        dispatch({type:'SET-STATUSPAY',payload:'loading'});
        dispatch({type:'SET-ACTIVE',payload:idSubmission});

        try{

            
            const {data}=await VendorApi.post(`/submissions/${idSubmission}/pay`);

            if(data.ok){
                dispatch({type:'DELETE-SUBMISSION',payload:idSubmission});
                dispatch({type:'SET-STATUSPAY',payload:null});
                dispatch({type:'SET-ERRORS',payload:''})
                changeBalance(price)
                 
            }

        }catch(error:any){
            console.log(error);
            dispatch({type:'SET-ACTIVE',payload:0});
            dispatch({type:'SET-STATUSPAY',payload:null});
            dispatch({type:'SET-ERRORS',payload:error.response.data.message})
        }

    }

    const onAddMonto=async(monto:number)=>{

        dispatch({type:'SET-STATUS',payload:'loading'});

        try{

            const {data}=await VendorApi.post(`/balance/deposit/${user.id}`,{monto});

            if(data.ok){
                dispatch({type:'SET-ERRORS',payload:''})
                addBalance(monto);
                dispatch({type:'SET-STATUS',payload:null});
            }

        }catch(error:any){
            dispatch({type:'SET-ERRORS',payload:error.response.data.message});
            dispatch({type:'SET-STATUS',payload:null});
        }

    }

    const setFechas=async()=>{

        dispatch({type:'SET-STATUS',payload:'loading'})

        try{

            const {data}=await VendorApi.get<IAdminFechas>('/admin/fechas');

            if(data.ok){
                dispatch({type:'SET-STATUS',payload:null})
                dispatch({type:'SET-FECHAS',payload:{fechaMin:data.fechaMin,fechaMax:data.fechaMax}});
            }

        }catch(error){
            dispatch({type:'SET-STATUS',payload:null});
        }

    }

    const changeFirst=()=>{
        dispatch({type:'CHANGE-FIRST',payload:false});
    }

    const setSuppliers=async(fecha:Date,fecha2:Date)=>{

        dispatch({type:'SET-STATUSPAY',payload:'loading'});

        try{

            const {data}=await VendorApi.get<IAdminSuppliers>(`/admin/best-supplier-profession?start=${DateToIso(fecha)}&end=${DateToIso(fecha2)}`)

            if(data.ok){
                dispatch({type:'SET-SUPPLIER',payload:{profession:data.professionWithSales.profession,totalSales:data.professionWithSales.totalSales}});
                dispatch({type:'SET-STATUSPAY',payload:null})
            }

        }catch(error:any){
            dispatch({type:'SET-STATUSPAY',payload:null});
        }
    }

    const setBuyers=async(fecha:Date,fecha2:Date,limit:string)=>{

        dispatch({type:'SET-STATUSPAY',payload:'loading'});

        try{

            const {data}=await VendorApi.get<IAdminBuyers>(`/admin/best-buyers?start=${DateToIso(fecha)}&end=${DateToIso(fecha2)}&limit=${parseInt(limit)}`)

            if(data.ok){
                dispatch({type:'SET-BUYERS',payload:data.usersWithBuys});
                dispatch({type:'SET-STATUSPAY',payload:null})
            }

        }catch(error:any){
            dispatch({type:'SET-STATUSPAY',payload:null});
        }

    }

    return (
        <VendorContext.Provider value={{...state,setAgreements,setSubmissions,PaySubmission,onAddMonto,changeFirst,setFechas,
        setSuppliers,setBuyers}}>
            {children}
        </VendorContext.Provider>
    )
}