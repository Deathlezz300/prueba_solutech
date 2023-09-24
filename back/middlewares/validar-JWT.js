const express=require('express');
const jwt=require('jsonwebtoken');

const validarJWT=(req=express.request,res=express.response,next)=>{
    

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            ok:false,
            message:'No hay un token a renovar'
        })
    }

    try{

        const {id,name,type}=jwt.verify(token,process.env.SECRET_JWT_SEED)

        req.id=id;
        req.name=name;
        req.type=type;


    }catch(error){
        return res.status(401).json({
            ok:false,
            message:'Token no valido'
        })
    }

    next()


}


module.exports={
    validarJWT
}