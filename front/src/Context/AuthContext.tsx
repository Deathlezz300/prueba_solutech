import { createContext } from "react"

interface valuesAuth{
    status:'not-authenticated' | 'loading' | 'authenticated',
    startLogin:(fullName:string)=>void,
    startRegister:(fullName:string,profesion:string)=>void
}

export const AuthContext=createContext({} as valuesAuth);


