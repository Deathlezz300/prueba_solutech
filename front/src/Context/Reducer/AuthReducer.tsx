import { IStatus, IUser } from "@/interface/UserInterfaces";

type ActionType=
    | {type:'SET-USER',payload:IUser}
    | {type:'SET-STATUS',payload:IStatus}


export interface UserReducerState{
    status:IStatus,
    user:IUser
}

export const AuthReducer=(state:UserReducerState,action:ActionType):UserReducerState=>{

    switch(action.type){

        case 'SET-STATUS':
            return {
                ...state,
                status:action.payload
            }

        default:
            return state

    }

}