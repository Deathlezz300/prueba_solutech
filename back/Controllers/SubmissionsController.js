const {request,response}=require('express');
const { Submission } = require('../models/submissions');
const { Agreement } = require('../models/aggreement');
const {Op}=require('sequelize');
const { Account } = require('../models/accounts');
const { db } = require('../lib/orm');
const { DateToIso } = require('../Utils/DateToIso');

const traerUnpaidSubmissions=async(req=request,res=response)=>{

    const userId=req.id;

    try{

        const submissions = await Submission.findAll({
            include: [
              {
                model: Agreement,
                where: {
                  [Op.or]: [
                    { BuyerId: userId },
                    { SupplierId: userId },
                  ],
                  status: 'in_progress',
                },
              },
            ],
            where:{
                paid:false
            }
          });

        if(!submissions){
            return res.status(400).json({
                ok:false,
                message:'No hay submissions sin pagar activas'
            })
        }

        return res.status(200).json({
            ok:true,
            submissions
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error, revisar logs'
        })
    }

}

const pagarSubmission=async(req=request,res=response)=>{

  const submission_id=req.params.submission_id;

  const userId=req.id;

  const transaction=await db.transaction();

  try{

      let submission=await Submission.findOne({
        where:{
          id:submission_id
        },
      });

      if(!submission){
        await transaction.rollback();
        return res.status(400).json({
          ok:false,
          message:'No existe esta submission'
        })
      };

      if(submission.paid===true){
        await transaction.rollback();
        return res.status(400).json({
          ok:false,
          message:'Esta orden ya fue pagada'
        })
      }


      const result = await Agreement.findOne({
        include: [
          {
            model: Submission,
            where: { id: submission_id },
            required: true,
          },
        ],
      });


      const {BuyerId,SupplierId}=result


      if(userId!=BuyerId){
        await transaction.rollback();
        return res.status(400).json({
          ok:false,
          message:'No tiene acceso a esta submission'
        })
      }

      const UserBuyer=await Account.findOne({
        where:{
          id:BuyerId
        },
      });

      const UserSupplier=await Account.findOne({
        where:{
          id:SupplierId
        },
      })

      if(UserBuyer.dataValues.balance<submission.dataValues.price){
        await transaction.rollback();
        return res.status(400).json({
          ok:false,
          message:'Saldo insuficiente'
        })
      };

      UserBuyer.balance=UserBuyer.balance-submission.price;
      UserSupplier.balance=UserSupplier.balance+submission.price;
      submission.paid=true;
      submission.paymentDate=DateToIso(new Date());
      result.status='terminated';



      await UserBuyer.save();
      await UserSupplier.save();
      const nuevo= await submission.save();
      await result.save();
      await transaction.commit();

      console.log(nuevo);

      return res.status(200).json({
        ok:true,
        message:'Orden pagada correctamente'
      })

  }catch(error){
    console.log(error);
    await transaction.rollback();
    return res.status(500).json({
      ok:false,
      message:'Ha ocurrido un error,revisar logs'
    })
  }

}

module.exports={
    traerUnpaidSubmissions,
    pagarSubmission
}