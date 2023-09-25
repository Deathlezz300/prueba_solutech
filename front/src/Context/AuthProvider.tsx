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
            dispatch({type:'SET-STATUS',payload:'not-authenticated'});
            dispatch({type:'SET-ERROR',payload:error.response.data.message})
        }

    }

    const startRegister=async(nombre:string,apellido:string,profesion:string,tipo:string)=>{
        dispatch({type:'SET-STATUS',payload:'loading'});

        try{

            const {data}=await VendorApi.post('/auth/register',{nombre,apellido,profesion,tipo});

            if(data.ok){
                dispatch({type:'SET-USER',payload:data.usuario});
                Cookie.set('token',data.token);
                dispatch({type:'SET-STATUS',payload:'authenticated'});
                router.replace('/');
            }


        }catch(error:any){
            dispatch({type:'SET-ERROR',payload:error.response.data.message});
            dispatch({type:'SET-STATUS',payload:'not-authenticated'})
        }

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

    const addBalance=(monto:number)=>{
        dispatch({type:'ADD-BALANCE',payload:monto});
    }

    const changeBalance=(price:number)=>{
        dispatch({type:'CHANGE-BALANCE',payload:price})
    }

    const OnLogout=()=>{
        Cookie.remove('token');
        router.replace('/auth/login');
        dispatch({type:'LOG-OUT'});
    }

    return(
        <AuthContext.Provider value={{...state,startLogin,startRegister,changeBalance,addBalance,OnLogout}}>
            {children}
        </AuthContext.Provider>
    )
}