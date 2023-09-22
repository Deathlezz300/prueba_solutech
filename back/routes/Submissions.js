const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const { traerUnpaidSubmissions, pagarSubmission } = require('../Controllers/SubmissionsController');

const SubmissionsRouter=Router();

SubmissionsRouter.use(validarJWT);

SubmissionsRouter.get('/unpaid',traerUnpaidSubmissions);

SubmissionsRouter.post('/:submission_id/pay',pagarSubmission)


module.exports=SubmissionsRouter