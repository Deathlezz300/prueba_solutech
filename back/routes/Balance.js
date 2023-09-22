const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const {check}=require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { AddBalanceAccount } = require('../Controllers/BalanceControllers');

const BalanceRouter=Router();

BalanceRouter.use(validarJWT);

BalanceRouter.post('/deposit/:accountId',[
    check('monto').notEmpty().withMessage('El campo monto es requerido').isNumeric().withMessage('El campo monto deber ser numerico'),
    validarCampos
],AddBalanceAccount)

module.exports=BalanceRouter;