import { IStatus, IUser } from "@/interface/UserInterfaces";

type ActionType=
    | {type:'SET-USER',payload:IUser}
    | {type:'SET-STATUS',payload:IStatus}
    | {type:'SET-ERROR',payload:string}


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

        default:
            return state

    }

}