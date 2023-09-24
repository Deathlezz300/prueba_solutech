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

        const token=await generarJWT(usuario.id,fullName,usuario.type);

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

const RegisterUser=async(req=request,res=response)=>{

    const {nombre:firstName,apellido:lastName,profesion:profession,tipo:type}=req.body;

    try{

        const fullName=firstName+' '+lastName;

        let usuario=await Account.findOne({
            where: {
                [Op.or]: [
                  literal(`LOWER("firstName" || "lastName") = '${fullName.split(' ').join('').toLowerCase()}'`),
                  literal(`LOWER("firstName") = '${fullName.split(' ').join('').toLowerCase()}'`),
                ],
              },  
        });

        if(usuario){
            return res.status(400).json({
                ok:false,
                message:'Este usuario ya existe'
            })
        };

        const newAccount=new Account({
            firstName,
            lastName,
            profession,
            type,
            balance:0
        });

        await newAccount.save();

         const token=await generarJWT(newAccount.id,fullName,newAccount.type);

        return res.status(200).json({
            ok:true,
            usuario:newAccount,
            token
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revisar el backlog'
        })
    }

}

const RenovarToken=async(req=request,res=response)=>{
    
    const id=req.id;
    const name=req.name;
    const type=req.type

    const token=await generarJWT(id,name,type);

    const UserAccount=await Account.findOne({
        where:{
            id:id
        }
    })

    res.json({
        ok:true,
        usuario:UserAccount,
        token
    })
}

module.exports={
    LoginUser,
    RenovarToken,
    RegisterUser
}