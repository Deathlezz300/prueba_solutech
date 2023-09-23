import {FC,useReducer} from 'react'
import { AuthContext } from './AuthContext'
import { AuthReducer, UserReducerState } from './Reducer/AuthReducer'

interface props{
    children:JSX.Element | JSX.Element[]
}

const inital_state:UserReducerState={
    status:'not-authenticated',
    user:''
}

export const AuthProvider:FC<props> =({children})=>{

    const [state,dispatch]=useReducer(AuthReducer,inital_state);

    const startLogin=async(fullName:string)=>{

        dispatch({type:'SET-STATUS',payload:'loading'});

    }

    const startRegister=async(fullName:string,profesion:string)=>{
        dispatch({type:'SET-STATUS',payload:'loading'});
    }

    return(
        <AuthContext.Provider value={{...state,startLogin,startRegister}}>
            {children}
        </AuthContext.Provider>
    )
}