import { ISubmission } from '@/interface/SubmissionInterface';
import { IAgreement } from '../../interface/AgreementInterface';
import { IProfessionWithSales, IUsersWithBuy } from '@/interface/AdminInterfaces';

type ActionType=
    | {type:'SET-AGREEMENTS',payload:IAgreement[]}
    | {type:'SET-ERRORS',payload:string}
    | {type:'SET-STATUS',payload:'loading' | null}
    | {type:'SET-SUBMISSIONS',payload:ISubmission[]}
    | {type:'SET-STATUSPAY',payload:'loading' | null}
    | {type:'SET-ACTIVE',payload:number}
    | {type:'DELETE-SUBMISSION',payload:number}
    | {type:'CHANGE-FIRST',payload:boolean}
    | {type:'SET-FECHAS',payload:{fechaMin:Date,fechaMax:Date}}
    | {type:'SET-SUPPLIER',payload:IProfessionWithSales}
    | {type:'SET-BUYERS',payload:IUsersWithBuy[]}

export interface VendorReducerState{
    Agreements:IAgreement[],
    error:string,
    status:'loading' | null,
    Submissions:ISubmission[],
    statusPay:'loading' | null,
    idActive:number
    first:boolean,
    fechaMin:Date,
    fechaMax:Date,
    BestProfession:IProfessionWithSales,
    BestBuyers:IUsersWithBuy[]
}

export const VendorReducer=(state:VendorReducerState,action:ActionType):VendorReducerState=>{

    switch(action.type){

        case 'SET-AGREEMENTS':
            return {
                ...state,
                Agreements:action.payload,
                status:null
            }
        
        case 'SET-ERRORS':
            return{
                ...state,
                error:action.payload,
                status:null
            }

        case 'SET-STATUS':
            return{
                ...state,
                status:action.payload
            }

        case 'SET-SUBMISSIONS':
            return{
                ...state,
                Submissions:action.payload,
                status:null
            }

        case 'DELETE-SUBMISSION':
            return{
                ...state,
                Submissions:state.Submissions.filter((sub)=>{
                    return sub.id!=action.payload
                })
            }

        case 'SET-ACTIVE':
            return{
                ...state,
                idActive:action.payload
            }

        case 'SET-STATUSPAY':
            return{
                ...state,
                statusPay:action.payload
            }

        case 'CHANGE-FIRST':
            return{
                ...state,
                first:action.payload
            }

        case 'SET-FECHAS':
            return {
                ...state,
                fechaMin:action.payload.fechaMin,
                fechaMax:action.payload.fechaMax
            }

        case 'SET-SUPPLIER':
            return{
                ...state,
                BestProfession:action.payload
            }

        case 'SET-BUYERS':
            return{
                ...state,
                BestBuyers:action.payload
            }

        default:
            return state

    }

}