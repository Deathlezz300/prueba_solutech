const {request,response}=require('express');
const { Account } = require('../models/accounts');
const {Op,literal,col,fn}=require('sequelize');
const { Agreement } = require('../models/aggreement');
const { Submission } = require('../models/submissions');
const { db } = require('../lib/orm');

const getBestSupplier=async(req=request,res=response)=>{

    const {start,end}=req.query;

    try{


         const professionWithSales=await db.query(`SELECT Accounts.profession,SUM(Submissions.price) as totalSales FROM Accounts INNER JOIN Agreements ON 
         Agreements.SupplierId=Accounts.id AND Accounts.type='supplier' INNER JOIN Submissions ON Submissions.AgreementId=Agreements.id
         AND Submissions.paid=true AND (Submissions.paymentDate BETWEEN '${start}' AND '${end}')
         
         GROUP BY Accounts.profession
         
         ORDER BY totalSales DESC;
         
         LIMIT 1;`);


          return res.status(200).json({
            ok:true,
            professionWithSales:professionWithSales[0][0]
          })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

const getBestBuyers=async(req=request,res=response)=>{

    const {start,end,limit=3}=req.query;

    try{


         const usersWithBuys=await db.query(`SELECT Accounts.id,Accounts.firstName,Accounts.lastName
         ,Accounts.profession,Accounts.type, SUM(Submissions.price) as totalBuys FROM Accounts INNER JOIN Agreements ON 
         Agreements.BuyerId=Accounts.id AND Accounts.type='buyer' INNER JOIN Submissions ON Submissions.AgreementId=Agreements.id
         AND Submissions.paid=true AND (Submissions.paymentDate BETWEEN '${start}' AND '${end}')
         
         GROUP BY Accounts.id
         
         ORDER BY totalBuys DESC
         
         LIMIT ${parseInt(limit)}`);


          return res.status(200).json({
            ok:true,
            usersWithBuys:usersWithBuys[0]
          })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

const getFechas=async(req=request,res=response)=>{

    try{

        const fechaMin=await Submission.min('paymentDate');

        const fechaMax=await Submission.max('paymentDate');

        return res.status(200).json({
            ok:true,
            fechaMin,
            fechaMax
        });
         
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revisar logs'
        })
    }

}

module.exports={
    getBestSupplier,
    getBestBuyers,
    getFechas
}