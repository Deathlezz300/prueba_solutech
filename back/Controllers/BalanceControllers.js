const {request,response}=require('express');
const { db } = require('../lib/orm');
const { Account } = require('../models/accounts');
const { Submission } = require('../models/submissions');
const { Agreement } = require('../models/aggreement');

const AddBalanceAccount=async(req=request,res=response)=>{

    const requestId=req.id;
    const userId=req.params.accountId;

    const {monto}=req.body;

    if(requestId!=userId){
        return res.status(401).json({
            ok:false,
            message:'Error de validacion de usuario'
        })
    };

    const transaccion=await db.transaction();

    try{
        
        const accountUser=await Account.findOne({
            where:{
                id:userId
            },
        });

        const submissions=await Submission.findAll({
            where:{
                paid:false
            },
            include:[
                {
                    model:Agreement,
                    where:{
                        BuyerId:userId
                    },
                },
            ],
        });

        const totalDeudaSubmissions=submissions.reduce((total,submissionAux)=>{
            return total+submissionAux.price;
        },0)


        const topeDeposito=totalDeudaSubmissions*0.1;

        if(topeDeposito>0 && (monto<=0 || monto>topeDeposito)){
            await transaccion.rollback();
            return res.status(400).json({
                ok:false,
                message:'El monto a depositar supera el tope del 10%'
            })
        }

        accountUser.balance=accountUser.balance+monto;
        await accountUser.save();

        await transaccion.commit();

        return res.status(200).json({
            ok:false,
            message:'Monto agregado correctamente'
        })

    }catch(error){
        await transaccion.rollback();
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revisar el backlog'
        })
    }

}

module.exports={
    AddBalanceAccount
}