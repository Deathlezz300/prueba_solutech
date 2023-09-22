const {Router}=require('express');
const {check}=require('express-validator')
const AuthRouter=Router();
const {LoginUser,RenovarToken}=require('../Controllers/AuthControllers')
const {validarCampos}=require('../middlewares/validarCampos')
const {validarJWT}=require('../middlewares/validar-JWT')

AuthRouter.post('/',[
    check('fullName','El nombres es obligatorio').not().isEmpty(),
    validarCampos
],LoginUser);

AuthRouter.get('/validate',validarJWT,RenovarToken)

module.exports=AuthRouter