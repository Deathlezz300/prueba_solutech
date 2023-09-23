import { NextRequest, NextResponse } from "next/server";
import { IUserPeticion } from "./interface/UserInterfaces";
import { jwtVerify } from "jose";

export async function middleware(req:NextRequest){

    const previosPage=req.nextUrl.pathname;

    let token=req.cookies.get('token')?.value;

    if(previosPage.startsWith('/auth') && token){
        const url=req.nextUrl.clone();
        url.pathname='/';
    
        return NextResponse.redirect(url);
    }

    if(!previosPage.startsWith('/auth')){
        try{
            await jwtVerify(token as string,new TextEncoder().encode(process.env.SECRET_JWT_SEED));
        }catch(error){
            const url=req.nextUrl.clone();
            url.pathname='/auth/login';
            req.cookies.delete('token');
            return NextResponse.redirect(url);
        }
    }

    

     return NextResponse.next();

}

export const config={
    matcher:[
        '/auth/:path*',
        '/'
    ]
}