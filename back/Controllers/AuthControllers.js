const {request,response}=require('express');
const {Account}=require('../models/accounts');
const {Op,literal}=require('sequelize');
const {generarJWT}=require('../Utils/JWT');

const LoginUser=async(req=request,res=response)=>{

    const {fullName=''}=req.body;

    try{

        //Evaluo la busqueda del usuario por el nombre completo o unicamente el nombre, todo en minisculas
        let usuario=await Account.findOne({
            where: {
                [Op.or]: [
                  literal(`LOWER("firstName" || "lastName") = '${fullName.split(' ').join('').toLowerCase()}'`),
                  literal(`LOWER("firstName") = '${fullName.split(' ').join('').toLowerCase()}'`),
                ],
              },  
        });


        if(!usuario){
            return res.status(400).json({
                ok:false,
                message:'Esta cuenta no existe'
            })
        }

        usuario=usuario.get({plain:true});

        const token=await generarJWT(usuario.id,fullName)

        return res.status(200).json({
            ok:true,
            usuario,
            token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revise el backlog'
        })
    }

}


const RenovarToken=async(req=request,res=response)=>{
    
    const id=req.uid;
    const name=req.name;

    const token=await generarJWT(id,name)

    res.json({
        ok:true,
        id,
        name,
        token
    })
}

module.exports={
    LoginUser,
    RenovarToken
}