const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const { getAgreementById, traerAgreements } = require('../Controllers/AgreementController');


const AgreementRouter=Router();

AgreementRouter.use(validarJWT);

AgreementRouter.get('/:id',getAgreementById)

AgreementRouter.get('/',traerAgreements)

module.exports=AgreementRouter