import { IStatus, IUser } from "@/interface/UserInterfaces";

type ActionType=
    | {type:'SET-USER',payload:IUser}
    | {type:'SET-STATUS',payload:IStatus}
    | {type:'SET-ERROR',payload:string}
    | {type:'CHANGE-BALANCE',payload:number}
    | {type:'ADD-BALANCE',payload:number | string}
    | {type:'LOG-OUT'}


export interface UserReducerState{
    status:IStatus,
    user:IUser,
    error:string
}

export const AuthReducer=(state:UserReducerState,action:ActionType):UserReducerState=>{

    switch(action.type){

        case 'SET-STATUS':
            return {
                ...state,
                status:action.payload
            }

        case 'SET-USER':
            return{
                ...state,
                user:action.payload,
                status:'authenticated'
            }
        
        case 'SET-ERROR':
            return{
                ...state,
                error:action.payload
            }

        case 'CHANGE-BALANCE':
            return{
                ...state,
                user:{
                    ...state.user,
                    balance:state.user.balance-action.payload
                }
            }
        
        case 'ADD-BALANCE':
            return{
                ...state,
                user:{
                    ...state.user,
                    balance:state.user.balance+parseFloat(action.payload as string)
                }
            }
        
        case 'LOG-OUT':
            return{
                status:'not-authenticated',
                user:{} as IUser,
                error:''
            }

        default:
            return state

    }

}