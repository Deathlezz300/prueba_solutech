import { IUser } from "@/interface/UserInterfaces";
import { createContext } from "react"

interface valuesAuth{
    status:'not-authenticated' | 'loading' | 'authenticated',
    user:IUser,
    error:string,
    startLogin:(fullName:string)=>void,
    startRegister:(nombre:string,apellido:string,profesion:string,tipo:string)=>void,
    changeBalance:(price:number)=>void,
    addBalance:(monto:number)=>void,
    OnLogout:()=>void
}

export const AuthContext=createContext({} as valuesAuth);


