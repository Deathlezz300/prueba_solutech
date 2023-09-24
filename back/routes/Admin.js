const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const { getBestSupplier, getBestBuyers, getFechas } = require('../Controllers/AdminController');

const AdminRouter=Router();


AdminRouter.use(validarJWT);

AdminRouter.get('/best-supplier-profession',getBestSupplier);

AdminRouter.get('/best-buyers',getBestBuyers);

AdminRouter.get('/fechas',getFechas)

module.exports=AdminRouter

