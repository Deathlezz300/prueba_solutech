const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const { getBestSupplier, getBestBuyers } = require('../Controllers/AdminController');

const AdminRouter=Router();


AdminRouter.use(validarJWT);

AdminRouter.get('/best-supplier-profession',getBestSupplier);

AdminRouter.get('/best-buyers',getBestBuyers);

module.exports=AdminRouter

