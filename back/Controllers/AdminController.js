const {request,response}=require('express');
const { Account } = require('../models/accounts');
const {Op,literal}=require('sequelize');
const { Agreement } = require('../models/aggreement');
const { Submission } = require('../models/submissions');
const { db } = require('../lib/orm');

const getBestSupplier=async(req=request,res=response)=>{

    const {start,end,limit}=req.query;

    try{


         const usersWithSales=await db.query(`SELECT Accounts.id,Accounts.firstName,Accounts.lastName
         ,Accounts.profession,Accounts.type, SUM(Submissions.price) as totalSales FROM Accounts INNER JOIN Agreements ON 
         Agreements.SupplierId=Accounts.id AND Accounts.type='supplier' INNER JOIN Submissions ON Submissions.AgreementId=Agreements.id
         AND Submissions.paid=true AND (Submissions.paymentDate BETWEEN '${start}' AND '${end}')
         
         GROUP BY Accounts.id
         
         ORDER BY totalSales DESC
         
         LIMIT ${limit}`);


          return res.status(200).json({
            ok:true,
            usersWithSales
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
         
         LIMIT ${limit}`);


          return res.status(200).json({
            ok:true,
            usersWithBuys
          })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

module.exports={
    getBestSupplier,
    getBestBuyers
}