import {FC,useReducer} from 'react'
import { AuthContext } from './AuthContext'
import { AuthReducer, UserReducerState } from './Reducer/AuthReducer'
import { IUser, IUserPeticion } from '@/interface/UserInterfaces'
import VendorApi from '@/Api/VendorApi'
import Cookie from 'js-cookie';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface props{
    children:JSX.Element | JSX.Element[]
}

const inital_state:UserReducerState={
    status:'not-authenticated',
    user:{} as IUser,
    error:''
}

export const AuthProvider:FC<props> =({children})=>{

    const [state,dispatch]=useReducer(AuthReducer,inital_state);

    const router=useRouter();

    useEffect(()=>{
        validateSession();
    },[])

    const startLogin=async(fullName:string)=>{
        dispatch({type:'SET-STATUS',payload:'loading'});

        try{

            const {data}=await VendorApi.post<IUserPeticion>('/auth',{fullName});
            if(data.ok){
                dispatch({type:'SET-USER',payload:data.usuario});
                router.replace('/')
                Cookie.set('token',data.token);
            }

        }catch(error:any){
            console.log(error);
            dispatch({type:'SET-STATUS',payload:'not-authenticated'});
            dispatch({type:'SET-ERROR',payload:error.message})
        }

    }

    const startRegister=async(nombre:string,apellido:string,profesion:string)=>{
        dispatch({type:'SET-STATUS',payload:'loading'});
    }

    const validateSession=async()=>{

        if(!Cookie.get('token')) return;

        try{

            const {data}=await VendorApi.get<IUserPeticion>('/auth/validate');

            if(data.ok){
                dispatch({type:'SET-USER',payload:data.usuario});
                Cookie.set('token',data.token);
            }

        }catch(error){
            console.log(error);
        }

    }

    return(
        <AuthContext.Provider value={{...state,startLogin,startRegister}}>
            {children}
        </AuthContext.Provider>
    )
}