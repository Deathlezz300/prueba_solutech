const {request,response}=require('express');
const { Agreement } = require('../models/aggreement');
const req = require('express/lib/request');
const {Op,literal}=require('sequelize')

const getAgreementById=async(req=request,res=response)=>{

    const id=req.params.id;

    const userId=req.id;

    if(!id){
        return res.status(400).json({
            ok:false,
            message:'No hay id del agreement'
        })
    }

    try{

        let aggreement=await Agreement.findOne({
            where:{
                id:id
            }
        })

        if(!aggreement){
            return res.status(400).json({
                ok:false,
                message:'Este acuerdo no existe'
            })
        }

        aggreement=aggreement.get({plain:true});

        console.log(userId);
        console.log(aggreement.BuyerId);

        if(aggreement.BuyerId!=userId && aggreement.SupplierId!=userId){
            return res.status(401).json({
                ok:false,
                message:'No tiene acceso a este acuerdo'
            })
        }

        return res.status(200).json({
            ok:true,
            aggreement
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revisar logs'
        })
    }

}


const traerAgreements=async(req=request,res=response)=>{


    const userId=req.id;

    try{
        
        const agreements=await Agreement.findAll({
            where:{
                [Op.or]:[
                    literal(`BuyerId=${userId}`),
                    literal(`SupplierId=${userId}`)
                ],
                status:{
                    [Op.not]:'terminated'
                }
            }

        })

        if(!agreements){
            return res.status(400).json({
                ok:false,
                message:'No hay agreements para este id'
            })
        }

        return res.status(200).json({
            ok:true,
            agreements
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error,revisar logs'
        })
    }

}

module.exports={
    getAgreementById,
    traerAgreements
}