import { IProfessionWithSales, IUsersWithBuy } from "@/interface/AdminInterfaces";
import { IAgreement } from "@/interface/AgreementInterface";
import { ISubmission } from "@/interface/SubmissionInterface";
import { createContext } from "react"

interface valuesAuth{
    Agreements:IAgreement[],
    error:string,
    Submissions:ISubmission[],
    status:'loading' | null,
    statusPay:'loading' | null,
    idActive:number,
    first:boolean,
    fechaMin:Date,
    fechaMax:Date,
    BestProfession:IProfessionWithSales,
    BestBuyers:IUsersWithBuy[]
    setAgreements:()=>void,
    setSubmissions:()=>void,
    PaySubmission:(idSubmission:number,price:number)=>void,
    onAddMonto:(monto:number)=>void,
    changeFirst:()=>void,
    setFechas:()=>void,
    setSuppliers:(fecha:Date,fecha2:Date)=>void,
    setBuyers:(fecha:Date,fecha2:Date,limit:string)=>void,
    clearDataLogOut:()=>void
}

export const VendorContext=createContext({} as valuesAuth);